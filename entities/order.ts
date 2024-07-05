export type OrderStatus = 'Awaiting cheque payment' | 'Awaiting bank wire payment';
export type PaymentType = 'Bank wire' | 'Payment by check';

export default class Order {
    get reference(): string {
        return this._reference;
    }
    get date(): string {
        return this._date;
    }
    get totalPrice(): string {
        return this._totalPrice;
    }
    get payment(): PaymentType {
        return this._payment;
    }
    get status(): OrderStatus {
        return this._status;
    }
    private _status: OrderStatus;
    private _payment: PaymentType;
    private _totalPrice: string;
    private _date: string;
    private _reference: string;

    constructor(
        reference: string,
        date: string,
        totalPrice: string,
        payment: PaymentType,
        status: OrderStatus
    ) {
        this._reference = reference;
        this._date = date;
        this._totalPrice = totalPrice;
        this._payment = payment;
        this._status = status;
    }
}
