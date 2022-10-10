import { Test, TestingModule } from '@nestjs/testing';
import { MQTTService } from './mqtt.service';

describe('MQTTService', () => {
  let service: MQTTService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MQTTService],
    }).compile();

    service = module.get<MQTTService>(MQTTService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
