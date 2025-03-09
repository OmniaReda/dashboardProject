import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeadershipComponent } from './components/leadership/leadership.component';
import { CareComponent } from './components/care/care.component';
import { TableComponent } from './components/table/table.component';
import { PopupDetailsComponent } from './components/popup-details/popup-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingPagesComponent } from './components/loading-pages/loading-pages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ImportedComponent } from './components/imported/imported.component';
import { SenderComponent } from './components/sender/sender.component';
import { TabMobileComponent } from './components/tab-mobile/tab-mobile.component';
import { TabHeaderComponent } from './components/tab-header/tab-header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FilesComponent } from './components/files/files.component';
import { MailSentComponent } from './components/mail-sent/mail-sent.component';
import { ProfileIphoneComponent } from './components/profile-iphone/profile-iphone.component';
import { SettingIphoneComponent } from './components/setting-iphone/setting-iphone.component';
import { EditProfileIphoneComponent } from './components/edit-profile-iphone/edit-profile-iphone.component';
import { FilesIphoneComponent } from './components/files-iphone/files-iphone.component';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HardshipComponent } from './components/hardship/hardship.component';
import { HardshipBarComponent } from './components/hardship-bar/hardship-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeadershipComponent,
    CareComponent,
    TableComponent,
    PopupDetailsComponent,
    LoadingPagesComponent,
    LoginComponent,
    DashboardComponent,
    ImportedComponent,
    SenderComponent,
    TabMobileComponent,
    TabHeaderComponent,
    UserInfoComponent,
    FilesComponent,
    MailSentComponent,
    ProfileIphoneComponent,
    SettingIphoneComponent,
    EditProfileIphoneComponent,
    FilesIphoneComponent,
    HardshipComponent,
    HardshipBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    provideCharts(withDefaultRegisterables()),
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
