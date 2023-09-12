export interface RadioMetaData {
  label: string;
  value: string;
  initialIsChecked: boolean;
}

export interface SearchRequirement {
  name: string;
  radioMetaData: RadioMetaData
}