import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BenefitsDto {
  @ApiProperty({
    description: 'Número do benefício',
    example: '7846708245',
  })
  @IsString()
  @IsNotEmpty()
  numero_beneficio: string;

  @ApiProperty({
    description: 'Código do tipo de benefício',
    example: '33',
  })
  @IsString()
  @IsNotEmpty()
  codigo_tipo_beneficio: string;
}

export class BenefitsQueueRequestDto {
  @ApiProperty({
    description: 'Lista de números de documentos',
    example: ['86923000041', '123456789'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  documents: string[];
}
