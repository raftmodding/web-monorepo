import { Session, sessionModel, User, userModel } from '../../../models';
import { validateAuthToken, validateSchema } from '../../endpoints/_commons';
import { generateToken } from '../../utils';
import { schema as finishAccountSchema } from '../forms/finishAccountForm';
import router from '../router';

router.post('/account/finish', async (req: any, res: any) => {
  const session = (await validateAuthToken(req, res, true)) as Session;

  if (!session || !session.user) return;

  if (session.user.role !== 'admin' && req.body.role === 'admin') {
    delete req.body.role; //prevent granting admin role
  }

  if (!(await validateSchema(req.body, finishAccountSchema, res))) {
    return;
  }

  const user = (await userModel.findByPk(session.user.id)) as User;
  const { username, email } = req.body;

  if (user.role !== 'UNFINISHED') {
    return res.status(401).send({ error: 'Your account is already finished!' });
  }

  try {
    await user?.update({
      username,
      email,
      role: 'third-party-login-user',
      password: generateToken(),
    });
  } catch (e) {
    return res.status(403).send({ error: 'Username or email already taken' });
  }

  const withAssociations: Session = (await sessionModel.findOne({
    where: { userId: user.id },
    include: { model: userModel, as: 'user' },
  })) as Session;

  return res.status(200).send(withAssociations);
});
