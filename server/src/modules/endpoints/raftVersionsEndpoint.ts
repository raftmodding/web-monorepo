import finale from 'finale-rest';
import { raftVersionModel } from '../../models';
import { schema as addRaftVersionSchema } from '../routes/forms/addRaftVersionForm';
import { schema as editRaftVersionSchema } from '../routes/forms/editRaftVersionForm';
import { validateAdminPrivileges, validateSchema } from './_commons';

const raftVersionsEndpoint = finale.resource({
  model: raftVersionModel,
  endpoints: ['/raftVersions', '/raftVersions/:id'],
  actions: ['read', 'list', 'update', 'create'],
});

export default raftVersionsEndpoint;

raftVersionsEndpoint.read.auth(async (req, res, context) => {
  if (await validateAdminPrivileges(req, res)) {
    return context.continue;
  }
});

raftVersionsEndpoint.update.auth(async (req, res, context) => {
  const user = validateAdminPrivileges(req, res);

  if (!user) {
    return;
  }

  if (!validateSchema(req.body, editRaftVersionSchema, res)) {
    return;
  }

  return context.continue;
});

raftVersionsEndpoint.create.auth(async (req, res, context) => {
  const user = validateAdminPrivileges(req, res);

  if (!user) {
    return;
  }

  if (!validateSchema(req.body, addRaftVersionSchema, res)) {
    return;
  }

  return context.continue;
});
