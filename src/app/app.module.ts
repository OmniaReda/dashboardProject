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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeadershipComponent,
    CareComponent,
    TableComponent,
    PopupDetailsComponent,
    LoadingPagesComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MatDialogModule, AppRoutingModule],
  providers: [provideClientHydration(),provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
})
export class AppModule {}
