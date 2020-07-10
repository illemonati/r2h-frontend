import React, {CSSProperties, ReactNode, useEffect, useState} from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './styles.css';
import {LatLng, LatLngExpression} from "leaflet";
import {RouteComponentProps} from 'react-router-dom';
import * as queryString from 'querystring';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import {MapPoints} from "./MapPointFormat";

interface MapComponentProps {
    kind: 'MapComponentProps'
    center: LatLngExpression
    mapPoints?: MapPoints
    children?: ReactNode
}

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent: React.FC<MapComponentProps | RouteComponentProps> = (props: MapComponentProps | RouteComponentProps) => {
    let center: LatLngExpression;
    let mapPoints: MapPoints| null = null;

    if ('kind' in props && props.kind === "MapComponentProps") {
        console.log(props);
        center = props.center;
    } else {
        // @ts-ignore
        const parsedQuery = queryString.parse(props.location.search.substring(1));
        const centerLat = parseFloat(parsedQuery['centerLat'] as string);
        const centerLng = parseFloat(parsedQuery['centerLng'] as string);
        if (parsedQuery['mapPoints']){
            mapPoints = JSON.parse(parsedQuery['mapPoints'] as string) as MapPoints;
        }
        center = new LatLng(centerLat, centerLng);
    }
    
    const [mapStyle, setMapStyle] = useState({height: window.innerHeight, top: 0} as CSSProperties);
    useEffect(() => {
        const resizeFunction = () => {
            const bottomBarHeight = document.querySelector('.bottomNavActions')?.getBoundingClientRect().height;
            const mainAppBarHeight = document.querySelector('.mainAppBar')?.getBoundingClientRect().height;
            const style = {
                height: window.innerHeight-(bottomBarHeight||0) - (mainAppBarHeight||0),
                top: (mainAppBarHeight || 0)
            };
            setMapStyle(style);
        };
        window.addEventListener('resize', () => {
            resizeFunction();
        });
        resizeFunction();
        return () => {
            window.removeEventListener('resize', resizeFunction);
        }
    }, []);


    
    
    return (
        <div className="MapComponent" style={mapStyle}>
                <Map center={center} zoom={12} className="MapComponentMainMap">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {mapPoints?.map((mapPoint, i) => {
                        const coord = new LatLng(mapPoint.lat, mapPoint.lng);
                        return (
                            <Marker position={coord} key={i}>
                                <Popup>{mapPoint.popUpString}</Popup>
                            </Marker>
                        )
                    })}
                </Map>
        </div>
    )
};

export default MapComponent;

