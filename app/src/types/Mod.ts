import User from './User';
import ModVersion from './ModVersion';
import ScheduledModDeletion from './ScheduledModDeletion';

export default interface Mod {
  id: string;
  title: string;
  description: string;
  readme: string;
  category: string;
  author: string;
  bannerImageUrl?: string;
  iconImageUrl?: string;
  repositoryUrl?: string;
  versions?: ModVersion[];
  likeCount?: number;
  deletion?: ScheduledModDeletion;
}
