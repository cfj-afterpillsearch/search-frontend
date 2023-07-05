import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MedicalInstitution} from "./medical-institution";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MedicalInstitutionService {
  constructor(private http: HttpClient) { }

  getMedicalInstitutionsByCurrentLocation(latitude: number, longitude: number): Observable<MedicalInstitution[]> {
    const apiUrl = `/api/search/medical-institutions?latitude=${latitude}&longitude=${longitude}`;
    return this.http.get<MedicalInstitution[]>(apiUrl);
  }

}
