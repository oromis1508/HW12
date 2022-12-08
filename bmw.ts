import { Car } from "./car";
import { FuelCost } from "./fuelCost";

enum BmwComplectation {
    Comfort = 'comf',
    Lux = 'lux'
}

export class Bmw extends Car<BmwComplectation> {
    protected mfr = 'bmw';
    protected fuelCost = FuelCost.P92;
    public constructor(protected fuelReserve: number, protected volume: number, protected consumption: number) {
        super();
    }
}