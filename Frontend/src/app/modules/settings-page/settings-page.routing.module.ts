import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { settingComponent } from './setting/setting.component';
// import { SettingsPageComponent } from './settings-page.component';


const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
    },
    {
        path: 'setting',
        component: settingComponent,
    },

    ];
 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule { }
