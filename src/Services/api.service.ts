import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'http://localhost:3000';
  http = inject(HttpClient)
  constructor() { }

  getAllEmployess(){
    return this.http.get(`${this.baseURL}/employee`);
  }
  postEmployee(formValues:any){
    return this.http.post(`${this.baseURL}/employee`,formValues)
  }
  deleteRecord(elementId:any){
    return this.http.delete(`${this.baseURL}/employee/${elementId}`);
  }
  updateRecord(formValues:any){
    let id = formValues._id;
    return this.http.put(`${this.baseURL}/employee/${id}`,formValues)
  }
  //register
  registerUser(formValues:any){
    return this.http.post(`${this.baseURL}/employee_register`,formValues)
  }
  //login
  loginUser(formValues:any){
    return this.http.post(`${this.baseURL}/employee_Login`,formValues)
  }
}
