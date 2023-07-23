import { MedicalInstitution } from './medical-institution';

interface MetaData {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  searchType: string;
  latitude: number;
  longitude: number;
  address_todofuken: string;
  address_shikuchoson: string;
}

interface Links {
  current: string;
  first: string;
  prev: string | null;
  next: string | null;
  last: string;
}

export interface ApiResponse {
  meta: MetaData;
  links: Links;
  results: MedicalInstitution[];
}
