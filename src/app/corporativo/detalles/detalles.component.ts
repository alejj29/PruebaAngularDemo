import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Contacto } from '../_models/contacto';
import { CorporativoDetalle, TwContactosCorporativo } from '../_models/corporativoDetalle';
import { ContactoService } from '../_services/contacto.service';
import { CorporativosService } from '../_services/corporativos.service';
import { DatatableData } from './datatables.data';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _corporativosServices: CorporativosService,
    private _contactoService: ContactoService
  ) { }
  id;
  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('idDetalle');
    this.id = id
    console.log("id", this.id);
    this.getByIdCorporativo()
  }
  tw_corporativo_id: number;
  getByIdDetalleCorporativo: CorporativoDetalle;
  getListContactos: TwContactosCorporativo[] = [];
  getByIdCorporativo() {
    this._corporativosServices.getByIdCorporativo(this.id)
      .subscribe((corporativoDetalle: CorporativoDetalle) => {
        this.getByIdDetalleCorporativo = corporativoDetalle['data'];
        this.tw_corporativo_id = corporativoDetalle['data'].corporativo.id
        console.log("getByIdDetalleCorporativo", this.getByIdDetalleCorporativo)
        this.getListContactos = corporativoDetalle['data'].corporativo.tw_contactos_corporativo
        console.log("getListContactos", this.getListContactos)
      });
  }
  crearContacto: Contacto = {
    S_Nombre: null,
    S_Puesto: null,
    S_Comentarios: null,
    N_TelefonoFijo: null,
    N_TelefonoMovil: null,
    S_Email: null,
    tw_corporativo_id: null,
  };

  agregarContacto() {
    this.crearContacto.tw_corporativo_id = this.tw_corporativo_id
    console.log("nombre", this.crearContacto)
    this._contactoService.createContact(this.crearContacto)
      .subscribe(contacto => {
        console.log("contacto creado por ale", contacto);
        this.getByIdCorporativo();
        this.limpiarCampos();
      })
  }

  limpiarCampos() {
    this.crearContacto.S_Nombre = null;
    this.crearContacto.S_Puesto = null;
    this.crearContacto.S_Comentarios = null;
    this.crearContacto.N_TelefonoFijo = null;
    this.crearContacto.N_TelefonoMovil = null;
    this.crearContacto.S_Email = null;
  }

  deleteContact(idContacto: number) {
    console.log("idContacto", idContacto)
    this._contactoService.deleteContact(idContacto)
      .subscribe(contacto => {
        console.log("elimnado correctamente", contacto);
        this.getByIdCorporativo();
      })
  }

  public ColumnMode = ColumnMode;


}
