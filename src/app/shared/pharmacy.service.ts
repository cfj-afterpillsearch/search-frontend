import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from './types/api-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  constructor(private http: HttpClient) {}

  getPharmaciesByCurrentLocation(latitude: number, longitude: number): Observable<ApiResponse> {
    const apiUrl = `https://apiserver-ts4nreykda-an.a.run.app/api/v1/search/current-location/pharmacies?latitude=${latitude}&longitude=${longitude}`;
    return this.http.get<ApiResponse>(apiUrl);
  }

  getPharmaciesByAddress(todofuken: string, shikuchoson: string): Observable<ApiResponse> {
    const apiUrl = `https://apiserver-ts4nreykda-an.a.run.app/api/v1/search/address/pharmacies?todofuken=${todofuken}&shikuchoson=${shikuchoson}`;
    return this.http.get<ApiResponse>(apiUrl);
  }
}
