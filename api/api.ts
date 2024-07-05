import { PropertiesController } from './controller/properties.controller';
import { APIRequestContext } from '@playwright/test';

export class API {
    public readonly properties = new PropertiesController(this.request);
    constructor(protected request: APIRequestContext) {}
}
