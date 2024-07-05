import { PropertyResponse } from './models';

export const predefinedData: PropertyResponse = {
    status: 200,
    success: true,
    message: 'Successfully fetched property.',
    payload: {
        id: 129,
        name: 'aachen vereinsstraße',
        city: 'aachen',
        description:
            "In the middle of Aachen's city center you will find our limehome Aachen Vereinsstraße in a quiet side street. Due to the convenient location, you will find the perfect place to escape the hustle and bustle of the city center and start the day relaxed. The connection with public transport could not be better, as the main train station is only 270 m away.",
        location: {
            lat: 50.7697713,
            lng: 6.0931558,
            countryCode: 'DE'
        },
        default_check_in_time: '15:00',
        default_check_out_time: '11:00',
        parking:
            'Unfortunately, there are no private parking spaces available in our limehome. However, with a little luck you will find a paid parking space in the surrounding streets. If you are looking for a covered parking space, you can also park your car in the nearest APAG parking garage Hauptbahnhof, which is only 400 meters away on foot.'
    }
};
