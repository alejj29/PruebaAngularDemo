import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Contacto } from '../_models/contacto';
import { CorporativoDetalle, CorporativoEdit, TwContactosCorporativo } from '../_models/corporativoDetalle';
import { ContactoService } from '../_services/contacto.service';
import { CorporativosService } from '../_services/corporativos.service';
import { DatatableData } from './datatables.data';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  formReactive: FormGroup;
  formReactiveContacto: FormGroup;


  constructor(private _route: ActivatedRoute, private _corporativosServices: CorporativosService,
    private _contactoService: ContactoService, private _formBuilder: FormBuilder,
    private _formBuilderContacto: FormBuilder
  ) {
    this.buidFormCorporativo();
    this.buidFormContact();

  }

  private buidFormCorporativo() {
    this.formReactive = this._formBuilder.group({
      S_NombreCorto: [''],
      S_NombreCompleto: [''],
      S_SystemUrl: [''],
      D_FechaIncorporacion: [''],
      S_Activo: ['']
    });
  }
  id;
  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('idDetalle');
    this.id = id
    console.log("id", this.id);
    this.getByIdCorporativo()
  }
  capturaraDatos() {
    this.formReactive.patchValue({
      S_NombreCorto: this.getByIdDetalleCorporativo.S_NombreCorto,
      S_NombreCompleto: this.getByIdDetalleCorporativo.S_NombreCompleto,
      S_SystemUrl: this.getByIdDetalleCorporativo.S_SystemUrl,
      D_FechaIncorporacion: this.getByIdDetalleCorporativo.D_FechaIncorporacion,
      S_Activo: this.getByIdDetalleCorporativo.S_Activo,
    })
  }
  capturaraDatosContact() {
    this.formReactive.patchValue({
      tw_corporativo_id: this.tw_corporativo_id

    })
  }


  tw_corporativo_id: number;
  getByIdDetalleCorporativo: CorporativoDetalle;
  getListContactos: TwContactosCorporativo[] = [];
  getByIdCorporativo() {
    this._corporativosServices.getByIdCorporativo(this.id)
      .subscribe((corporativoDetalle: CorporativoDetalle) => {
        this.getByIdDetalleCorporativo = corporativoDetalle['data'].corporativo;
        this.tw_corporativo_id = corporativoDetalle['data'].corporativo.id
        console.log("getByIdDetalleCorporativo", this.getByIdDetalleCorporativo)
        this.getListContactos = corporativoDetalle['data'].corporativo.tw_contactos_corporativo
        console.log("getListContactos", this.getListContactos)
        this.capturaraDatos();
        this.capturaraDatosContact();
      });
  }
  private buidFormContact() {
    const id = this.tw_corporativo_id;
    console.log("idddddddddddd", id)
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
    console.log("formReactiveContacto", this.formReactiveContacto.value)
    this._contactoService.createContact(this.formReactiveContacto.value)
      .subscribe(contacto => {
        console.log("contacto creado por ale", contacto);
        this.getByIdCorporativo();
        this.buidFormContact();
      })
  }

  deleteContact(idContacto: number) {
    console.log("idContacto", idContacto)
    this._contactoService.deleteContact(idContacto)
      .subscribe(contacto => {
        console.log("elimnado correctamente", contacto);
        this.getByIdCorporativo();
      })
  }

  editContactButon: boolean;
  nomDisable: boolean;
  contactoEdit: Contacto;
  butoneditContact(contacto: Contacto) {
    console.log("row", contacto)
    this.contactoEdit = contacto
    this.editContactButon = true;

  }
  editContact() {
    this.editContactButon = false;
  }
  cambioButon: boolean;
  mostrar;
  editar() {
    this.cambioButon = true;
    this.nomDisable = true;
    this.mostrar = true

  }
  cancelar() {
    this.getByIdCorporativo();
    this.cambioButon = null;
    this.nomDisable = false;
    this.mostrar = false;

  }

  corporativoEdit: CorporativoEdit = {
    id: null,
    S_NombreCorto: null,
    S_NombreCompleto: null,
    S_LogoURL: null,
    S_Activo: null,
    FK_Asignado_id: null,
    D_FechaIncorporacion: null,
  };
  editarDatosGeneral() {

    console.log("corporativoEdit", this.formReactive.value)
    this.cambioButon = false;
  }
  public ColumnMode = ColumnMode;


}
