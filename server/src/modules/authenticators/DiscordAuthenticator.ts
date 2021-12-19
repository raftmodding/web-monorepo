import axios, { AxiosResponse } from 'axios';
import {
  DiscordSignOn,
  discordSignOnModel,
  Session,
  sessionModel,
  User,
  userModel,
} from '../../models';
import cfg, { Role } from '../cfg';
import { generateToken } from '../utils';

export type DiscordAuthenticationScope = 'identify' | 'email'; // https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes

export interface DiscordAuthenticationConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope?: DiscordAuthenticationScope;
  grantType?: 'authorization_code';
}

export interface DiscordAuthenticationData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: DiscordAuthenticationScope;
  token_type: 'Bearer';
}

export interface DiscordUserData {
  avatar: string;
  discriminator: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  public_flags: number;
  username: string;
  verified: boolean;
}

export class DiscordAuthenticator {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly grantType: string;
  private readonly redirectUri: string;
  private readonly scope: DiscordAuthenticationScope;

  constructor(config: DiscordAuthenticationConfig) {
    const { clientId, clientSecret, grantType, redirectUri, scope } = config;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.scope = scope || 'identify';
    this.grantType = grantType || 'authorization_code';
  }

  async getAuthenticationData(
    code: string,
  ): Promise<DiscordAuthenticationData> {
    const { clientId, clientSecret, grantType, redirectUri, scope } = this;
    const { data }: AxiosResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: grantType,
        redirect_uri: redirectUri,
        scope,
      } as any),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return data as DiscordAuthenticationData;
  }

  async getUserData(
    tokenType: string,
    accessToken: string,
  ): Promise<DiscordUserData> {
    const { data }: AxiosResponse = await axios.get(
      'https://discord.com/api/users/@me',
      {
        headers: { authorization: `${tokenType} ${accessToken}` },
      },
    );

    return data as DiscordUserData;
  }

  async matchesExistingUser(userData: DiscordUserData): Promise<boolean> {
    try {
      const { id: discordUserId } = userData;

      const discordLogin = await discordSignOnModel.findOne({
        where: { discordUserId },
      });

      return !!discordLogin;
    } catch (e) {
      return false;
    }
  }

  async register(
    userData: DiscordUserData,
    authData: DiscordAuthenticationData,
  ): Promise<Session> {
    const { id: discordUserId } = userData;
    const { access_token: accessToken, refresh_token: refreshToken } = authData;

    const user: User = (await userModel.create({
      username: `discord-user-${discordUserId}`,
      email: generateToken(discordUserId, 255),
      password: generateToken(null, 255),
      role: Role.UNFINISHED,
    })) as User;

    const discordLogin = await discordSignOnModel.create({
      userId: user.id,
      discordUserId,
      accessToken,
      refreshToken,
    });

    const { token }: Session = (await sessionModel.create({
      token: '[will-be-auto-generated]',
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      deviceInfo: null,
    })) as Session;

    const withAssociations: Session = (await sessionModel.findOne({
      where: { token },
      include: { model: userModel, as: 'user' },
    })) as Session;

    return withAssociations;
  }

  async login(userData: DiscordUserData): Promise<Session> {
    const { id: discordUserId } = userData;

    const discordLogin: DiscordSignOn = (await discordSignOnModel.findOne({
      where: { discordUserId },
    })) as DiscordSignOn;

    const user: User = (await userModel.findByPk(discordLogin.userId)) as User;

    const { token }: Session = (await sessionModel.create({
      token: '[will-be-auto-generated]',
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      deviceInfo: null,
    })) as Session;

    const withAssociations: Session = (await sessionModel.findOne({
      where: { token },
      include: { model: userModel, as: 'user' },
    })) as Session;

    return withAssociations;
  }
}

export default new DiscordAuthenticator({
  clientId: cfg.discord.clientId || '',
  clientSecret: cfg.discord.clientSecret || '',
  redirectUri: `${cfg.frontendBaseUrl}auth/discord`,
});
