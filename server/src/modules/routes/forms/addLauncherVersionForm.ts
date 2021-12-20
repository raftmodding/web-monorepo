import router from '../router';
import { markdownEditor, slug } from './_commons';

export const schema = {
  type: 'object',
  properties: {
    version: {
      type: 'string',
      title: 'Launcher version',
      ...slug.schema,
    },
    changelog: {
      type: 'string',
      title: 'Readme',
      description: `A changelog for this version.`,
    },
    file: {
      type: 'object',
      title: 'Launcher file',
      description: `Upload a file.`,
    },
  },
  required: ['version', 'changelog', 'file'],
};

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/version',
      options: {
        focus: true,
        placeholder: '1.3.9',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/changelog',
      options: {
        placeholder: `# Changelog for RML Launcher1,3,9\n\n* Explain what has changed.`,
        ...markdownEditor.uischema.options,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/file',
      options: {
        file: true,
      },
    },
  ],
};

router.get('/forms/addLauncherVersion', async (req: any, res: any) => {
  res.status(200).send({
    schema,
    uischema,
  });
});
