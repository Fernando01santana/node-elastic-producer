import { BenefitsResponseDto } from 'src/shared/common/axios/benefits.dto';

export default interface BenefitsInterface {
  getBenefits(document: string, token: string): Promise<BenefitsResponseDto>;
}
