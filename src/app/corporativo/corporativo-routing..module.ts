import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CorporativoComponent } from './corporativo.component';

const routes: Routes = [
  {
    path: '',
    component: CorporativoComponent,
    data: {
      title: 'Corporativos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class CorporativoRoutingModule{}
