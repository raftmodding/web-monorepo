import Mod from './Mod';

export default interface ScheduledModDeletion {
  modId: string;
  deletionTime: Date;
  mod?: Mod;
}
