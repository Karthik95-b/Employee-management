import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../Services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MatFormField,
    MatFormFieldModule,MatInputModule,
    MatSelectModule,MatButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
registerForm!:FormGroup;
loginFormInit!:FormGroup;
isRegister:boolean= false;
headerName:string = 'Register'
constructor(
  private fb:FormBuilder,
  private apiServ: ApiService,
  private toaster:ToastrService,
  private router: Router
){

}
ngOnInit(): void {
  this.registerForm = this.fb.group({
    fullName:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
    confirmPassword:['',Validators.required],
    role:['',Validators.required]
  }) 

  this.loginFormInit = this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required],
  })
}
saveForm(){
if(this.registerForm.invalid){
  return
} else {
  console.log('FORmValues',this.registerForm.value)
  this.apiServ.registerUser(this.registerForm.value).subscribe({
    next:(res:any)=>{
      if(res && res?.status == true){
       this.toaster.success(res?.message);
       this.registerForm.reset();
      } else {
            console.log('Showing error toaster:', res?.message);
        this.toaster.error(res?.message)
      }
    } ,
    error:(err)=> {
      if(err){
         if (err?.error?.message) {
      this.toaster.error(err.error.message);
    } else {
      this.toaster.error('Something went wrong!');
    }
    console.log('API call error:', err);
      }
    },
  })
}
}
loginForm(){
  this.isRegister = true;
}
submitLogin(){
if(this.loginFormInit.invalid){
  return
}
console.log('Login Values',this.loginFormInit.value)
this.apiServ.loginUser(this.loginFormInit.value).subscribe({
  next:(res:any)=>{
    console.log('Res',res)
    this.toaster.success(res?.message);
    localStorage.setItem('user',JSON.stringify(res?.data))

    setTimeout(() => {
              this.router.navigate(['/dashboard']);
    }, 0);
  }
})
}
}
