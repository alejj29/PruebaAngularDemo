import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CorporativoDetalle } from '../_models/corporativoDetalle';
import { CorporativosService } from '../_services/corporativos.service';

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
  getByIdDetalleCorporativo:CorporativoDetalle;
  getByIdCorporativo(id: number) {
    this._corporativosServices.getByIdCorporativo(id)
      .subscribe((corporativoDetalle: CorporativoDetalle) => {
        this.getByIdDetalleCorporativo=corporativoDetalle['data'];
        console.log("getByIdDetalleCorporativo", this.getByIdDetalleCorporativo)

      });
  }
}
