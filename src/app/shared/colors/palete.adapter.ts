import { Palete } from '../models/components.models';
import { PaleteVariant } from '../types/components.types';
import { LCA_PALETE, GREEN_PALETE, PURPLE_PALETE } from './paletes';

/**
 * Function that presents the color palette according to the desired version of the component
 * @param paleteType
 */
export const SetPalete = (paleteType: PaleteVariant) => {
    
  let palete: Palete;
  switch (paleteType) {
    case 'LCA_PALETE':
      palete = LCA_PALETE;
      break;
    case 'GREEN_PALETE':
      palete = GREEN_PALETE;
      break;
    case 'PURPLE_PALETE':
      palete = PURPLE_PALETE;
      break;
  }

  Object.keys(palete).forEach((key) => {
    document.documentElement.style.setProperty(`--${key}`, (palete as any)[key]);
  });
};
