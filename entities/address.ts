import { faker } from '@faker-js/faker';
import { AddressFields } from './entities';

export default class Address {
    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get address(): string {
        return this._address;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get postcode(): string {
        return this._postcode;
    }

    get country(): string {
        return this._country;
    }

    get phone(): string {
        return this._phone;
    }

    get addressAlias(): string {
        return this._addressAlias;
    }

    private _firstName: string;
    private _lastName: string;
    private _address: string;
    private _city: string;
    private _state: string;
    private _postcode: string;
    private _country: string;
    private _phone: string;
    private _addressAlias: string;

    constructor(addressFields: AddressFields) {
        this._firstName = addressFields.firstName;
        this._lastName = addressFields.lastName;
        this._address = addressFields.address;
        this._city = addressFields.city;
        this._state = addressFields.state;
        this._postcode = addressFields.postcode;
        this._country = addressFields.country;
        this._phone = addressFields.phone;
        this._addressAlias = addressFields.addressAlias;
    }

    public static getDefault(): Address {
        const addressFields: AddressFields = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            address: faker.location.streetAddress(),
            city: 'New York',
            country: 'United States',
            state: 'New York',
            phone: faker.string.numeric('10'),
            addressAlias: faker.commerce.productName(),
            postcode: faker.location.zipCode('#####')
        };
        return new Address(addressFields);
    }
}
