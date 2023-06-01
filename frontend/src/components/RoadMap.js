import React, { Fragment, useEffect, useState } from "react"
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
            console.log(data)
        }

        getRoads()
    }, [])

    const map = React.createRef()
    
    return (
        <Fragment>
            
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
            <div className="legend">
                <div className="title">Stanje cest</div>
                <ul>
                    <li><span className="legend_color" style={{ background: '#009dda' }}></span>odlično</li>
                    <li><span className="legend_color" style={{ background: 'green' }}></span>dobro</li>
                    <li><span className="legend_color" style={{ background: 'red' }}></span>slabo</li>
                </ul>
            </div>
        </Fragment>
        
    )
}

export default RoadMap