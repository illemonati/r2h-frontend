export type MapPoints = MapPoint[]

export interface MapPoint {
    lng: number,
    lat: number,
    popUpString?: string
}


export interface MapQuery {
    centerLng: number,
    centerLat: number,
    mapPoints: MapPoints
}

export function mapQueryToString(mapQuery: MapQuery): string {
    return `centerLng=${mapQuery.centerLng}&centerLat=${mapQuery.centerLat}&mapPoints=${JSON.stringify(mapQuery.mapPoints)}`;
}


