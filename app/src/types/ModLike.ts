import Mod from './Mod';
import User from './User';

export interface ModLike {
  userId: number;
  modId: string;
  user?: User;
  mod?: Mod;
}
