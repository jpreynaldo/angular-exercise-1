import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, of, retry, throwError } from 'rxjs';
import { Project } from '../models/project.model';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }
  /**
   * Get Projects via HTTP
   * @returns 
   */
  getProject(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:3000/projects').pipe(
      // retry(0),
    )
  }
}
