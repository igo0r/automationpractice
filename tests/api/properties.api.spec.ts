import { expect } from '@playwright/test';
import { test } from '../../fixtures/base.api';
import { predefinedData } from '../../api/models/propertyPredefinedData';

test.describe('Properties API @Seedd41fe', () => {
    test('Retrieve property info using API request @T8f8da5d8', async ({ api }) => {
        let propertyInfoResponse = await api.properties.getPropertyInfo(129);
        expect(
            propertyInfoResponse.status,
            'Expected to have valid status code from property info response'
        ).toBe(predefinedData.status);
        expect(propertyInfoResponse.success).toBe(predefinedData.success);
        expect(propertyInfoResponse.message).toBe(predefinedData.message);
        expect(propertyInfoResponse.payload.id).toBe(predefinedData.payload.id);
        expect(propertyInfoResponse.payload.name).toBe(predefinedData.payload.name);
        expect(propertyInfoResponse.payload.city).toBe(predefinedData.payload.city);
        expect(propertyInfoResponse.payload.description).toBe(predefinedData.payload.description);

        // Compare the location
        const location = propertyInfoResponse.payload.location;
        const expectedLocation = predefinedData.payload.location;
        expect(location.lat).toBe(expectedLocation.lat);
        expect(location.lng).toBe(expectedLocation.lng);
        expect(location.countryCode).toBe(expectedLocation.countryCode);

        // Compare other fields
        expect(propertyInfoResponse.payload.default_check_in_time).toBe(
            predefinedData.payload.default_check_in_time
        );
        expect(propertyInfoResponse.payload.default_check_out_time).toBe(
            predefinedData.payload.default_check_out_time
        );
        expect(propertyInfoResponse.payload.parking).toBe(predefinedData.payload.parking);
    });
});
