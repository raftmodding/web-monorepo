import router from '../router';
import {
  disableRule,
  fileUploadAccept,
  markdownEditor,
  minMaxRaftVersion,
  slug,
} from './_commons';

export const getSchema = async (): Promise<any> => ({
  type: 'object',
  properties: {
    version: {
      type: 'string',
      ...slug.schema,
      title: 'Mod version',
      description: `You can not change version numbers. <b>Please add a new version if you need a new version name<b>.`,
    },
    ...(await minMaxRaftVersion.getSchema()),
    changelog: {
      type: 'string',
      title: 'Changelog',
      description: `A changelog for this version.`,
    },
    file: {
      type: 'object',
      title: 'Mod file',
      description: `You can not change version numbers. <b>Please add a new version if you need a new version name<b>.`,
    },
  },
  required: ['version', 'minRaftVersionId', 'maxRaftVersionId', 'modFile'],
});

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/version',
      ...disableRule,
    },
    ...minMaxRaftVersion.uischema,
    {
      type: 'Control',
      scope: '#/properties/changelog',
      options: {
        placeholder: `* Fixed this.\n* Added that.`,
        ...markdownEditor.uischema.options,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/file',
      options: {
        file: true,
        ...fileUploadAccept,
      },
      ...disableRule,
    },
  ],
};

router.get('/forms/editModVersion', async (req: any, res: any) => {
  res.status(200).send({
    schema: await getSchema(),
    uischema,
  });
});
