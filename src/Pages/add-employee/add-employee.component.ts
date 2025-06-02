import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import {MatFormField} from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { RefreshDashboardService } from '../../Services/refresh-dashboard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-employee',
  imports: [MatCardModule,ReactiveFormsModule,
    MatToolbar,MatIcon,MatFormField,
    MatFormFieldModule,MatInputModule,
    MatRadioModule,MatSelectModule,ToastrModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  employeeForm!:FormGroup;
  private fb = inject(FormBuilder);
  apiServ = inject(ApiService)
  refreshDashBoard = inject(RefreshDashboardService);
  btnText:any;
  headerText:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    public toaster:ToastrService
  ){

  }
  ngOnInit(): void {
    this.btnText = this.data?.isEdit ? 'Update' : 'Submit';
    this.headerText = this.data?.isEdit ? 'Update Employee Form' : 'Employee Form'
    this.employeeForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      gender:['',Validators.required],
      education:['',Validators.required],
      company:['',Validators.required],
      experience:['',Validators.required],
      lpa:['',Validators.required]
    });
    if(this.data?.isEdit){
       this.employeeForm = this.fb.group({
        _id: [this.data?.employee?._id],
      firstname:[this.data?.employee?.firstname,Validators.required],
      lastname:[this.data?.employee?.lastname,Validators.required],
      email:[this.data?.employee?.email,Validators.required],
      gender:[this.data?.employee?.gender,Validators.required],
      education:[this.data?.employee?.education,Validators.required],
      company:[this.data?.employee?.company,Validators.required],
      experience:[this.data?.employee?.experience,Validators.required],
      lpa:[this.data?.employee?.lpa,Validators.required]
    });
    }
  }
  saveForm(){
  if(this.data?.isEdit){
    this.updateForm()
  } else {
    this.addForm();
  }
  }
  addForm(){
     if(this.employeeForm.invalid){
    return
   } else {
    let formValues = this.employeeForm?.value
       this.apiServ.postEmployee(formValues).subscribe({
      next:(res:any)=>{
        if(res && res?.status){
          this.toaster.success('Employee added successfully!', 'Success');
          this.employeeForm.reset();
this.employeeForm.markAsPristine();
this.employeeForm.markAsUntouched();
          this.refreshDashBoard.triggerRefresh()
               this.dialogRef.close(true);
        }
      }
     })
   }
  }
  updateForm(){
   this.apiServ.updateRecord(this.employeeForm?.value).subscribe({
    next:(res:any)=>{
    this.toaster.success('Employee Updated successfully!', 'Success');
           setTimeout(() => {
                  this.dialogRef.close(true)

           }, 2000);
  },
    error:(error:any)=>{
            this.dialogRef.close(true)
    },
    complete:()=>{

    }
   })
  }
    closeDialog(): void {
    this.dialogRef.close(true);
  }
}
