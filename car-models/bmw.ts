import { Car } from "../base/car";
import { FuelCost } from "../cash-items/fuel-cost";

enum BmwComplectation {
    Comfort = 'comfort', Luxury = 'luxury'
}

class Bmw extends Car<BmwComplectation> {
    protected readonly carName = 'bmw';

    constructor(protected readonly volume: number, protected readonly consumption: number, protected fuelReserve: number, fuelType: FuelCost) {
        super(fuelType);
    }
}