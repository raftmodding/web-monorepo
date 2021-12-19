import finale from 'finale-rest';
import { User, userModel } from '../../models';
import { PasswordReset, passwordResetModel } from '../../models/';
import { Role } from '../cfg';
import mailer from '../mailer';
import reCaptchaClient from '../ReCaptchaClient';
import { schema as resetPasswordSchema } from '../routes/forms/resetPasswordForm';
import { validateSchema } from './_commons';

const passwordResetsEndpoint = finale.resource({
  model: passwordResetModel,
  endpoints: ['/passwordResets', '/passwordResets/:token'],
  actions: ['create', 'read', 'delete'],
});

export default passwordResetsEndpoint;

passwordResetsEndpoint.create.auth(async (req, res, context) => {
  const { email, recaptcha } = req.body;

  if (!(await reCaptchaClient.verifyResponseToken(recaptcha))) {
    return res.status(403).send({ error: 'Invalid CAPTCHA!' });
  }

  const user = (await userModel.findOne({ where: { email } })) as User;

  if (!user || user.role === Role.UNFINISHED) {
    // do nothing! we don't want people to find existing email with this form! (dont just trust captcha)
    return res.status(200).send();
  }

  if (await validateSchema(req.body, resetPasswordSchema, res)) {
    return context.continue;
  }
});

passwordResetsEndpoint.create.write.before(async (req, res, context) => {
  const { email } = req.body;
  const user = (await userModel.findOne({ where: { email } })) as User;
  const passwordResetItem = await passwordResetModel.findOne({
    where: { userId: user.id },
  });

  passwordResetItem?.destroy();

  req.body.userId = user.id;
  req.body.token = '[[ WILL BE GENERATED! ]]';

  return context.continue;
});

passwordResetsEndpoint.create.write.after(async (req, res, context) => {
  const { email } = req.body;
  const user = (await userModel.findOne({ where: { email } })) as User;
  const { token } = (await passwordResetModel.findOne({
    where: { userId: user.id },
  })) as PasswordReset;

  mailer.sendPasswordResetMail(user, token); //don't await!
  //prevent any data response! we don't want the tosken to be leaked!
  return res.status(200).send();
});

passwordResetsEndpoint.delete.auth(async (req, res, context) => {
  const { token } = req.params;
  const { password, passwordConfirm } = req.query;

  if (password && passwordConfirm && password === passwordConfirm) {
    const passwordReset = (await passwordResetModel.findOne({
      where: { token },
    })) as PasswordReset;

    if (passwordReset) {
      req.body = { id: passwordReset.userId, password, passwordConfirm };

      return context.continue;
    } else {
      return res.status(403).send({ error: 'Invalid token!' });
    }
  }

  return res.status(403).send({ error: 'Passwords did not match' });
});

passwordResetsEndpoint.delete.write.after(async (req, res, context) => {
  const { id, password } = req.body;
  const user = (await userModel.findOne({ where: { id } })) as User;

  await user.update({
    password,
  });

  return context.continue;
});
