import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CorporativoDetalle, TwContactosCorporativo } from '../_models/corporativoDetalle';
import { CorporativosService } from '../_services/corporativos.service';
import { DatatableData } from './datatables.data';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _corporativosServices: CorporativosService) { }

  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('idDetalle');
    console.log("id", id);
    this.getByIdCorporativo(id)
  }
  getByIdDetalleCorporativo: CorporativoDetalle;
  getListContactos: TwContactosCorporativo[] = [];
  getByIdCorporativo(id: number) {
    this._corporativosServices.getByIdCorporativo(id)
      .subscribe((corporativoDetalle: CorporativoDetalle) => {
        this.getByIdDetalleCorporativo = corporativoDetalle['data'];
        console.log("getByIdDetalleCorporativo", this.getByIdDetalleCorporativo)
        this.getListContactos = corporativoDetalle['data'].corporativo.tw_contactos_corporativo
        console.log("getListContactos", this.getListContactos)
      });
  }

  public ColumnMode = ColumnMode;

    // row data
    public rows = DatatableData;

    // // column header
    // public columns = [
    //   { name: 'Name', prop: 'full_name' },
    //   { name: 'Email', prop: 'email' },
    //   { name: 'Age', prop: 'age' },
    //   { name: 'Salary', prop: 'salary' }
    // ];
}
