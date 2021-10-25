import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Contacto } from '../_models/contacto';
import { CorporativoDetalle, CorporativoEdit, TwContactosCorporativo } from '../_models/corporativoDetalle';
import { ContactoService } from '../_services/contacto.service';
import { CorporativosService } from '../_services/corporativos.service';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  formReactive: FormGroup;
  formReactiveContacto: FormGroup;

  currentDate;
  constructor(private _route: ActivatedRoute, private _corporativosServices: CorporativosService,
    private _contactoService: ContactoService, private _formBuilder: FormBuilder,
    private _formBuilderContacto: FormBuilder
  ) {
    this.buidFormCorporativo();
    this.buidFormContact();
    this.currentDate = new Date("2015/03/25");
  }

  private buidFormCorporativo() {
    this.formReactive = this._formBuilder.group({
      S_NombreCorto: [''],
      S_NombreCompleto: [''],
      S_SystemUrl: [''],
      D_FechaIncorporacion: [this.currentDate],
      S_Activo: [''],
      FK_Asignado_id: [''],
    });
  }
  id;
  d3;
  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('idDetalle');
    this.id = id
    this.getByIdCorporativo()
  }
  capturaraDatos() {

    this.formReactive.patchValue({
      S_NombreCorto: this.getByIdDetalleCorporativo.S_NombreCorto,
      S_NombreCompleto: this.getByIdDetalleCorporativo.S_NombreCompleto,
      S_SystemUrl: this.getByIdDetalleCorporativo.S_SystemUrl,
      D_FechaIncorporacion: new Date(this.getByIdDetalleCorporativo.D_FechaIncorporacion).toISOString().slice(0, -1),
      S_Activo: this.getByIdDetalleCorporativo.S_Activo,
      FK_Asignado_id: this.FK_Asignado_id
    })
  }



  tw_corporativo_id: number;
  getByIdDetalleCorporativo: CorporativoDetalle;
  getListContactos: TwContactosCorporativo[] = [];
  FK_Asignado_id: number;
  getByIdCorporativo() {
    this._corporativosServices.getByIdCorporativo(this.id)
      .subscribe((corporativoDetalle: CorporativoDetalle) => {
        this.getByIdDetalleCorporativo = corporativoDetalle['data'].corporativo;
        this.tw_corporativo_id = corporativoDetalle['data'].corporativo.id
        this.getListContactos = corporativoDetalle['data'].corporativo.tw_contactos_corporativo
        this.FK_Asignado_id = corporativoDetalle['data'].corporativo.FK_Asignado_id
        this.capturaraDatos();
      });
  }
  private buidFormContact() {
    const id = this.tw_corporativo_id;
    this.formReactiveContacto = this._formBuilderContacto.group({
      S_Nombre: [''],
      S_Puesto: [''],
      S_Comentarios: [''],
      N_TelefonoFijo: [''],
      N_TelefonoMovil: [''],
      S_Email: [''],
      tw_corporativo_id: [''],
    });
  }


  agregarContacto() {
    this.formReactiveContacto.value.tw_corporativo_id = this.tw_corporativo_id
    this._contactoService.createContact(this.formReactiveContacto.value)
      .subscribe(contacto => {
        this.getByIdCorporativo();
        this.buidFormContact();
      })
  }

  deleteContact(idContacto: number) {
    this._contactoService.deleteContact(idContacto)
      .subscribe(contacto => {
        this.getByIdCorporativo();
      })
  }

  editContactButon: boolean;
  nomDisable: boolean = true;
  contactoEdit: Contacto;
  idContacto: number;
  butoneditContact(contacto: Contacto) {
    this.idContacto = contacto.id;
    this.formReactiveContacto.patchValue({
      S_Nombre: contacto.S_Nombre,
      S_Puesto: contacto.S_Puesto,
      S_Comentarios: contacto.S_Comentarios,
      N_TelefonoFijo: contacto.N_TelefonoFijo,
      N_TelefonoMovil: contacto.N_TelefonoMovil,
      S_Email: contacto.S_Email,
      tw_corporativo_id: contacto.tw_corporativo_id,
    })
    this.contactoEdit = contacto
    this.editContactButon = true;
  }
  editContact() {
    this._contactoService.updateContact(this.idContacto, this.formReactiveContacto.value)
      .subscribe(contacto => {
        this.getByIdCorporativo();
        this.buidFormContact();
        this.editContactButon = false;
      })
  }
  cambioButon: boolean;
  mostrar;
  editar() {
    this.cambioButon = true;
    this.nomDisable = false;
    this.mostrar = true
  }
  cancelar() {
    this.getByIdCorporativo();
    this.cambioButon = null;
    this.nomDisable = true;
    this.mostrar = false;
  }

  editarDatosGeneral() {

    this._corporativosServices.updateCorporativo(this.id, this.formReactive.value)
      .subscribe(corpor => {
      })
    this.cambioButon = false;
    this.nomDisable = true;
  }
  public ColumnMode = ColumnMode;


}
