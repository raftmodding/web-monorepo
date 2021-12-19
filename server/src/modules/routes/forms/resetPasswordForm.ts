import router from '../router';
import { mail, recaptcha } from './_commons';

export const schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      title: 'E-Mail',
      ...mail.schema,
    },
    recaptcha: {
      type: 'string',
      title: 'Recaptcha',
    },
  },
  required: ['email', 'recaptcha'],
};

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/email',
      options: {
        focus: true,
        placeholder: 'your@mail.com',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/recaptcha',
      ...recaptcha.uischema,
    },
  ],
};

router.get('/forms/resetPassword', async (req: any, res: any) => {
  res.status(200).send({
    schema,
    uischema,
  });
});
