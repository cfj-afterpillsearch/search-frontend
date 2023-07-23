import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MedicalInstitutionService {
  constructor(private http: HttpClient) {}

  getMedicalInstitutionsByCurrentLocation(latitude: number, longitude: number): Observable<ApiResponse> {
    const apiUrl = `https://apiserver-ts4nreykda-an.a.run.app/api/v1/search/current-location/medical-institutions?latitude=${latitude}&longitude=${longitude}`;
    return this.http.get<ApiResponse>(apiUrl);
  }

  getMedicalInstitutionsByAddress(todofuken: string, shikuchoson: string): Observable<ApiResponse> {
    const apiUrl = `https://apiserver-ts4nreykda-an.a.run.app/api/v1/search/address/medical-institutions?todofuken=${todofuken}&shikuchoson=${shikuchoson}`;
    return this.http.get<ApiResponse>(apiUrl);
  }
}
