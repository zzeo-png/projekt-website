import React, { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer } from 'react-leaflet'
import RoutingMachine from "./RoutingMachine"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine"

function RoadMap(){
    const [roads, setRoads] = useState([])

    useEffect(() => {
        const getRoads = async function(){
            const res = await fetch('http://34.65.105.245:3001/roads')
            //const res = await fetch('http://localhost:3001/roads')
            const data = await res.json()
            setRoads(data)
        }

        getRoads()
    }, [])

    const points = [{ points: [[46.411980, 16.167243], [46.410804, 16.168330]], color: "green"},
                    { points: [[46.410251, 16.161315], [46.411974, 16.163936]], color: "red"},
                    { points: [[46.411974, 16.163936], [46.411980, 16.167243]], color: "yellow"}]
                    
    const map = React.createRef()
    
    return (
        <div className="map">
            <MapContainer center={[46.411980, 16.167243]} zoom={13} whenReady={() => {}} ref={map}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {roads.map((road, index) => (
                <RoutingMachine road={road} weight={6}/>
            ))}
            </MapContainer>
        </div>
    )
}

export default RoadMap