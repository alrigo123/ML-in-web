/* eslint-disable prettier/prettier */
// src/predict/predict.module.ts
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import { PredictController } from './predict.controller';

@Module({
  controllers: [PredictController],
})
export class PredictModule {}
