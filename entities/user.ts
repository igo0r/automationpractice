import Address from './address';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';

export default class User {
    get email(): string {
        return this._email;
    }
    get firstName(): string {
        return this._firstName;
    }
    get lastName(): string {
        return this._lastName;
    }
    get password(): string {
        return this._password;
    }
    get deliveryAddress(): Address {
        return this._deliveryAddress;
    }
    get billingAddress(): Address {
        return this._billingAddress;
    }
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _password: string;
    private _deliveryAddress: Address;
    private _billingAddress: Address;

    constructor(
        firstName: string,
        lastName: string,
        password: string,
        email: string,
        deliveryAddress: Address,
        billingAddress: Address
    ) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._password = password;
        this._email = email;
        this._deliveryAddress = deliveryAddress;
        this._billingAddress = billingAddress;
    }

    public static notExistingUser(): User {
        return new User(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.internet.password(),
            faker.internet.exampleEmail({ lastName: randomUUID() }),
            Address.getDefault(),
            Address.getDefault()
        );
    }
}
