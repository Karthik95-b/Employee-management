import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RefreshDashboardService } from '../../Services/refresh-dashboard.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { error, log } from 'console';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-dashboard',
  imports: [MatTableModule,MatPaginatorModule,ToastrModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
  displayedColumns:any = ['firstname','lastname','email','education','company','exp','package','action']
  empployeeDataSource = new MatTableDataSource([]);
  @ViewChild('paginator') paginator!: MatPaginator;

  refreshDashBoard = inject(RefreshDashboardService);
  constructor(private apiServ:ApiService, 
    private dialog: MatDialog, public toaster:ToastrService){

  }
  ngOnInit(): void {
    this.getAllEmployess();
   this.refreshDashBoard.$refreshAPI.subscribe(() => {
    this.getAllEmployess();
  });

  }
getAllEmployess() {
  this.apiServ.getAllEmployess().subscribe({
    next: (res: any) => {
           if (res?.success && res.data) {
          this.empployeeDataSource = new MatTableDataSource(res.data);
          setTimeout(() => {
          this.empployeeDataSource.paginator = this.paginator; 
           }, 200);
        }
    },
    error: (error: any) => {
    },
    complete: () => {
    }
  });
}

    ngAfterViewInit() {
    // Assign the paginator to the dataSource once view is initialized
    this.empployeeDataSource.paginator = this.paginator;

  }

  onDelete(element:any){
    if(confirm('Are you sure you want to delete this ?')){
        let elementId = element?._id;
   this.apiServ.deleteRecord(elementId).subscribe({
    next:(res:any)=>{
      this.getAllEmployess();
    },
    error:(error:any) =>{
      console.log(error)
    },
    complete:()=>{

    }
   })
    } 
  }
  onEdit(element:any) {
     const dialogRef = this.dialog.open(AddEmployeeComponent,{
   
  width: '90vw',
  maxWidth: '600px',
  maxHeight: '95vh',
data: {
  employee: element,
  isEdit: true
}
   })
   dialogRef.afterClosed().subscribe(result => {
        this.refreshDashBoard.triggerRefresh();
   })
  }
  showToaster(){
   this.toaster.success('Hello')
  }
}
