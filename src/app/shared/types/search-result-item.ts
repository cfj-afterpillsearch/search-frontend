import { MedicalInstitution } from '../medical-institution';
import { Pharmacy } from '../pharmacy';

export type searchResultItemType = '医療機関' | '薬局';
export type searchResultItem = MedicalInstitution | Pharmacy;
