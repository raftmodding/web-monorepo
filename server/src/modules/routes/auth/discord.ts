import discordAuthenticator from '../../authenticators/DiscordAuthenticator';
import router from '../router';

router.post('/auth/discord', async (req: any, res: any) => {
  const { code } = req.body;

  try {
    const authData = await discordAuthenticator.getAuthenticationData(code);
    const userData = await discordAuthenticator.getUserData(
      authData.token_type,
      authData.access_token,
    );

    if (await discordAuthenticator.matchesExistingUser(userData)) {
      const session = await discordAuthenticator.login(userData);
      return res.status(200).send(session);
    } else {
      const session = await discordAuthenticator.register(userData, authData);
      return res.status(203).send(session);
    }
  } catch (e) {
    console.warn('discord auth error: ', e);
    return res.status(403).send({ error: 'discord authentication failed!' });
  }
});
