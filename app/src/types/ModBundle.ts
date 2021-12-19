import User from './User';
import ModVersion from './ModVersion';

export default interface ModBundle {
  title: string;
  description: string;
  readme: string;
  maintainerId: number;
  bannerImageUrl?: string;
  maintainer?: User;
  modContents?: ModVersion[];
}
