import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporativoComponent } from './corporativo.component';
import { CorporativoRoutingModule } from './corporativo-routing..module';

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DetallesComponent } from './detalles/detalles.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  imports: [
    CommonModule,
    CorporativoRoutingModule,
    NgxDatatableModule,
    NgbModule
  ],
  exports: [],
  declarations: [
    DetallesComponent,
    CorporativoComponent
  ],
  providers: [],
})
export class CorporativoModule { }
