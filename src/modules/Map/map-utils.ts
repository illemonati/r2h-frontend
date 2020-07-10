import axios from 'axios';
import {LatLng} from "leaflet";
import * as xmlParser from 'fast-xml-parser'

export const getLatLngFromQuery = async (query: string): Promise<LatLng | null> => {
    const url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + query;
    const resp = await axios.get(url);
    const data = resp.data as any;
    if (!data || !Array.isArray(data)) {
        return null;
    }

    const lng = data[0]['lon'];
    const lat = data[0]['lat'];
    return new LatLng(lat, lng);
};

export const getBrowserLatLng = async () : Promise<LatLng> => {

    try {
        const loc = await getPosition() as any;
        const coords = loc['coords'] as any;

        const latitude = parseFloat(coords['latitude']);
        const longitude = parseFloat(coords['longitude']);

        return new LatLng(latitude, longitude);
    } catch (e) {
        throw e;
    }

};


const getPosition = () => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

export const getZipFromLatLng = async (latlng: LatLng) => {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`;
        const resp = await axios.get(url);
        const data = resp.data;

        return parseInt(data['address']['postcode']);
    } catch (e) {
        throw e;
    }
};

export const getFoodBankFromZip = async (zip: number) => {
    const url = 'https://ws2.feedingamerica.org/fawebservice.asmx/GetOrganizationsByZip?zip=' + zip;
    const resp = await axios.get(url);
    const data = resp.data;
    const jsonData = xmlParser.parse(data);
    const arrayOfOrganization = jsonData['ArrayOfOrganization'];
    const listOfFoodBanks = [] as any;
    Object.keys(arrayOfOrganization).forEach(key => {
        listOfFoodBanks.push(arrayOfOrganization[key]);
    });
    return listOfFoodBanks;
};




