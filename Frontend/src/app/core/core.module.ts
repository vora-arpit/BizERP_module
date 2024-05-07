import { ErrorHandler,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptor, JwtHttpInterceptor } from './interceptors';
import { ClientErrorHandler } from './interceptors/client.error.handler';
import { AuthService, CustomerService, DashboardService, NotificationService, SuperAdminService, UserService } from './services';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ClientErrorHandler },

    AuthGuard,
    UserService,
    AuthService,
    DashboardService,
    CustomerService,
    NotificationService,
    SuperAdminService
  ],
})
export class CoreModule { }
