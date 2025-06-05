import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink, RouterOutlet } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { RefreshDashboardService } from '../../Services/refresh-dashboard.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule,RouterLink,RouterOutlet,MatDialogModule,MatMenuModule,MatButtonModule,MatIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  isRestrict:boolean= false;
  employeeName:string = '';
    router = inject(Router);
  constructor(
    public refreshDashBoard: RefreshDashboardService,
    public dialog : MatDialog,
  ){

  }
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user') as any);
    console.log('user',user)
    this.employeeName = user?.fullName;
    // if(user.role === 'admin'){
    //   this.isRestrict = true
    // } else {
    //   this.isRestrict = false;
    // }
    this.isRestrict = (user.role === 'admin') ? true : false;

  }
  addEmployee(){
    const dialogRef = this.dialog.open(AddEmployeeComponent,{
   
  width: '90vw',
  maxWidth: '600px',
  maxHeight: '95vh',
   })
  // Subscribe to the afterClosed event
  dialogRef.afterClosed().subscribe(result => {
    this.refreshDashBoard.triggerRefresh();
    // Perform actions after the dialog is closed, such as updating data or navigating.
  });
  }

  // Returns initials from the full name, e.g. "John Doe" -> "JD"
getInitials(name: string): string {
  if (!name) return '';
  const names = name.split(' ');
  debugger;
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  } else {
    return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  }
}

// Logout function (you define the logic)
logout() {
  console.log('Logging out...');
localStorage.clear();
  this.router.navigate(['/']);

}
}
