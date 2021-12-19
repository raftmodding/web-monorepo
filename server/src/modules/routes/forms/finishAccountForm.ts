import router from '../router';
import { mail, username } from './_commons';

export const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      ...username.schema,
    },
    email: {
      type: 'string',
      title: 'E-Mail',
      ...mail.schema,
    },
  },
  required: ['username', 'email'],
};

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/username',
      options: {
        focus: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/email',
      options: {
        placeholder: 'your@mail.com',
      },
    },
  ],
};

router.get('/forms/finishAccount', async (req: any, res: any) => {
  res.status(200).send({
    schema,
    uischema,
  });
});
