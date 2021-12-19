import dayjs from 'dayjs';
import { RaftVersion, raftVersionModel } from '../../../models';
import cfg, { ModCategories } from '../../cfg';
import { capitalize } from '../../utils';

export const slug = {
  schema: {
    pattern: '^[a-z0-9]+(?:[-\\._][a-z0-9]+)*$',
    maxLength: 64,
    errorMessage: {
      pattern:
        'Should be a <a href="https://api.raftmodding.com/website/slugs" target="_blank">slug</a>',
    },
  },
};

export const httpS = {
  schema: {
    pattern: '^https?://',
    errorMessage: {
      pattern: 'Should be a link starting with http/s',
    },
  },
};

//https://stackoverflow.com/a/201378/4622620
export const mail = {
  schema: {
    pattern:
      '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])',
    errorMessage: {
      pattern: 'Should be an e-mail',
    },
  },
};

export const username = {
  schema: {
    minLength: 3,
  },
};

export const password = {
  schema: {
    minLength: 8,
    errorMessage: {
      pattern: `Must contain a number, uppercase letter and special character`,
    },
  },
  uischema: {
    options: {
      password: true,
    },
  },
};

export const disableRule = {
  rule: {
    effect: 'DISABLE',
    condition: {
      const: true,
    },
  },
};

export const markdownEditor = {
  uischema: {
    options: {
      multi: true,
      markdown: true,
    },
  },
};

export const integerMax = {
  maximum: 2147483647,
  errorMessage: {
    maximum: '<u>Must</u> not exceed integer range! (<= 2147483647)',
  },
};

export const fileUploadAccept = {
  accept: cfg.fileUploadAccept.join(', '),
};

export const recaptcha = {
  uischema: {
    options: {
      recaptcha: true,
      siteKey: cfg.reCaptcha.siteKey,
    },
  },
};

export const getRaftVersionsSchema = async (extendedTitle: boolean = false) => {
  const raftVersions = (await raftVersionModel.findAll({
    attributes: ['id', 'title'],
    order: [['version', 'DESC']],
  })) as RaftVersion[];

  return {
    oneOf: [
      ...raftVersions.map((version: RaftVersion) => {
        let title = `Raft Update: ${version.title}`;

        if (extendedTitle) {
          title += ` (${dayjs(version.releasedAt).format('YYYY-MM-DD')})`;
        }

        return {
          const: version.id,
          title,
        };
      }),
    ],
  };
};

export const minMaxRaftVersion = {
  async getSchema() {
    const raftVersionsSchema = await getRaftVersionsSchema();

    return {
      minRaftVersionId: {
        ...raftVersionsSchema,
        title: 'Min. raft version',
      },
      maxRaftVersionId: {
        ...raftVersionsSchema,
        title: 'Max. raft version',
      },
      definiteMaxRaftVersion: {
        type: 'boolean',
        title: 'Definite version cap?',
      },
    };
  },
  uischema: [
    {
      type: 'CustomRangeSelection',
      label: 'Compatible Raft versions',
      elements: [
        { type: 'Control', scope: '#/properties/minRaftVersionId' },
        { type: 'Control', scope: '#/properties/maxRaftVersionId' },
      ],
    },
    { type: 'Control', scope: '#/properties/definiteMaxRaftVersion' },
  ],
};

export const modCategoriesSchema = {
  type: 'string',
  oneOf: [
    ...ModCategories.map((category) => {
      return { title: capitalize(category), const: category };
    }),
  ],
};
