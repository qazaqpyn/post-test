import { UseCaseParams } from '../types';
import { config } from '@/config';

type Params = UseCaseParams;

export type Hello = () => Promise<string>;

export const buildHello = ({ service }: Params): Hello => (
  async () => {
    await service.example.hello({
      example: {
        hello: config.example.message
      }
    });

    return config.example.message;
  }
);