import { Routes } from '@angular/router';
import { LoginComponent } from './modules/Auth/login/login.component';

export const routes: Routes = [


    {
        path: 'login', redirectTo: 'login', pathMatch: 'full'

    },
    {

        path: 'login', component: LoginComponent
    }

];
