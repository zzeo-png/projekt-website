import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"

const createRoutineMachineLayer = ({road, weight}) => {
    const color = 
        road.condition === 0 ? "#009dda" : road.condition === 1 ? "green" : "red"

    const startPoint = L.latLng(road.startPointLAT, road.startPointLNG);
    const endPoint = L.latLng(road.endPointLAT, road.endPointLNG);

    const instance = L.Routing.control({
        waypoints: [startPoint, endPoint],
        lineOptions: {
            styles: [{ color: color, weight: weight }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        showAlternatives: false,
        altLineOptions: { styles: [{opacity: 0}] },
        createMarker: function () {
            return null
        }
    })

    return instance
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer)

export default RoutingMachine