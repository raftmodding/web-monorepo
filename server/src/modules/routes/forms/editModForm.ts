import { ModCategories } from '../../cfg';
import router from '../router';
import { disableRule, httpS, slug } from './_commons';

export const schema = {
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
      description:
        'The <a href="https://api.raftmodding.com/website/slugs" target="_blank">slug</a> is a short unique text that will be in the url of the mod, i.e. <code>https://raftmodding.com/mods/<u>mod-slug</u></code>. It may only contain lowercase letters, numbers, dashes, dots and underscores. Slugs can not contain just numbers and can not be longer than 64 characters.',
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
      type: 'string',
      enum: [...ModCategories],
    },
    readme: {
      type: 'string',
      title: 'Readme',
    },
    repositoryUrl: {
      type: 'string',
      ...httpS.schema,
      title: 'Source code repository URL',
      description: '',
    },
  },
  required: ['title', 'id', 'category'],
};

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
      ...disableRule,
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
      scope: '#/properties/readme',
      options: {
        multi: true,
        markdown: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/repositoryUrl',
      options: {
        placeholder: 'https://github.com/path/to/repository',
      },
    },
  ],
};

router.get('/forms/editMod', async (req: any, res: any) => {
  res.status(200).send({
    schema,
    uischema,
  });
});
