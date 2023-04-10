export declare class MomentService {
    validateISOdate(departureTime: any): boolean;
    adjustArrivalTime(departureTime: string, durationEstimated: number): string;
    static getMomentPTBR(): string;
}
