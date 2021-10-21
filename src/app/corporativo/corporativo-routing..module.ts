import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CorporativoComponent } from './corporativo.component';
import { DetallesComponent } from './detalles/detalles.component';

const routes: Routes = [
  {
    path: '',
    component: CorporativoComponent,
    data: {
      title: 'Corporativos'
    }
  },
  {
    path: 'detalle/:idDetalle',
    component: DetallesComponent,
    data: {
      title: 'Detalles'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class CorporativoRoutingModule { }
