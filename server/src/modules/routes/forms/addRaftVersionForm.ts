import router from '../router';
import { integerMax, slug } from './_commons';

export const schema = {
  type: 'object',
  properties: {
    version: {
      type: 'string',
      ...slug.schema,
      title: 'Raft version number',
    },
    buildId: {
      type: 'number',
      title: 'Build ID',
      minimum: 0,
      ...integerMax,
    },
    title: {
      type: 'string',
      title: 'Version Title',
      description: `The title of this update, if there is one. Can be left out for hotfixes and nameless updates.`,
    },
    releasedAt: {
      type: 'string',
      format: 'date',
      title: 'Release date',
    },
  },
  required: ['version', 'buildId', 'releasedAt'],
};

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/version',
      options: {
        focus: true,
        placeholder: `9.05`,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/buildId',
      options: {
        placeholder: `1234567`,
        step: 1,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/title',
      options: {
        placeholder: `The First Chapter`,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/releasedAt',
    },
  ],
};

router.get('/forms/addRaftVersion', async (req: any, res: any) => {
  res.status(200).send({
    schema,
    uischema,
  });
});
