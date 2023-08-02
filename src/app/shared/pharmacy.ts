interface Location {
  lat: number;
  lng: number;
}

export interface Pharmacy {
  name: string;
  postalcode: string;
  address: string;
  tel: string;
  memo_openinghours: string;
  emergency_contact: string;
  emergency_contact_phone: string;
  location: Location;
}
