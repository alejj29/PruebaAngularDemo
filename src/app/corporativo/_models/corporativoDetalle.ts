
export interface TwEmpresasCorporativo {
  id: number;
  S_RazonSocial: string;
  S_RFC: string;
  S_Pais: string;
  S_Estado: string;
  S_Municipio: string;
  S_ColoniaLocalidad: string;
  S_Domicilio: string;
  N_CodigoPostal: string;
  S_UsoCFDI: string;
  S_UrlRFC: string;
  S_UrlActaConstitutiva: string;
  S_Activo: number;
  S_Comentarios?: any;
  created_at: Date;
  updated_at: Date;
  tw_corporativo_id: number;
}

export interface TwContactosCorporativo {
  id: number;
  S_Nombre: string;
  S_Puesto: string;
  S_Comentarios: string;
  N_TelefonoFijo: number;
  N_TelefonoMovil: number;
  S_Email: string;
  created_at: Date;
  updated_at: Date;
  tw_corporativo_id: number;
}

export interface TwContratosCorporativo {
  id: number;
  D_FechaInicio: string;
  D_FechaFin: string;
  S_URLContrato: string;
  created_at: Date;
  updated_at: Date;
  tw_corporativo_id: number;
}

export interface TwDocumento {
  id: number;
  S_Nombre: string;
  N_Obligatorio: number;
  S_Descripcion: string;
  created_at: Date;
  updated_at: Date;
}

export interface TwDocumentosCorporativo {
  id: number;
  tw_corporativo_id: number;
  tw_documento_id: number;
  S_ArchivoUrl: string;
  created_at: Date;
  updated_at: Date;
  tw_documento: TwDocumento;
}

export interface CorporativoDetalle {
  id: number;
  S_NombreCorto: string;
  S_NombreCompleto: string;
  S_LogoURL: string;
  S_DBName: string;
  S_DBUsuario: string;
  S_SystemUrl: string;
  S_Activo: number;
  D_FechaIncorporacion: string;
  created_at: Date;
  updated_at: Date;
  tw_users_id: number;
  FK_Asignado_id: number;
  tw_empresas_corporativo: TwEmpresasCorporativo[];
  tw_contactos_corporativo: TwContactosCorporativo[];
  tw_contratos_corporativo: TwContratosCorporativo[];
  tw_documentos_corporativo: TwDocumentosCorporativo[];
}

export interface CorporativoEdit {
  id?: number;
  S_NombreCorto?: string;
  S_NombreCompleto?: string;
  S_LogoURL?: string;
  S_Activo?: number;
  FK_Asignado_id?: number;
  D_FechaIncorporacion?: string;
}

