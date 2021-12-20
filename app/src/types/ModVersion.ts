import Mod from './Mod';
import ModBundle from './ModBundle';

export default interface ModVersion {
  id?: number;
  modId: string;
  version: string;
  changelog: string;
  downloadUrl: string;
  downloadCount: number;
  minRaftVersionId?: number;
  maxRaftVersionId?: number;
  definiteMaxRaftVersion: boolean;
  fileHashes?: { [key: string]: string };
  mod?: Mod;
  containingModBundles?: ModBundle[];
  /**
   * Timestamp of the release.
   */
  createdAt: string;
  /**
   * Timestamp of the latest edit.
   */
  updatedAt: string;
}
