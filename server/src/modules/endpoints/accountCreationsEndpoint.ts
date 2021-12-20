import finale from 'finale-rest';
import { Op } from 'sequelize';
import { accountCreationModel, userModel } from '../../models';
import mailer from '../mailer';
import reCaptchaClient from '../ReCaptchaClient';

const accountCreationsEndpoint = finale.resource({
  model: accountCreationModel,
  endpoints: ['/accountCreations', '/accountCreations/:token'],
  actions: ['create', 'delete'],
});

export default accountCreationsEndpoint;

accountCreationsEndpoint.create.auth(async (req, res, context) => {
  const { username, email, recaptcha } = req.body;

  if (!(await reCaptchaClient.verifyResponseToken(recaptcha))) {
    return res.status(403).send({ error: 'Invalid CAPTCHA!' });
  }

  const user = await userModel.findOne({
    where: { [Op.or]: [{ username }, { email }] },
  });
  const accountCreation = await accountCreationModel.findOne({
    where: { [Op.or]: [{ username }, { email }] },
  });

  if (user || accountCreation) {
    return res
      .status(403)
      .send({ error: 'Username or E-Mail is already taken!' });
  }

  return context.continue;
});

accountCreationsEndpoint.create.write.before(async (req, res, context) => {
  req.body.token = '[WILL BE GENERATED]';

  return context.continue;
});

accountCreationsEndpoint.create.write.after(async (req, res) => {
  //prevent sending data. we don't want to leak the token!
  const { username, email } = req.body;
  const accountCreation = await accountCreationModel.findOne({
    where: { username, email },
  });

  if (accountCreation) {
    mailer.sendAccountCreationMail(accountCreation); // don't await!

    return res.status(204).send();
  }

  return res.status(500).send({ error: 'Failed to create account!' });
});

accountCreationsEndpoint.create.write.after(async (req, res) => {
  //prevent sending data. we don't want to leak the token!
  const { username, email } = req.body;
  const accountCreation = await accountCreationModel.findOne({
    where: { username, email },
  });

  if (accountCreation) {
    mailer.sendAccountCreationMail(accountCreation); // don't await!

    return res.status(204).send();
  }

  return res.status(500).send({ error: 'Failed to create account!' });
});

accountCreationsEndpoint.delete.auth(async (req, res, context) => {
  const { token } = req.params;

  const accountCreation = await accountCreationModel.findOne({
    where: { token },
  });

  if (accountCreation) {
    req.body = accountCreation;

    return context.continue;
  }

  return res.status(403).send({ error: 'Invalid token!' });
});

accountCreationsEndpoint.delete.write.after(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.create({
    username,
    email,
    password,
  });

  if (user) {
    return res.status(204).send(user);
  }

  return res.status(403).send({ error: 'Invalid token!' });
});
