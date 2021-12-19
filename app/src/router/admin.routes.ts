import RaftVersionManagement from '../pages/RaftVersionManagement.vue';
import EditRaftVersion from '../pages/EditRaftVersion.vue';
import AddRaftVersion from '../pages/AddRaftVersion.vue';
import AddLauncherVersion from '../pages/AddLauncherVersion.vue';
import AddLoaderVersion from '../pages/AddLoaderVersion.vue';

export default [
  {
    path: '/raft-version-management',
    name: 'raftVersionManagement',
    component: RaftVersionManagement,
  },
  {
    path: '/raft-version-management/:id',
    name: 'editRaftVersion',
    component: EditRaftVersion,
  },
  {
    path: '/raft-version-management/add',
    name: 'addRaftVersion',
    component: AddRaftVersion,
  },
  {
    path: '/launcher/add',
    name: 'addLauncherVersion',
    component: AddLauncherVersion,
  },
  {
    path: '/loader/add',
    name: 'addLoaderVersion',
    component: AddLoaderVersion,
  },
].map((route: any) => {
  return {
    ...route,
    meta: {
      ...route.meta,
      adminOnly: true,
    },
  };
});
