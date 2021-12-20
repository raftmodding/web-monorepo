import router from '../router';
import {
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
      title: 'Mod Version',
      description: `Must be a <a href="https://api.raftmodding.com/website/slugs" target="_blank" tabindex="-1">slug</a> and can thus only contain lowercase characters, numbers, dashes, underscores and dots.`,
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
      description: `Upload your mod file. If your mod needs to ship with multiple files, please follow our guide on <a href="https://api.raftmodding.com/website/mods-with-multiple-files" target="_blank">structuring your mod</a>.`,
    },
  },
  required: ['version', 'minRaftVersionId', 'maxRaftVersionId', 'file'],
});

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/version',
      options: {
        focus: true,
      },
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
    },
  ],
};

router.get('/forms/addModVersion', async (req: any, res: any) => {
  res.status(200).send({
    schema: await getSchema(),
    uischema,
  });
});
