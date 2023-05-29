import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({points, color, weight}) => {
    const startPoint = L.latLng(points[0][0], points[0][1]);
    const endPoint = L.latLng(points[1][0], points[1][1]);

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
        createMarker: function () {
            return null
        }
    })

    return instance;
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer)

export default RoutingMachine