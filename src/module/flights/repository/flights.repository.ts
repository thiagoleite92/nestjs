export interface IFlightsRepository {
  saveFlight(createFlightDto): Promise<string>;
}
