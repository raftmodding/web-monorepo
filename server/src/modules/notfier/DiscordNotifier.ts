import { PingRateLimiter } from './PingRateLimiter';
import { LauncherVersion, LoaderVersion, Mod, ModVersion } from '../../models';
import {
  DiscordWebhookClient,
  Embed,
  WebhookMessage,
} from './DiscordWebhookClient';
import {
  getLauncherVersionUrl,
  getLoaderVersionUrl,
  getModUrl,
  getUserUrlForUsername,
  logoUrl,
  softwareDownloadUrl,
} from '../utils';
import cfg, { DiscordNotificationsCfg } from '../cfg';
import { AxiosError } from 'axios';

/**
 * Allows sending {launcher, loader, mod} version release notifications to
 * Discord.
 */
export class DiscordNotifier {
  private pingRateLimiter: PingRateLimiter;

  private cfg: DiscordNotificationsCfg;

  private modVersionWebhookClient: DiscordWebhookClient;
  private launcherVersionWebhookClient: DiscordWebhookClient;
  private loaderVersionWebhookClient: DiscordWebhookClient;

  /**
   * Initializes the notifier.
   * @param cfg the notification config.
   */
  public constructor(cfg: DiscordNotificationsCfg) {
    this.cfg = cfg;
    this.pingRateLimiter = new PingRateLimiter(cfg.pingCooldown);

    this.modVersionWebhookClient = new DiscordWebhookClient(cfg.modWebhook);
    this.launcherVersionWebhookClient = new DiscordWebhookClient(
      cfg.launcherWebhook,
    );
    this.loaderVersionWebhookClient = new DiscordWebhookClient(
      cfg.loaderWebhook,
    );
  }

  /**
   * Sends a mod version release notification to Discord.
   * @param version the released mod version with the associated mod included.
   * @param initial whether this is the first version of a mod.
   * @remarks DiscordAPIErrors will be logged but not thrown.
   */
  public async sendModVersionReleaseNotification(
    version: ModVersion,
    initial: boolean,
  ): Promise<void> {
    if (!version.mod) {
      throw new Error('Missing required mod association for mod version!');
    }
    const embed: Embed = {
      title: version.mod?.title,
      url: getModUrl(version.mod),
      description: version.mod?.description,
      fields: [
        {
          name: 'Author',
          value: `[${version.mod?.author}](${getUserUrlForUsername(
            version.mod.author,
          )})`,
          inline: true,
        },
        {
          name: 'Version',
          value: version.version,
          inline: true,
        },
        {
          name: 'Changelog',
          value: version.changelog,
          inline: false,
        },
      ],
      thumbnail: {
        url: version.mod?.iconImageUrl || logoUrl,
      },
    };

    if (initial) {
      embed.image = {
        url: version.mod?.bannerImageUrl,
      };
    }

    this.notify(this.modVersionWebhookClient, this.cfg.modRoleId, embed);
  }

  /**
   * Sends a launcher version release notification to Discord.
   * @param version the released launcher version.
   * @remarks DiscordAPIErrors will be logged but not thrown.
   */
  public async sendLauncherVersionReleaseNotification(
    version: LauncherVersion,
  ): Promise<void> {
    const embed: Embed = {
      title: 'RML Launcher',
      url: softwareDownloadUrl,
      fields: [
        {
          name: 'Version',
          value: `[${version.version}](${getLauncherVersionUrl(version)})`,
          inline: true,
        },
        {
          name: 'Changelog',
          value: version.changelog,
          inline: false,
        },
      ],
      thumbnail: {
        url: logoUrl,
      },
    };

    this.notify(
      this.launcherVersionWebhookClient,
      this.cfg.launcherRoleId,
      embed,
    );
  }

  /**
   * Sends a mod loader version release notification to Discord.
   * @param version the released mod loader version with the associated Raft
   * version included.
   * @remarks DiscordAPIErrors will be logged but not thrown.
   */
  public async sendLoaderVersionReleaseNotification(
    version: LoaderVersion,
  ): Promise<void> {
    if (!version.raftVersion) {
      throw new Error(
        'Missing required game version association for loader version!',
      );
    }
    if (!version.readme) {
      throw new Error('Missing changelog for loader version!');
    }

    const embed: Embed = {
      title: 'Raft Mod Loader',
      fields: [
        {
          name: 'Mod Loader Version',
          value: `[${version.rmlVersion}](${getLoaderVersionUrl(version)})`,
          inline: true,
        },
        {
          name: 'Game Version',
          value: version.raftVersion.version,
          inline: true,
        },
        {
          name: 'Changelog',
          value: version.readme,
          inline: false,
        },
      ],
      thumbnail: {
        url: logoUrl,
      },
    };

    this.notify(this.loaderVersionWebhookClient, this.cfg.loaderRoleId, embed);
  }

  private async notify(
    client: DiscordWebhookClient,
    roleId: string,
    embed: Embed,
  ): Promise<void> {
    let message: WebhookMessage;
    if (roleId && this.pingRateLimiter.canPing(roleId)) {
      message = {
        content: formatRoleMention(roleId),
        embeds: [embed],
        allowed_mentions: {
          roles: [roleId],
        },
      };
      this.pingRateLimiter.ping(roleId);
    } else {
      message = {
        embeds: [embed],
        allowed_mentions: {
          parse: [],
        },
      };
    }
    try {
      await client.sendMessage(message);
    } catch (err: unknown) {
      console.error((err as AxiosError).response);
    }
  }
}

function formatRoleMention(roleId: string) {
  return `<@&${roleId}>`;
}

/**
 * Discord Notifier configured with the application configuration.
 */
export default new DiscordNotifier(cfg.discordNotifications);
