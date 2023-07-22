interface Location {
  lat: number;
  lng: number;
}

export interface MedicalInstitution {
  name: string;
  postalcode: string;
  address: string;
  tel: string;
  url: string;
  memo_openinghours: string;
  location: Location;
}
