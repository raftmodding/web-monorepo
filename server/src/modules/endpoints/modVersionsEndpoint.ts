import finale from 'finale-rest';
import { modModel, ModVersion, modVersionModel } from '../../models';
import notifier from '../notfier/DiscordNotifier';
import { getSchema as getModVersionSchema } from '../routes/forms/addModVersionForm';
import {
  validateAndWriteModFile,
  validateModOwnership,
  validateSchema,
} from './_commons';

export const modVersionsEndpoint = finale.resource({
  model: modVersionModel,
  endpoints: ['/mods/:modId/versions', '/mods/:modId/versions/:version'],
  actions: ['create', 'update'],
});

export default modVersionsEndpoint;

modVersionsEndpoint.create.auth(async (req, res, context) => {
  if (await validateModOwnership(req, res, 'modId')) {
    if (await validateSchema(req.body, await getModVersionSchema(), res)) {
      return context.continue;
    }
  }

  return;
});

modVersionsEndpoint.create.write.before(async (req, res, context) => {
  const { definiteMaxRaftVersion } = req.body;

  req.body.modId = req.params.modId;
  req.body.definiteMaxRaftVersion = !!definiteMaxRaftVersion;

  if (await validateAndWriteModFile(req, res)) {
    return context.continue;
  }
});

modVersionsEndpoint.create.write.after(async (req, res, context) => {
  const newModVersion = ((context as unknown) as {
    instance: ModVersion;
  }).instance;
  const newModVersionWithAssociations = await modVersionModel.findOne({
    where: { id: newModVersion.id },
    include: [modModel],
  });

  if (newModVersionWithAssociations) {
    notifier.sendModVersionReleaseNotification(
      newModVersionWithAssociations,
      false,
    );
  } else {
    console.warn('could not get new mod version with associations: ', {
      id: newModVersion.id,
    });
  }

  return context.continue;
});

modVersionsEndpoint.update.auth(async (req, res, context) => {
  if (await validateModOwnership(req, res, 'modId')) {
    return context.continue;
  }

  return;
});

modVersionsEndpoint.update.write.before(async (req, res, context) => {
  const { definiteMaxRaftVersion } = req.body;

  req.body.modId = req.params.modId;
  req.body.definiteMaxRaftVersion = !!definiteMaxRaftVersion;
  delete req.body.downloadUrl;
  delete req.body.fileHashes;
  delete req.body.downloadCount;

  return context.continue;
});
