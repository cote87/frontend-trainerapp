import { useMapEvents } from "react-leaflet";

export const ZoomWatcher = ({ onZoomChange }) => {
    useMapEvents({
        zoomend: (e) => {
            const newZoom = e.target.getZoom();
            onZoomChange(newZoom);
        },
    });

    return null;
};