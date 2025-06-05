import { Routes } from '@angular/router';
import { LayoutComponent } from '../Pages/layout/layout.component';
import { AddEmployeeComponent } from '../Pages/add-employee/add-employee.component';
import { EmployeeDashboardComponent } from '../Pages/employee-dashboard/employee-dashboard.component';
import { RegisterComponent } from '../Pages/register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
     path:'',component:RegisterComponent
    },
    {
        path: 'dashboard', component: LayoutComponent,
        canActivate:[authGuard],
        children: [
             { path: '', component:EmployeeDashboardComponent },
        ]
    }
];
