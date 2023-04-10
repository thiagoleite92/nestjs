import { FlightStatus } from 'src/enums/flightStatus.enum';
export type DetailedRoute = {
    id: string;
    origin: string;
    destiny: string;
    durationEstimated: number;
    departureTime: Date;
    arrivalTime: Date;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    isDeleted: boolean;
    userId: string;
    Flight: {
        id: string;
        routeId: string;
        pilotId: string;
        flightStatus: FlightStatus;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
        isDeleted: boolean;
    }[];
};
