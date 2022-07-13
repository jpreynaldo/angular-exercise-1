import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const projects = [
      {
        prjId: 1,
        prjName: 'This is a project',
        totalEstimation: 200,
        employeeEstimation: [
          {
            empId: 1,
            estimate: 200,
            actualHours: 'none'
          }
        ]
      }
    ]
    return {projects}
  }
  constructor() { }
}
