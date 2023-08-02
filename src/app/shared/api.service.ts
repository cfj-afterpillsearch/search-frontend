import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {MedicalInstitutionApiResponse, PharmacyApiResponse} from './types/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly apiUrlRoot = `${environment.API_URL}/api/v1/search`;

  constructor(private http: HttpClient) {}

  getMedicalInstitutionsByCurrentLocation(latitude: number, longitude: number): Observable<MedicalInstitutionApiResponse> {
    const apiUrl = `${this.apiUrlRoot}/current-location/medical-institutions?latitude=${latitude}&longitude=${longitude}`;
    return this.http.get<MedicalInstitutionApiResponse>(apiUrl);
  }

  getMedicalInstitutionsByAddress(todofuken: string, shikuchoson: string): Observable<MedicalInstitutionApiResponse> {
    const apiUrl = `${this.apiUrlRoot}/address/medical-institutions?todofuken=${todofuken}&shikuchoson=${shikuchoson}`;
    return this.http.get<MedicalInstitutionApiResponse>(apiUrl);
  }

  getPharmaciesByCurrentLocation(latitude: number, longitude: number): Observable<PharmacyApiResponse> {
    const apiUrl = `${this.apiUrlRoot}/current-location/pharmacies?latitude=${latitude}&longitude=${longitude}`;
    return this.http.get<PharmacyApiResponse>(apiUrl);
  }

  getPharmaciesByAddress(todofuken: string, shikuchoson: string): Observable<PharmacyApiResponse> {
    const apiUrl = `${this.apiUrlRoot}/address/pharmacies?todofuken=${todofuken}&shikuchoson=${shikuchoson}`;
    console.log(apiUrl);
    return this.http.get<PharmacyApiResponse>(apiUrl);
  }
}
