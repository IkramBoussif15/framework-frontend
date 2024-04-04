import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { CaptchaModule } from 'primeng/captcha';
import { AspComponent } from './asp/asp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AppConfigModule } from '../layout/config/app.config.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { MapComponent } from './map/map.component';
import { InterceptorServiceService } from './ServicesAuth/interceptor-service.service';
import { MapService } from './ServicesAuth/map.service';
import { ConfirmationService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthServiceService } from './ServicesAuth/auth-service.service';


@NgModule({
    declarations: [AspComponent,MapComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        CaptchaModule,
        LoginRoutingModule,
        ButtonModule,
        InputTextModule,
        CheckboxModule,
        FormsModule,
        AppConfigModule,
        RippleModule,
        ReactiveFormsModule,   
        DropdownModule,
        

    ],
    providers: [
        InterceptorServiceService,
        MapService,
        ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorServiceService,
            multi: true
        },
        AuthServiceService,
    ]
})
export class AuthModule { }
