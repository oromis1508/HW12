export class Bills {
    private static readonly bills = new Map([['FlatRent', 500], ['credits', 2000]]);
    private static readonly taxPercent = 10;
    private static readonly taxMinSum = 50000;
    private static readonly taxBillName = 'tax';

    static getBill(billName: string) {
        return this.bills.get(billName) ?? 0;
    }

    static addBill(billName: string, sum: number) {
        this.bills.set(billName, Bills.getBill(billName) + sum);
        if(billName !== this.taxBillName) {
            const billsSum = Array.from(this.bills).reduce((result, val) => {
                return val[0] === 'tax' ? result : result + val[1];
            }, 0);
            if(billsSum > this.taxMinSum) this.addBill(this.taxBillName, billsSum - this.taxMinSum);    
        }
    }
}