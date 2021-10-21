import { Component, OnInit, ViewChild } from '@angular/core';
import { usersListData } from './users-list.data';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { CorporativosService } from './_services/corporativos.service';
import { Corporativo } from './_models/corporativo';

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
  public row = usersListData;

  public limitRef = 10;
  // private
  private tempData = [];
  // column header
  // public columns = [
  //   { name: "S_NombreCorto", prop: "S_NombreCorto" },
  //   { name: "Username", prop: "Username" },
  //   { name: "D_FechaIncorporacion", prop: "D_FechaIncorporacion" },
  //   { name: "Last Activity", prop: "Last Activity" },
  //   { name: "Verified", prop: "Verified" },
  //   // { name: "Role", prop: "Role" },
  //   { name: "S_Activo", prop: "S_Activo" },
  //   { name: "Actions", prop: "Actions" },
  // ];
  constructor(private _corporativosServices: CorporativosService) { }

  ngOnInit() {
    console.log("rows", this.row);
    this.token = localStorage.getItem('tokenscloud');
    this.getListCorporativos();
  }
  registrosTotales;
  listCorporativo: Corporativo[] = [];
  rows = this.listCorporativo;
  getListCorporativos() {
    this._corporativosServices.getCorporativos()
      .subscribe((corporativo: Corporativo[]) => {
        // console.log("list  corporativos", corporativo)
        // this.listCorporativo = corporativo['data'];
        console.log("corporativo['data'].length", corporativo['data'].length)
        if (corporativo['data'].length) {
          this.listCorporativo = corporativo['data'];
        }
        console.log(this.listCorporativo)
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
