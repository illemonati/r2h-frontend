import axios from 'axios';
import {MapPoint} from "./MapPointFormat";


export type FreeClinics = FreeClinic[];

export interface FreeClinic {
    "@context":  string;
    "@type":     string;
    address:     Address;
    name:        string;
    image:       string;
    description: string;
    telephone:   string;
}

export type FreeClinicMapPoints = FreeClinicMapPoint[];

export interface FreeClinicMapPoint extends MapPoint {
    clinic: FreeClinic
}

export interface Address {
    "@type":         string;
    streetAddress:   string;
    addressLocality: string;
    addressRegion:   string;
    postalCode:      string;
}


export const getFreeClinicsFromZip = async (zip: number) : Promise<FreeClinics> => {
    const url = 'https://www.freeclinics.com/zip.php?zip=' + zip;
    const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
    const resp = await axios.get(corsAnywhere+url);
    const rawHTML = resp.data;
    return await parseHTMLToFreeClinics(rawHTML);
};

export const getFullFreeClinicAddress = (clinic: FreeClinic) : string => {
    const address = clinic['address'];
    return `${address['streetAddress']}, ${address['addressLocality']}, ${address['addressRegion']}, ${address['postalCode']}`;
};

const parseHTMLToFreeClinics = async (html: string) : Promise<FreeClinics> => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const rawClinics = doc.querySelectorAll('script[type="application/ld+json"]') as NodeList;

    const clinics = [] as FreeClinics;
    rawClinics.forEach(rawClinic => {
        try {
            const clinic = JSON.parse(rawClinic.firstChild!.textContent!);
            clinic['description'] = clinic['description'].trim().replace(/&nbsp;/gi,'');
            if (clinic.hasOwnProperty('@type') && clinic['@type'] === 'LocalBusiness') {
                clinics.push(clinic as FreeClinic);
            }
        } catch (e) {};

    })
    return clinics;
};




