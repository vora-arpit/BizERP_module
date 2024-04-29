import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SettingsPageRoutingModule } from './settings-page.routing.module';
import { settingComponent } from './setting/setting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileSettingService } from '../../core';

@NgModule({
  declarations: [
   
    ProfileComponent,
    settingComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,
    SettingsPageRoutingModule
  ],
  providers:[ProfileSettingService]
})
export class SettingsPageModule { }
