import { Car } from "./car";
import { FuelCost } from "./fuelCost";

enum FerrariComplectation {
    Basic,
    Advance
}

export class Ferrari extends Car<FerrariComplectation> {
    protected mfr: string;
    protected fuelCost = FuelCost.Diesel;

    public constructor(protected fuelReserve: number, protected volume: number, protected consumption: number) {
        super();
    }

    protected getNumericComplectationName(complectation: FerrariComplectation) {
        return Object.keys(FerrariComplectation).find(key => 
            FerrariComplectation[key] === complectation) as string;
    }

}

