import { Test, TestingModule } from '@nestjs/testing';
import { BenefitsResponseDto } from '../../../shared/common/axios/benefits.dto';
import { HttpService } from '../../../shared/common/axios/httpService';
import { ClientProxyApplication } from '../../../shared/common/rabbitmq/clientProxy/clientProxy';
import { BenefitsQueueRequestDto } from '../dtos/benefts.dto';
import { BenefitsService } from './benefts.service';

describe('BenefitsService', () => {
  let benefitsService: BenefitsService;
  let httpServiceMock: jest.Mocked<HttpService>;
  let rabbitmqServiceMock: jest.Mocked<ClientProxyApplication>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BenefitsService,
        {
          provide: HttpService,
          useValue: {
            getBenefits: jest.fn(),
          },
        },
        {
          provide: ClientProxyApplication,
          useValue: {
            getClientProxy: jest.fn(() => ({
              emit: jest.fn(),
            })),
          },
        },
      ],
    }).compile();

    benefitsService = module.get<BenefitsService>(BenefitsService);
    httpServiceMock = module.get(HttpService);
    rabbitmqServiceMock = module.get(ClientProxyApplication);
  });

  it('should be defined', () => {
    expect(benefitsService).toBeDefined();
  });

  describe('getBenefits', () => {
    it('should call httpService.getBenefits with the provided document', async () => {
      const document = '123456789';
      await benefitsService.getBenefits(document);
      expect(httpServiceMock.getBenefits).toHaveBeenCalledWith(document);
    });

    it('should return the benefits from httpService', async () => {
      const document = '123456789';
      const expectedBenefits: BenefitsResponseDto = {
        data: {
          beneficios: [
            {
              codigo_tipo_beneficio: '01',
              numero_beneficio: '02',
            },
          ],
          cpf: '00000000000',
        },
        success: true,
      };
      httpServiceMock.getBenefits.mockResolvedValue(expectedBenefits);
      const result = await benefitsService.getBenefits(document);
      expect(result).toEqual(expectedBenefits);
    });
  });

  describe('sendDocumnetToQueue', () => {
    it('should emit documents to the rabbitmq service', async () => {
      const documents: BenefitsQueueRequestDto = {
        documents: ['86923000041'],
      };

      await benefitsService.sendDocumnetToQueue(documents);
      const clientProxy = rabbitmqServiceMock.getClientProxy();

      documents.documents.forEach((element) => {
        expect(clientProxy.emit).toHaveBeenCalledWith('yourEventName', element);
      });
    });
  });
});
