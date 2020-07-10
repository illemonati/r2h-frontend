import React, {CSSProperties, useCallback, useEffect, useState} from 'react'
import {Map, Marker, Popup, TileLayer, Viewport} from 'react-leaflet'
import {LatLng} from "leaflet";
import '../styles.css';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import {MapPoints} from "../MapPointFormat";
import {
    getBrowserLatLng,
    getFoodBankFromZip,
    getZipFromLatLng
} from "../map-utils";
import LoadingSnackBarComponent from "../LoadingSnackBar/LoadingSnackBarComponent";


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

const FoodBanksMapComponent: React.FC = () => {

    const [mapPoints, setMapPoints] = useState([] as MapPoints);
    const [center, setCenter] = useState(new LatLng(37.403944, -122.166903));
    const [zoomLevel, setZoomLevel] = useState(10);
    const [listOfFoodBanks, setListOfFoodBanks] = useState([] as any[]);
    const [loadingMessage, setLoadingMessage] = useState("Loading List of Food Banks");

    const attribution = "";


    const refreshListOfFoodBanks = useCallback(
        async () => {
            setLoadingMessage("Loading List of Food Banks");
            try {
                const zips = new Set<number>();

                for (let i = center.lat - 0.1; i < center.lat + 0.1; i += 0.1) {
                    for (let j = center.lng - 0.1; j < center.lng + 0.1; j += 0.1) {
                        try {
                            zips.add(await getZipFromLatLng(new LatLng(i, j)));
                        } catch (e) {
                        }
                    }
                }

                // @ts-ignore
                for (const zip of zips.values()) {
                    for (let i = zip - 1; i < zip + 1; ++i) {
                        const banks = await getFoodBankFromZip(i);
                        setListOfFoodBanks(foodbanks => {
                            for (let bank of banks) {
                                if (!(foodbanks.some(e => e['FullName'] === bank['FullName']))) {
                                    foodbanks.push(bank);
                                }
                            }
                            return foodbanks.slice();
                        });
                    }
                }
            } catch (e) {

            }
        },
        [center],
    );


    useEffect(() => {
        getBrowserLatLng()
            .then(c => setCenter(c))
            .catch(e => console.log('Could not determine browser location : ' + e));
        refreshListOfFoodBanks().then();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setMapPoints((_) => {
            setLoadingMessage("Loading GPS Coords");
            const npoints = [] as MapPoints;
            listOfFoodBanks.forEach((foodBank: any) => {
                const point = {
                    lat: parseFloat((foodBank['MailAddress']['Latitude'])),
                    lng: parseFloat(foodBank['MailAddress']['Longitude']),
                    popUpString: foodBank['FullName']
                };
                npoints.push(point);
            });

            setLoadingMessage("");
            return npoints;
        });
    }, [listOfFoodBanks]);


    const [mapStyle, setMapStyle] = useState({height: window.innerHeight, top: 0} as CSSProperties);
    useEffect(() => {
        const resizeFunction = () => {
            const bottomBarHeight = document.querySelector('.bottomNavActions')?.getBoundingClientRect().height;
            const mainAppBarHeight = document.querySelector('.mainAppBar')?.getBoundingClientRect().height;
            const style = {
                height: window.innerHeight - (bottomBarHeight || 0) - (mainAppBarHeight || 0),
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

    const handleViewportChanged = (viewport: Viewport) => {
        const newCenter = new LatLng(viewport.center![0], viewport.center![1]);

        const newZoom = viewport.zoom;
        if (newZoom) {
            setZoomLevel(_ => newZoom);
        }
        setCenter(newCenter);
        refreshListOfFoodBanks().then();
    };


    return (
        <div className="MapComponent" style={mapStyle}>
            <LoadingSnackBarComponent message={loadingMessage}/>
            <Map center={center} zoom={zoomLevel} className="MapComponentMainMap"
                 onViewportChanged={handleViewportChanged}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution={attribution}
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

export default FoodBanksMapComponent;

