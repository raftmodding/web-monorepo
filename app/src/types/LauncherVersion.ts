export default interface LauncherVersion {
  version: string;
  timestamp: Date;
  downloadUrl: string;
  downloadCount: number;
  changelog: string;
  updatedAt?: Date;
}
