import finale from 'finale-rest';
import { modLikeModel } from '../../models';
import { validateAuthToken } from './_commons';

const modLikesEndpoint = finale.resource({
  model: modLikeModel,
  endpoints: ['/modLikes', '/modLikes/:modId'],
  actions: ['list', 'create', 'delete'],
});

export default modLikesEndpoint;

modLikesEndpoint.list.auth(async (req, res, context) => {
  const session = await validateAuthToken(req, res);

  if (!session) {
    return;
  }

  req.body.userId = session.user?.id;

  return context.continue;
});

//intercept and use our own criteria
modLikesEndpoint.list.fetch.before(async (req, res, context) => {
  const { userId } = req.body;
  const modLikes = await modLikeModel.findAll({
    where: {
      userId,
    },
  });

  return res.status(200).send(modLikes);
});

modLikesEndpoint.create.auth(async (req, res, context) => {
  const session = await validateAuthToken(req, res);

  if (!session) {
    return;
  }

  req.body.userId = session.user?.id;

  return context.continue;
});

modLikesEndpoint.create.write.after(async (req, res, context) => {
  const { userId, modId } = req.body;
  const modLike = await modLikeModel.findOne({ where: { userId, modId } });

  return res.status(201).send(modLike);
});

modLikesEndpoint.delete.auth(async (req, res, context) => {
  const session = await validateAuthToken(req, res);

  if (!session) {
    return;
  }

  req.body.userId = session.user?.id;

  return context.continue;
});

modLikesEndpoint.delete.write.before(async (req, res) => {
  const { userId } = req.body;
  const modLike = await modLikeModel.findOne({ where: { userId } });

  if (!modLike) {
    return res.status(404).send({ error: 'mod was never liked by user!' });
  }

  await modLike.destroy();

  return res.status(200).send({ success: true });
});
