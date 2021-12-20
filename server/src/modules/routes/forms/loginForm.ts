import router from '../router';
import { password, username } from './_commons';

export const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      ...username.schema,
    },
    password: {
      type: 'string',
      title: 'Password',
    },
  },
  required: ['username', 'password'],
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
      scope: '#/properties/password',
      ...password.uischema,
    },
  ],
};

router.get('/forms/login', async (req: any, res: any) => {
  res.status(200).send({
    schema,
    uischema,
  });
});
