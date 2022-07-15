import { Definition, Standard } from 'src/generated-types';

export interface ICatalogItem {
  id: string;
  description: string;
  isDefault?: boolean;
}

export type Catalog = ICatalogItem[];

export const CATALOG_DEFINITION: Catalog = [
  { id: Definition.Sd, description: 'SD', isDefault: true },
  { id: Definition.Hd, description: 'HD' },
];

export const CATALOG_STANDARD: Catalog = [
  { id: Standard.Ntsc, description: 'NTSC', isDefault: true },
  { id: Standard.Pal, description: 'PAL' },
];

export const getDisplayText = (id: string, catelog: Catalog): string => {
  return catelog.find((item) => item.id === id)?.description;
};
