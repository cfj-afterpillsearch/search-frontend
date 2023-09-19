import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalInstitutionApiResponse, PharmacyApiResponse } from './types/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly apiUrlRoot = `${environment.API_URL}/api/v1/search`;

  constructor(private http: HttpClient) {}

  getMedicalInstitutionsByCurrentLocation(
    latitude: number,
    longitude: number,
    is_open_sunday: string,
    is_open_holiday: string,
  ): Observable<MedicalInstitutionApiResponse> {
    const apiUrl = `${this.apiUrlRoot}/current-location/medical-institutions?latitude=${latitude}&longitude=${longitude}&is_open_sunday=${is_open_sunday}&is_open_holiday=${is_open_holiday}`;
    return this.http.get<MedicalInstitutionApiResponse>(apiUrl);
  }

  getMedicalInstitutionsByAddress(
    todofuken: string,
    shikuchoson: string,
    is_open_sunday: string,
    is_open_holiday: string,
  ): Observable<MedicalInstitutionApiResponse> {
    const apiUrl = `${this.apiUrlRoot}/address/medical-institutions?todofuken=${todofuken}&shikuchoson=${shikuchoson}&is_open_sunday=${is_open_sunday}&is_open_holiday=${is_open_holiday}`;
    return this.http.get<MedicalInstitutionApiResponse>(apiUrl);
  }

  getPharmaciesByCurrentLocation(
    latitude: number,
    longitude: number,
    is_out_of_hours: string,
  ): Observable<PharmacyApiResponse> {
    const apiUrl = `${this.apiUrlRoot}/current-location/pharmacies?latitude=${latitude}&longitude=${longitude}&is_out_of_hours=${is_out_of_hours}`;
    return this.http.get<PharmacyApiResponse>(apiUrl);
  }

  getPharmaciesByAddress(
    todofuken: string,
    shikuchoson: string,
    is_out_of_hours: string,
  ): Observable<PharmacyApiResponse> {
    const apiUrl = `${this.apiUrlRoot}/address/pharmacies?todofuken=${todofuken}&shikuchoson=${shikuchoson}&is_out_of_hours=${is_out_of_hours}`;
    return this.http.get<PharmacyApiResponse>(apiUrl);
  }
}
