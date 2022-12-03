import { Car } from "./car";
import { FuelCost } from "./fuel-cost";

enum AudiComplectation {
    Basic = 'Bas', Extended = 'Ext'
}

class Audi extends Car<AudiComplectation> {
    protected readonly carName = 'audi';

    constructor(protected readonly volume: number, protected readonly consumption: number, protected fuelReserve: number, fuelType: FuelCost) {
        super(fuelType);
    }
}