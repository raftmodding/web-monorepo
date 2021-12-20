import RaftVersion from './RaftVersion';

export default interface LoaderVersion {
  rmlVersion: string;
  raftVersionId: number;
  timestamp: Date;
  readme?: string;
  raftVersion?: RaftVersion;
  updatedAt?: Date;
}
