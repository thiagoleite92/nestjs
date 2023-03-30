import { CreateRouteDto } from '../dto/create-route.dto';

export interface IRoutesRepository {
  saveRoute(Route: CreateRouteDto): Promise<string>;
}
