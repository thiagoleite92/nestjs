import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class MomentService {
  validateISOdate(departureTime: any) {
    return moment(departureTime, moment.ISO_8601, true).isValid();
  }

  adjustArrivalTime(departureTime: string, durationEstimated: string) {
    return moment(departureTime).add(durationEstimated, 'hours').toISOString();
  }

  static getMomentPTBR() {
    return moment(new Date()).add(-3, 'hours').toISOString();
  }

  dateToString(date?: any) {
    return moment(new Date(date)).format('DD/MM/yyyy HH:mm');
  }

  secondsToHoursAndMinutes(segundos: string): string {
    const hours = Math.floor(Number(segundos) / 3600); // Calcula as horas inteiras
    const minutes = Math.floor((Number(segundos) % 3600) / 60); // Calcula os minutos restantes

    return `${hours}:${minutes}`;
  }
}
