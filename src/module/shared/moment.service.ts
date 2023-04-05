import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Injectable()
export class MomentService {
  validateISOdate(departureTime: any) {
    return moment(departureTime, moment.ISO_8601, true).isValid();
  }

  adjustArrivalTime(departureTime: string, durationEstimated: number) {
    return moment(departureTime).add(durationEstimated, 'hours').toISOString();
  }
}
