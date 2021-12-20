export default interface RaftVersion {
  id: number;
  version: string;
  buildId: string;
  title?: string;
  releasedAt: string;
}
