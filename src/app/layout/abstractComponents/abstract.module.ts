import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AbstractRoutingModule } from './abstract-routing.module';
import { SearchViewComponent } from './search-view/search-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { LoginRoutingModule } from 'src/app/auth/login/login-routing.module';
import { AppConfigModule } from '../config/app.config.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthServiceService } from 'src/app/auth/ServicesAuth/auth-service.service';
import { InterceptorServiceService } from 'src/app/auth/ServicesAuth/interceptor-service.service';
import { MapService } from 'src/app/auth/ServicesAuth/map.service';
import { CountryService } from 'src/app/demo/service/country.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { EventService } from 'src/app/demo/service/event.service';
import { IconService } from 'src/app/demo/service/icon.service';
import { NodeService } from 'src/app/demo/service/node.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { AspService } from 'src/app/services/asp.service';
import { ConfigService } from 'src/app/services/config.service';
import { ViewService } from 'src/app/services/view.service';
import { MenuService } from '../app.menu.service';
import { TabCreateComponent } from './tab-create/tab-create.component';


@NgModule({
  declarations: [
    SearchViewComponent,
    TabCreateComponent
  ],
  imports: [
    CommonModule,
    AbstractRoutingModule,
    LoginRoutingModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    FormsModule,
    AppConfigModule,
    RippleModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    DialogModule,
    ToastModule,
  ],
  providers: [
    DecimalPipe,
    ConfirmationService,
    ConfigService, MessageService, ViewService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CountryService, CustomerService, EventService, IconService, NodeService,
    PhotoService, MenuService, AspService
  ],

})
export class AbstractModule { }
