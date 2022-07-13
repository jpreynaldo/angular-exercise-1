import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectForm;
  projectValue: any[] = [];
  showEstValidation: boolean = false;
  saveMessage: boolean = false;
  projectList: Project[] = [
    {prjId: 1, prjName: 'Project 1'},
    {prjId: 2, prjName: 'Project 2'},
    {prjId: 3, prjName: 'Project 3'},
    {prjId: 4, prjName: 'Project 4'},
    {prjId: 5, prjName: 'Project 5'},
    {prjId: 6, prjName: 'Project 6'}
  ];
  employeeList: Employee[] = [
    {empId: 1, empName: 'John Paul'},
    {empId: 2, empName: 'John Doe'},
    {empId: 3, empName: 'Jane Doe'}
  ];
  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
    ) {
    // Form Builder for Project
    this.projectForm = this.formBuilder.group({
      project: new FormControl(0),
      task: new FormControl(''),
      totalEstimate: new FormControl(0),
      employeeEstimations: this.formBuilder.array([])
    })
  }
  /**
   * On Initialization
   */
  ngOnInit(): void {
    this.addEmployeeEst();
    this.getProject();
  }
  getProject() {
    this.projectService.getProject().subscribe({
      next: (val) => {
        this.projectList = val;
      }, error: (err) => {
        console.error(err);
      }
    })
  }
  /**
   * Get Employee Estimation Array from the project form
   */
  get employeeArray(): FormArray {
    return this.projectForm.get('employeeEstimations') as FormArray;
  }
  /**
   * Render new Employee Est. via formGroup
   */
  newEmployeeEst() {
    return new FormGroup({
      employee: new FormControl(''),
      estimate: new FormControl(0),
      actualHours: new FormControl(0  )
    })
  }
  /**
   * Add Employee Est.
   */
  addEmployeeEst() {
    this.employeeArray.push(this.newEmployeeEst());
  }
  /**
   * Remove Employee Est.
   * @param index - the index of the certain object
   */
  removeEmployeeEst(index: number) {
    this.employeeArray.removeAt(index);
  }
  /**
   * Save Project
   * @param value 
   */
  saveProject(value: any) {
    this.saveMessage = true;
    this.projectValue.push(value);
    console.log(this.projectValue);
  }
  /**
   * Total Estimate and employee estimate validation
   */
  estValidation () {
    if (this.projectForm.controls.totalEstimate.value) {
      if (this.addArray(this.employeeArray.value, 'estimate') > +this.projectForm.controls.totalEstimate.value) {
        this.showEstValidation = true;
      } else {
        this.showEstValidation = false;
      }
    }
    
  }
  /**
   * Add array value
   * @param items 
   * @param prop 
   * @returns 
   */
  addArray(items: any, prop: any){
    return items.reduce( (a: any, b: any) => {
        return +a + +b[prop];
    }, 0);
  }
  /**
   * View project/employee name
   * @param value 
   * @param type 
   * @returns 
   */
  viewName(value: number, type: string) {
    let projectName: any[] = [];
    let empName: any[] = [];
    if (type === 'project') {
      projectName = this.projectList.filter(val => {
        return val.prjId === +value;
      });
    } else {
      empName = this.employeeList.filter(val => {
        return val.empId === +value;
      });
    }
    return type === 'project' ? projectName[0]?.prjName : empName[0]?.empName;
  }
}
