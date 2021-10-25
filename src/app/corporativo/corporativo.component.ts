import { Component, OnInit, ViewChild } from '@angular/core';

import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { CorporativosService } from './_services/corporativos.service';
import { Corporativo } from './_models/corporativo';
import { CorporativoDetalle } from './_models/corporativoDetalle';

@Component({
  selector: 'app-corporativo',
  templateUrl: './corporativo.component.html',
  styleUrls: ['./corporativo.component.scss']
})
export class CorporativoComponent implements OnInit {

  token: string;
  currentUser: string;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  // row data
  public ColumnMode = ColumnMode;


  public limitRef = 10;
  // private
  private tempData = [];

  constructor(private _corporativosServices: CorporativosService) { }

  ngOnInit() {

    this.token = localStorage.getItem('tokenscloud');
    this.getListCorporativos();
  }
  registrosTotales;
  listCorporativo: Corporativo[] = [];
  rows = this.listCorporativo;
  getListCorporativos() {
    this._corporativosServices.getCorporativos()
      .subscribe((corporativo: Corporativo[]) => {
        if (corporativo['data'].length) {
          this.listCorporativo = corporativo['data'];
        }
        console.log(this.listCorporativo)
      });
  }
  getByIdCorporativo(id:number) {
    this._corporativosServices.getByIdCorporativo(id)
      .subscribe((corporativoDetalle: CorporativoDetalle) => {
      });
  }
  /**
 * filterUpdate
 *
 * @param event
 */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.Username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  /**
 * updateLimit
 *
 * @param limit
 */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }
}
