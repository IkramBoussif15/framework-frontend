import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewService } from './services/view.service';
import { MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AbstractModule } from './layout/abstractComponents/abstract.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        AbstractModule,
        ReactiveFormsModule,
        FormsModule,
        ProgressSpinnerModule,
        AuthModule,


    ],
    providers: [
        MessageService, ViewService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ],

    
    bootstrap: [AppComponent]
})
export class AppModule { }
