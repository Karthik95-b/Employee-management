import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { RefreshDashboardService } from '../../Services/refresh-dashboard.service';
@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule,RouterLink,RouterOutlet,MatDialogModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  constructor(
    public refreshDashBoard: RefreshDashboardService,
    public dialog : MatDialog
  ){

  }
  ngOnInit(): void {
    
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
}
