import { Routes } from '@angular/router';
import { LayoutComponent } from '../Pages/layout/layout.component';
import { AddEmployeeComponent } from '../Pages/add-employee/add-employee.component';
import { EmployeeDashboardComponent } from '../Pages/employee-dashboard/employee-dashboard.component';

export const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
             { path: '', component:EmployeeDashboardComponent },
            // {
            //     path: 'add-employee', component: AddEmployeeComponent
            // }
        ]
    }
];
