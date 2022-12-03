import { Bills } from './bills';
import { FuelCost } from './fuel-cost';
import { readFileSync } from 'fs';
export abstract class Car<ComplectationType extends string> {
    protected readonly abstract volume: number;
    protected readonly abstract consumption: number;
    protected abstract fuelReserve: number;
    protected readonly abstract carName: string;
    constructor(private readonly fuelType: FuelCost) {
    }

    public drive(distance: number) {
        const fuelForDistance = (distance / 100) * this.consumption;
        if(fuelForDistance > this.fuelReserve) {
            const distancePast = (this.fuelReserve / this.consumption) * 100;
            this.fuelReserve = 0;
            this.refuel();
            this.drive(distance - distancePast);
        } else {
            this.fuelReserve -= fuelForDistance;
        }
    }

    private refuel(liters?: number) {
        if(!liters || (liters && (this.fuelReserve + liters) > this.volume)) {
            liters = this.volume - this.fuelReserve;
            this.fuelReserve = this.volume;
        } else {
            this.fuelReserve += liters;
        }
        Bills.addBill('fuel', liters * this.fuelType);
    }

    public getCost(complectation: ComplectationType) {
        const complArray = readFileSync(this.carName + '.txt').toLocaleString().split('\n');
        const complInfo = complArray.find(item => item.includes(complectation));
        if(!complInfo) {
            console.log(`${this.carName} with ${complectation} complectation is not available`);
            return 0;
        }
        else {
            return +(complInfo.match(/\d+/) as RegExpExecArray)[0];
        }
    }

    public buy(complectation: ComplectationType) {
        const cost = this.getCost(complectation);
        if(cost) {
            Bills.addBill('car', cost);
            console.log(`Congrats with buying ${this.carName} with ${complectation} complectation`);
        }
    }
}