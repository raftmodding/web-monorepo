import { Session, sessionModel, User, userModel } from '../../models';
import { generateToken, validatePassword } from '../utils';
import router from './router';

router.post('/login', async (req: any, res: any) => {
  const { username, password, deviceInfo } = req.body;
  if (username && password) {
    const foundUser = (await userModel.findOne({
      where: { username },
      attributes: ['id', 'password', 'username'],
    })) as User;

    if (foundUser && validatePassword(password, foundUser.password)) {
      const ipHash = generateToken(req.connection.remoteAddress);
      const { token }: Session = (await sessionModel.create({
        token: '[will-be-auto-generated]',
        userId: foundUser.id,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        deviceInfo: {
          ipHash,
          ...deviceInfo,
        },
      })) as Session;
      const withAssociations: Session = (await sessionModel.findOne({
        where: { token },
        include: { model: userModel, as: 'user' },
      })) as Session;

      return res.status(200).send(withAssociations);
    }
  }

  return res.status(403).send({ error: 'Invalid username or password!' });
});
