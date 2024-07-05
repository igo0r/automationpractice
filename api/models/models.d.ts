export interface PropertyResponse {
    status: number;
    success: boolean;
    message: string;
    payload: {
        id: number;
        name: string;
        city: string;
        description: string;
        location: {
            lat: number;
            lng: number;
            countryCode: string;
        };
        default_check_in_time: string;
        default_check_out_time: string;
        parking: string;
    };
}
