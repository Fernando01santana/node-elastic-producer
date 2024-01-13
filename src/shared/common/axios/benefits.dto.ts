export class BenefitsResponseDto {
  success: boolean;
  data: BenefitsDataDto;
}

export class BenefitsDataDto {
  cpf: string;
  beneficios: BeneficioDto[];
}

export class BeneficioDto {
  numero_beneficio: string;
  codigo_tipo_beneficio: string;
}

export class RequestBenefitsDto {
  document: string;
  token: string;
}
