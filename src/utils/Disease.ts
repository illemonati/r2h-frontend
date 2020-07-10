export default interface Disease {
    name: string;
    about: string[];
    symptoms: string[];
    people_at_risk: string[];
    [key: string]: string | string[];
}
