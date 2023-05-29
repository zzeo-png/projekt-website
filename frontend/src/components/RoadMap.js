import React, { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import RoutingMachine from "./RoutingMachine"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine"
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

function RoadMap(){
    const points = [[46.411980, 16.167243], [46.410804, 16.168330]]
    const road = [L.latLng(46.411980, 16.167243), L.latLng(46.410804, 16.168330)]
    const map = React.createRef()
    const defaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    })
    
    return (
        <div className="map">
            <MapContainer center={[46.411980, 16.167243]} zoom={13} whenReady={() => {}} ref={map}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RoutingMachine points={points} color="red" weight={4}/>
            </MapContainer>
        </div>
    )
}

export default RoadMap