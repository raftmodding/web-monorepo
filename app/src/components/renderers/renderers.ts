// import { arrayRenderers } from './array'; TODO: re-enable without causing issues
import { controlRenderers } from './controls';
import { labelRenderers } from './label';
import { layoutRenderers } from './layouts';

export const vanillaRenderers = [
  ...controlRenderers,
  ...layoutRenderers,
  //  ...arrayRenderers, TODO: re-enable without causing issues
  ...labelRenderers,
];
