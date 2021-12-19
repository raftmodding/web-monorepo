import {
  loaderVersionModel,
  modBundleModel,
  modModel,
  modVersionModel,
  pluginModel,
  pluginVersionModel,
  raftVersionModel,
  scheduledModDeletionModel,
  scheduledPluginDeletionModel,
  sessionModel,
  userModel,
} from '../models';

modModel.hasMany(modVersionModel, {
  as: 'versions',
  foreignKey: 'modId',
});
modModel.belongsToMany(userModel, {
  as: 'likes',
  through: 'ModLikes',
});
modModel.hasOne(scheduledModDeletionModel, {
  as: 'deletion',
  foreignKey: 'modId',
  sourceKey: 'id',
});

loaderVersionModel.belongsTo(raftVersionModel, {
  as: 'raftVersion',
  foreignKey: 'raftVersionId',
});

modBundleModel.belongsTo(userModel, {
  as: 'maintainer',
  foreignKey: 'maintainerId',
  targetKey: 'id',
});
modBundleModel.belongsToMany(modVersionModel, {
  as: 'modContents',
  through: 'ModBundleContents',
});

modVersionModel.belongsTo(modModel, {
  foreignKey: 'modId',
});
modVersionModel.belongsTo(raftVersionModel, {
  as: 'minRaftVersion',
  foreignKey: 'minRaftVersionId',
});
modVersionModel.belongsTo(raftVersionModel, {
  as: 'maxRaftVersion',
  foreignKey: 'maxRaftVersionId',
});
modVersionModel.belongsToMany(modBundleModel, {
  as: 'containingModBundles',
  through: 'ModBundleContents',
});

pluginModel.hasMany(pluginVersionModel, {
  as: 'versions',
  foreignKey: 'pluginId',
});
pluginModel.belongsTo(userModel, {
  as: 'maintainer',
  foreignKey: 'maintainerId',
});
pluginModel.hasOne(scheduledPluginDeletionModel, {
  as: 'deletion',
  foreignKey: 'pluginId',
});

pluginVersionModel.belongsTo(pluginModel, {
  foreignKey: 'pluginId',
});

scheduledModDeletionModel.belongsTo(modModel, {
  as: 'mod',
  foreignKey: 'modId',
  targetKey: 'id',
});

scheduledPluginDeletionModel.belongsTo(pluginModel, {
  foreignKey: 'pluginId',
});

userModel.hasMany(pluginModel, {
  foreignKey: 'maintainerId',
});
userModel.hasMany(modBundleModel, {
  as: 'modBundles',
  foreignKey: 'maintainerId',
  sourceKey: 'id',
});
userModel.belongsToMany(modModel, {
  as: 'likedMods',
  through: 'ModLikes',
});

sessionModel.belongsTo(userModel, {
  as: 'user',
  foreignKey: 'userId',
});
