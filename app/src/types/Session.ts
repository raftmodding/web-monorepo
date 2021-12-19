import User from './User';

export default interface Session {
  token: string;
  user?: User;
  expires: Date;
  deviceInfo?: SessionDeviceInfo;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SessionDeviceInfo {
  ipHash: string;
  platform?: string;
  userAgent?: string;
  appVersion?: string;
  vendor?: string;
}
