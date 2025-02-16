import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadershipComponent } from './components/leadership/leadership.component';
import { CareComponent } from './components/care/care.component';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { ImportedComponent } from './components/imported/imported.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SenderComponent } from './components/sender/sender.component';
import { ProfileIphoneComponent } from './components/profile-iphone/profile-iphone.component';
import { EditProfileIphoneComponent } from './components/edit-profile-iphone/edit-profile-iphone.component';
import { FilesIphoneComponent } from './components/files-iphone/files-iphone.component';

const routes: Routes = [
  { path: '', component: LeadershipComponent },
  { path: 'care', component: CareComponent },
  { path: 'care-details', component: TableComponent },
  { path: 'mersal-details', component: TableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'imported', component: ImportedComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sender', component: SenderComponent },
  { path: 'profile', component: ProfileIphoneComponent },
  { path: 'edit-profile', component: EditProfileIphoneComponent },
  { path: 'files', component: FilesIphoneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
