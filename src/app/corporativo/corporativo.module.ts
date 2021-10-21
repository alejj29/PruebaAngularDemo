import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporativoComponent } from './corporativo.component';
import { CorporativoRoutingModule } from './corporativo-routing..module';

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
@NgModule({
  imports: [
    CommonModule,
    CorporativoRoutingModule,
    NgxDatatableModule
  ],
  exports: [],
  declarations: [
    CorporativoComponent
  ],
  providers: [],
})
export class CorporativoModule { }
