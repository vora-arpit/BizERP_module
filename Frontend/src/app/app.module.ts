import { NgModule,OnInit } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReverseStr } from './shared/pipes/reverse.pipe';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SuccessComponent } from './shared/components/success/success.component';
import { AddressPipe } from './shared/pipes/address.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ReverseStr,
    AuthLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    CoreModule,
    SharedModule,
    NgxChartsModule,
    BrowserAnimationsModule,NgxSpinnerModule.forRoot(),
    MatIconModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
