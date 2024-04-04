import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchViewComponent } from './search-view/search-view.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'dynamic/:id', component: SearchViewComponent }
])],
exports: [RouterModule]
})
export class AbstractRoutingModule {

 }
