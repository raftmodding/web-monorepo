import finale from 'finale-rest';
import { sessionModel, userModel } from '../../models';

const sessionsEndpoint = finale.resource({
  model: sessionModel,
  endpoints: ['/sessions', '/sessions/:token'],
  associations: true,
  actions: ['read', 'delete'],
  include: [
    {
      model: userModel,
      as: 'user',
      attributes: {
        include: ['id', 'username', 'createdAt', 'updatedAt', 'role'],
      },
    },
  ],
});

export default sessionsEndpoint;
