import AddMod from '../pages/AddMod.vue';
import AddModVersion from '../pages/AddModVersion.vue';
import EditMod from '../pages/EditMod.vue';
import EditModVersion from '../pages/EditModVersion.vue';
import Mod from '../pages/Mod.vue';
import Mods from '../pages/Mods.vue';
import ModVersions from '../pages/ModVersions.vue';

export default [
  {
    path: '/mods',
    name: 'mods',
    component: Mods,
  },
  { path: '/mods/:id', name: 'mod', component: Mod },
  {
    path: '/mods/:id/edit',
    name: 'editMod',
    component: EditMod,
    meta: { sessionRequired: true },
  },
  {
    path: '/mods/:id/addVersion',
    name: 'addModVersion',
    component: AddModVersion,
    meta: { sessionRequired: true },
  },
  {
    path: '/mods/:id/:version/edit',
    name: 'editModVersion',
    component: EditModVersion,
    meta: { sessionRequired: true },
  },
  {
    path: '/mods/:id/versions',
    name: 'modVersions',
    component: ModVersions,
  },
  {
    path: '/mods/add',
    name: 'addMod',
    component: AddMod,
    meta: { sessionRequired: true },
  },
];
