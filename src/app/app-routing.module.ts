import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadershipComponent } from './components/leadership/leadership.component';
import { CareComponent } from './components/care/care.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: LeadershipComponent },
  { path: 'care', component: CareComponent },
  { path: 'care-details', component: TableComponent },
  { path: 'mersal-details', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
