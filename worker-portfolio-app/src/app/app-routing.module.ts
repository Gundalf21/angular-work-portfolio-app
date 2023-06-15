import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkDetailComponent } from './portfolio/work-detail/work-detail.component';
import { WorkAddComponent } from './portfolio/work-add/work-add.component';
import { WorkListComponent } from './portfolio/work-list/work-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'works', pathMatch: 'full' },
  { path: 'works', component: WorkListComponent },
  { path: 'works/:id', component: WorkDetailComponent },
  { path: 'add', component: WorkAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
