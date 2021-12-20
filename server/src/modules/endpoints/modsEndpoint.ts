import finale from 'finale-rest';
import {
  modLikeModel,
  modModel,
  ModVersion,
  modVersionModel,
  userModel,
} from '../../models';
import notifier from '../notfier/DiscordNotifier';
import { getSchema as getAddModSchema } from '../routes/forms/addModForm';
import {
  extractSession,
  validateAndWriteModFile,
  validateAuthToken,
  validateModOwnership,
  validateSchema,
} from './_commons';

export const modsEndpoint = finale.resource({
  model: modModel,
  endpoints: ['/mods', '/mods/:id'],
  actions: ['read', 'list', 'create', 'update'],
  include: [
    {
      model: modVersionModel,
      as: 'versions',
      order: [['createdAt', 'desc']],
    },
  ],
});

modsEndpoint.create.auth(async (req, res, context) => {
  const session = await validateAuthToken(req, res);

  if (!session) {
    return;
  }

  if (!validateSchema(req.body, await getAddModSchema(), res)) {
    return;
  }

  return context.continue;
});

modsEndpoint.read.fetch.before(async (req, res, context) => {
  const { id } = req.params;

  const mod = await modModel.findOne({
    where: { id },
    include: { model: modVersionModel, as: 'versions' },
  });
  const likes = await modLikeModel.findAll({ where: { modId: id } });

  mod?.setDataValue('likeCount', likes?.length || 0);

  res.status(200).send(mod);
  context.stop;
});

modsEndpoint.create.write.before(async (req, res, context) => {
  const session = await extractSession(req);

  req.body.author = session?.user?.username;

  if (!(await validateAndWriteModFile(req, res))) {
    return;
  }

  return context.continue;
});

modsEndpoint.create.write.after(async (req, res) => {
  const modProps = { ...req.body };
  const {
    id: modId,
    version,
    minRaftVersionId,
    maxRaftVersionId,
    definiteMaxRaftVersion,
    downloadUrl,
    fileHashes,
  } = modProps;
  const newModVersion: ModVersion = await modVersionModel.create({
    modId,
    version,
    changelog: 'This is the first version',
    downloadUrl,
    downloadCount: 0,
    minRaftVersionId,
    maxRaftVersionId,
    definiteMaxRaftVersion: !!definiteMaxRaftVersion,
    fileHashes,
  });

  const newModVersionWithAssociations = await modVersionModel.findOne({
    where: { id: newModVersion.id },
    include: [modModel],
  });

  if (newModVersionWithAssociations) {
    notifier.sendModVersionReleaseNotification(
      newModVersionWithAssociations,
      true,
    );
  } else {
    console.warn('could not find new mod version with associations!', {
      id: newModVersion.id,
    });
  }

  const withAssociations = await modModel.findOne({
    where: {
      id: modId,
    },
    include: {
      model: modVersionModel,
      as: 'versions',
      attributes: { exclude: ['modId', 'id'] },
    },
  });

  return res.status(200).send(withAssociations);
});

modsEndpoint.update.auth(async (req, res, context) => {
  const mod = await validateModOwnership(req, res);

  if (!mod) {
    return;
  }

  const { author } = req.body;

  if (mod.author !== author) {
    const user = await userModel.findOne({ where: { username: author } });

    if (!user) {
      return res
        .status(404)
        .send({ error: `Provided author "<b>${author}</b>" does not exist!` });
    }
  }

  return context.continue;
});

export default modsEndpoint;
