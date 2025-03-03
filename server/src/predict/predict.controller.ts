/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Controller('predict')
export class PredictController {
  @Get()
  async getPrediction(
    @Query('n') n: number,
    @Query('variable') variable: string
  ) {
    try {
      // Asegúrate de que la URL y el puerto sean correctos para tu API de Python
      const response = await axios.get(`http://localhost:8000/predict?n=${n}&variable=${variable}`);
      // console.log("DEL SERVER TYPESCRIPT: ", response.data);
      console.log("DEL SERVER TYPESCRIPT:",variable, "Predicciones:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching prediction:', error);
      throw new HttpException('Error al obtener la predicción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
