import Account from '../pages/Account.vue';
import ChangePassword from '../pages/ChangePassword.vue';
import DiscordAuth from '../pages/DiscordAuth.vue';
import ResetPassword from '../pages/ResetPassword.vue';
import SignIn from '../pages/SignIn.vue';
import SignUp from '../pages/SignUp.vue';
import User from '../pages/User.vue';
import FinishAccount from '../pages/FinishAccount.vue';

export default [
  {
    path: '/user/:username',
    name: 'user',
    component: User,
  },
  {
    path: '/signin',
    name: 'signIn',
    component: SignIn,
    meta: { prohibitSession: true },
  },
  {
    path: '/signup',
    name: 'register',
    component: SignUp,
    meta: { prohibitSession: true },
  },
  {
    path: '/forgotpassword',
    name: 'resetPassword',
    component: ResetPassword,
    meta: { prohibitSession: true },
  },
  {
    path: '/auth/discord',
    component: DiscordAuth,
    meta: { prohibitSession: true },
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: { sessionRequired: true },
  },
  {
    path: '/account/password',
    name: 'changePassword',
    component: ChangePassword,
    meta: { sessionRequired: true },
  },
  {
    path: '/account/finish',
    name: 'finishAccount',
    component: FinishAccount,
  },
];
