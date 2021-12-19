import Mod from './Mod';
import ModBundle from './ModBundle';
import { ModLike } from './ModLike';

export default interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role?: string;
  plugins?: Plugin[];
  modBundles?: ModBundle[];
  likedMods?: ModLike[];
  createdAt?: Date;
  updatedAt?: Date;
}
