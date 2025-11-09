import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Tooltip, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./ArgentinaMap.css";
import { Container } from "react-bootstrap";
import { ZoomWatcher } from "../../components/Metrics/ZoomWatcher";

const emptyIcon = new L.DivIcon({
    html: "",
    className: "invisible-icon",
    iconSize: [1, 1],
});

const tierraDelFuegoPos = [-54.8, -68.3];
const saltaPos = [-25, -64.5];

export const ArgentinaMap = (dataDB) => {
    const mapRef = useRef(null);
    const [datosProvincias, setDatosProvincias] = useState(dataDB.data);
    const [geoData, setGeoData] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(5);

    useEffect(() => {
        fetch("/provincias.geojson")
            .then((res) => res.json())
            .then((data) => setGeoData(data));
    }, []);

    useEffect(() => {
        setDatosProvincias(dataDB.data);
    }, [dataDB]);

    const styleFeature = {
        color: "#333",
        weight: 1,
        fillOpacity: 0.6,
        fillColor: "#6baed6",
    };

    const normalize = (str) =>
        str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    useEffect(() => {

    }, [zoomLevel]);

    return (
        <Container className="mt-4">
            <div style={{ height: "113vh", width: "100%" }}>
                <MapContainer
                    center={[-40.5, -63.5]}
                    zoom={5}
                    scrollWheelZoom={true}
                    zoomDelta={0.05}
                    zoomSnap={0.05}
                    wheelDebounceTime={50}
                    style={{ height: "100%", width: "100%" }}
                    whenCreated={(mapInstance) => {
                        mapRef.current = mapInstance;
                        mapInstance.on("zoomend", () => {
                            const newZoom = mapInstance.getZoom();
                            setZoomLevel(newZoom);
                        });
                    }}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> & CartoDB'
                    />

                    <ZoomWatcher onZoomChange={setZoomLevel} />

                    {geoData && (
                        <GeoJSON
                            key={JSON.stringify(datosProvincias) + zoomLevel}
                            data={geoData}
                            style={styleFeature}
                            onEachFeature={(feature, layer) => {
                                const nombre = feature.properties.nombre;

                                // No poner tooltip para estos porque usan marker aparte
                                if (nombre === "Tierra del Fuego" || nombre === "Salta") return;

                                const matchKey = Object.keys(datosProvincias).find(
                                    (key) => normalize(key) === normalize(nombre)
                                );

                                const dato = matchKey
                                    ? datosProvincias[matchKey] ?? "Cargando..."
                                    : "Sin datos";

                                const tooltipContent =
                                    zoomLevel >= 6
                                        ? `<strong>${nombre}</strong><br>${dato}`
                                        : `${dato}`;

                                layer.unbindTooltip();
                                layer.bindTooltip(tooltipContent, {
                                    permanent: true,
                                    direction: "center",
                                    className: "provincia-tooltip",
                                });
                            }}
                        />
                    )}

                    {/* Marker invisible para Tierra del Fuego */}
                    <Marker position={tierraDelFuegoPos} icon={emptyIcon} key={`tdf-${zoomLevel}`}>
                        <Tooltip
                            permanent
                            direction="top"
                            className="provincia-tooltip"
                            offset={[0, -10]}
                            key={`tooltip-tdf-${zoomLevel}`}
                        >
                            {zoomLevel >= 6 ? (
                                <>
                                    <strong>Tierra del Fuego</strong><br />
                                    {datosProvincias["Tierra del Fuego"] || "Sin datos"}
                                </>
                            ) : (
                                datosProvincias["Tierra del Fuego"] || "Sin datos"
                            )}
                        </Tooltip>
                    </Marker>

                    {/* Marker invisible para Salta */}
                    <Marker position={saltaPos} icon={emptyIcon} key={`salta-${zoomLevel}`}>
                        <Tooltip
                            permanent
                            direction="top"
                            className="provincia-tooltip"
                            offset={[10, 10]}
                            key={`tooltip-salta-${zoomLevel}`}
                        >
                            {zoomLevel >= 6 ? (
                                <>
                                    <strong>Salta</strong><br />
                                    {datosProvincias["Salta"] || "Sin datos"}
                                </>
                            ) : (
                                datosProvincias["Salta"] || "Sin datos"
                            )}
                        </Tooltip>
                    </Marker>
                </MapContainer>
            </div>
        </Container>
    );
};
