import router from '../router';
import {
  fileUploadAccept,
  httpS,
  markdownEditor,
  minMaxRaftVersion,
  modCategoriesSchema,
  slug,
} from './_commons';

const getModVersionSchema = async (): Promise<any> => ({
  type: 'object',
  properties: {
    version: {
      type: 'string',
      ...slug.schema,
      title: 'Version',
      description: `Must be a <a href="https://api.raftmodding.com/website/slugs" target="_blank" tabindex="-1">slug</a> and can thus only contain lowercase characters, numbers, dashes, underscores and dots.`,
    },
    ...(await minMaxRaftVersion.getSchema()),
    file: {
      type: 'object',
      title: 'Mod file',
      description: `Upload your mod file. If your mod needs to ship with multiple files, please follow our guide on <a href="https://api.raftmodding.com/website/mods-with-multiple-files" target="_blank">structuring your mod</a>`,
    },
  },
  required: ['version', 'minRaftVersionId', 'maxRaftVersionId', 'file'],
});

export const getSchema = async (): Promise<any> => ({
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Title',
    },
    id: {
      type: 'string',
      ...slug.schema,
      title: 'URL Slug <small class="text-muted">(formerly ID)</small>',
      description: `The <a href="https://api.raftmodding.com/website/slugs" target="_blank" tabindex="-1">slug</a> is a short unique text that will be in the url of the mod, i.e. <code>https://raftmodding.com/mods/<u>mod-slug</u></code>. It may only contain lowercase letters, numbers, dashes, dots and underscores. Slugs can not contain just numbers and can not be longer than 64 characters.`,
    },
    description: {
      type: 'string',
      title: 'Description',
      maxLength: 64,
    },
    bannerImageUrl: {
      type: 'string',
      ...httpS.schema,
      title: 'Banner image URL',
      description:
        'This image will be used when displaying your mod in the mods directory. The recommended size is 660 x 200 pixels.',
    },
    iconImageUrl: {
      type: 'string',
      ...httpS.schema,
      title: 'Icon image URL',
      description:
        'This image will be used when displaying your mod in the discovery tab of the mod loader launcher. It is recommended to use a square image.',
    },
    category: {
      ...modCategoriesSchema,
    },
    readme: {
      type: 'string',
      title: 'Readme',
    },
    repositoryUrl: {
      type: 'string',
      ...httpS.schema,
      title: 'Source code repository URL',
      description: `Can be left out.`,
    },
    ...(await getModVersionSchema()).properties,
  },
  required: [
    'title',
    'id',
    'category',
    'description',
    'readme',
    ...(await getModVersionSchema()).required,
  ],
});

export const uischema = {
  type: 'Vertical',
  elements: [
    { type: 'Control', scope: '#/properties/title', options: { focus: true } },
    {
      type: 'Control',
      scope: '#/properties/id',
      options: {
        placeholder: 'mod-slug',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/description',
      options: {
        placeholder: 'Short description for your mod.',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/bannerImageUrl',
      options: {
        placeholder: 'https://example.com/imagename.png',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/iconImageUrl',
      options: {
        placeholder: 'https://example.com/imagename.png',
      },
    },
    { type: 'Control', scope: '#/properties/category' },
    {
      type: 'Control',
      scope: '#/properties/version',
      options: {
        placeholder: 'v1.0.0',
      },
    },
    ...minMaxRaftVersion.uischema,
    {
      type: 'Control',
      scope: '#/properties/readme',
      options: {
        placeholder: `Explain what your mod is about and how to use it using markdown.`,
        ...markdownEditor.uischema.options,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/repositoryUrl',
      options: {
        placeholder: 'https://github.com/path/to/repository',
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

router.get('/forms/addMod', async (req: any, res: any) => {
  res.status(200).send({
    schema: await getSchema(),
    uischema,
  });
});
