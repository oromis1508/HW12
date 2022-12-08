import { Bills } from './bills';
import { FuelCost } from "./fuelCost";
import { readFileSync } from 'fs';

export abstract class Car<T> {
    protected abstract fuelReserve: number;
    protected readonly abstract volume: number;
    protected readonly abstract consumption: number;
    protected readonly abstract fuelCost: FuelCost;
    protected readonly abstract mfr: string;

    public drive(distance: number) {
        let fuelForDist = distance / 100 / this.consumption;
        while(fuelForDist < this.fuelReserve) {
            distance -= this.fuelReserve * 100;
            this.fuelReserve = 0;
            this.refuel();
            fuelForDist = distance / 100 / this.consumption
        }
        this.fuelReserve -= fuelForDist;
    }

    private refuel(liters?: number) {
        if(!liters || (liters + this.fuelReserve > this.volume)) 
            liters = this.volume - this.fuelReserve;

        this.fuelReserve = this.fuelReserve + liters;
        Bills.addBill('fuel', this.fuelCost * liters);
    }

    protected getNumericComplectationName(complectation: T): string {
        return '';
    }

    public getCost(complectation: T) {
        const content = JSON.parse(readFileSync(`${this.mfr}.json`).toLocaleString());
        let price: number;
        if(typeof complectation === 'number') {
            price = content[this.getNumericComplectationName(complectation)];
        } else {
            price = content[complectation];
        }
        if(price) return price;
        else console.log('данного авто нет в продаже');
    }

    public buy(complectation: T) {
        const price = this.getCost(complectation);
        if(price) {
            Bills.addBill('car credit', price);
        } else {
            console.log('you are trying to buy a car that not exists', complectation);
        }
    }
    
}
