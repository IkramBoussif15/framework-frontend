import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AspComponent } from './asp/asp.component';
import { AuthGardServiceService } from './ServicesAuth/auth-gard-service.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'asp',  component: AspComponent},
        { path: 'accessdenied', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        // { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
