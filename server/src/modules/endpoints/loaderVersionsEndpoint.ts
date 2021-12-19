import finale from 'finale-rest';
import {
  LoaderVersion,
  loaderVersionModel,
  raftVersionModel,
} from '../../models';
import notifier from '../notfier/DiscordNotifier';
import { validateAdminPrivileges } from './_commons';

export const loaderVersionsEndpoint = finale.resource({
  model: loaderVersionModel,
  endpoints: ['/loaderVersions', '/loaderVersions/:rmlVersion'],
  actions: ['read', 'list', 'create'],
  include: [
    {
      model: raftVersionModel,
      as: 'raftVersion',
      attributes: {
        include: [
          'id',
          'version',
          'buildId',
          'title',
          'releasedAt',
          'createdAt',
          'updatedAt',
        ],
      },
    },
  ],
});

export default loaderVersionsEndpoint;

loaderVersionsEndpoint.create.auth(async (req, res, context) => {
  if (await validateAdminPrivileges(req, res)) {
    return context.continue;
  }
});

loaderVersionsEndpoint.create.write.before(async (req, res, context) => {
  req.body.timestamp = new Date();

  return context.continue;
});

loaderVersionsEndpoint.create.write.after(async (req, res, context) => {
  const created: LoaderVersion = (context as any).instance;
  notifier.sendLoaderVersionReleaseNotification(created);
  return context.continue;
});
