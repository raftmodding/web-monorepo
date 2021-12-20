import { DataTypes, Model } from 'sequelize';

import sequelize from '../modules/sequelize';

export interface RaftVersion extends Model {
  id?: number;
  version: string;
  buildId: string;
  title?: string;
  releasedAt: Date;
}

export const raftVersionModel = sequelize.define<RaftVersion>('raft-versions', {
  version: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  buildId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  releasedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
