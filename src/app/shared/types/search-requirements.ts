export interface Radio {
  label: string;
  value: string;
  initialIsChecked: boolean;
}

export interface SearchRequirement {
  name: string;
  radioMetaData: Radio;
}
