import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from './table/table.component';
import {PostComponent} from './post/post.component';
import {HomePageComponent} from './home-page/home-page.component';
import {CreatePageComponent} from './create-page/create-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full'},
  { path: 'table', component: TableComponent },
  { path: 'create', component: CreatePageComponent },
  { path: 'post/:id', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
