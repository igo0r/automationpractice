import { RequestHolder } from '../requestHolder';
import type { PropertyResponse } from '../models/models';

export class PropertiesController extends RequestHolder {
    async getPropertyInfo(id: number): Promise<PropertyResponse> {
        const propertyResponse = await this.request.get(`properties/v1/public/properties/${id}`);
        return {
            status: propertyResponse.status(),
            ...(await propertyResponse.json())
        } as PropertyResponse;
    }
}
