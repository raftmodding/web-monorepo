// @ts-nocheck
export { default as LayoutRenderer } from './LayoutRenderer.vue';
export { default as GroupRenderer } from './GroupRenderer.vue';
export { default as CustomRangeSelectionRenderer } from './CustomRangeSelectionRenderer.vue';

import { entry as layoutRendererEntry } from './LayoutRenderer.vue';
import { entry as groupRendererEntry } from './GroupRenderer.vue';
import { entry as customRangeSelectionRendererEntry } from './CustomRangeSelectionRenderer.vue';

export const layoutRenderers = [
  layoutRendererEntry,
  groupRendererEntry,
  customRangeSelectionRendererEntry,
];
