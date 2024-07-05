export default class Product {
    get color(): string {
        return this._color;
    }
    get size(): string {
        return this._size;
    }
    get url(): string {
        return this._url;
    }
    get price(): number {
        return this._price;
    }
    get deliveryPrice(): number {
        return this._deliveryPrice;
    }
    get deliveryPriceFormatted(): string {
        return `$${this._deliveryPrice}`;
    }
    get totalPrice(): number {
        return this._totalPrice;
    }
    get totalPriceFormatted(): string {
        return `$${this._totalPrice}`;
    }
    get priceFormatted(): string {
        return `$${this._price}`;
    }
    get id(): number {
        return this._id;
    }
    get description(): string {
        return this._description;
    }
    get name(): string {
        return this._name;
    }
    private _color: string;
    private _size: string;
    private _url: string;
    private _price: number;
    private _deliveryPrice: number;
    private _totalPrice: number;
    private _id: number;
    private _name: string;
    private _description: string;

    constructor(
        id: number,
        name: string,
        description: string,
        color: string,
        size: string,
        price: number,
        deliveryPrice: number
    ) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._color = color;
        this._size = size;
        this._price = price;
        this._deliveryPrice = deliveryPrice;
        this._totalPrice = price + deliveryPrice;
        this._url = `index.php?id_product=${id}&controller=product#/${size}/${color}`;
    }

    public static productSalePrice() {
        return new Product(
            5,
            'Printed Summer Dress',
            'Long printed dress with thin adjustable straps. V-neckline and wiring under the bust with ruffles at the bottom of the dress.',
            '14-color-blue',
            '1-size-s',
            29,
            7
        );
    }

    public static productRegularPrice(): Product {
        return new Product(
            4,
            'Printed Dress',
            'Printed evening dress with straight sleeves with black thin waist belt and ruffled linings.',
            '24-color-pink',
            '1-size-s',
            51,
            7
        );
    }
}
