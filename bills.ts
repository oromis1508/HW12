export class Bills {
    private static readonly bills: Map<string, number> = new Map([['flat rent', 100]]);
    private static readonly taxBorder = 50000;
    private static readonly taxPercent = 10;
    private static readonly taxName = 'tax';

    public static addBill(billName: string, sum: number) {
        this.bills.set(billName, this.getBill(billName) + sum);

        if(billName !== this.taxName) {
            const billsCount = Array.from(this.bills).reduce((sum, el) => 
            sum + (el[0] === this.taxName ? 0 : el[1]), 0);
            if(billsCount > this.taxBorder) this.addBill(this.taxName, (billsCount - this.taxBorder) * this.taxPercent / 100)    
        }
    }

    public static getBill(billName: string) {
        return this.bills.get(billName) ?? 0;
    }
}