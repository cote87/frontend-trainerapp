import { Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { TrainingContext } from "../../context/Training/TrainingContext";
import { TrainerContext } from "../../context/Trainer/TrainerContext";
import { ThematicContext } from "../../context/Thematic/ThematicContex";

export const TrainingSearch = () => {
    const {
        initialSearchFilters,
        searchFilters,
        setSearchFilters,
        clearFilters,
        loadTrainings,
    } = useContext(TrainingContext);

    const { provinces, handlerLoadingProvinces } = useContext(TrainerContext);
    const { thematicList, handlerLoadingThematicsList } = useContext(ThematicContext);

    const [localTitle, setLocalTitle] = useState(initialSearchFilters.title || "");
    const [localOrganizer, setLocalOrganizer] = useState(initialSearchFilters.organizer || "");
    const [localStartDateFrom, setLocalStartDateFrom] = useState(initialSearchFilters.startDateFrom || "");
    const [localStartDateTo, setLocalStartDateTo] = useState(initialSearchFilters.startDateTo || "");
    const [localMode, setLocalMode] = useState(initialSearchFilters.mode || "");
    const [localProvince, setLocalProvince] = useState(initialSearchFilters.provinceId || "");
    const [localThematic, setLocalThematic] = useState(initialSearchFilters.thematicId || "");
    const [localSize, setLocalSize] = useState(initialSearchFilters.size || 5);
    const [localSortBy, setLocalSortBy] = useState(initialSearchFilters.sortBy || "startDateFrom");
    const [localSortDir, setLocalSortDir] = useState(initialSearchFilters.sortDir || "desc");

    // Cargar provincias al montar
    useEffect(() => {
        clearFilters();
        handlerLoadingProvinces();
        handlerLoadingThematicsList();
    }, []);

    useEffect(() => {
        loadTrainings(0);
    }, [searchFilters]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //Creamos el conjunto de filtros para mandar al setSearchFilters
        const dataFilter = {
            title: localTitle,
            startDateFrom: localStartDateFrom,
            startDateTo: localStartDateTo,
            mode: localMode,
            provinceId: localProvince,
            thematicId: localThematic,
            sortBy: localSortBy,
            sortDir: localSortDir,
            size: localSize,
        }
        setSearchFilters(dataFilter);
    };

    return (
        <div>
            <Card className="custom-card">
                <CardHeader className="custom-card-header-search">
                    <h4>Opciones de búsqueda</h4>
                </CardHeader>
                <Form onSubmit={handleSubmit}>
                    <CardBody>
                        <Row className="mb-3">
                            <Col>
                                <label htmlFor="nombre" className="form-label">Nombre de la capacitación</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    placeholder="Buscar por nombre"
                                    value={localTitle}
                                    onChange={(e) => setLocalTitle(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <label className="form-label">Temática</label>
                                <select
                                    className="form-select"
                                    value={localThematic}
                                    onChange={(e) => setLocalThematic(e.target.value ? Number(e.target.value) : "")}
                                >
                                    <option value="">Todas</option>
                                    {thematicList?.map((thematic) => (
                                        <option key={thematic.id} value={thematic.id}>{thematic.name}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <label htmlFor="organizer" className="form-label">Organizado por</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="organizer"
                                    placeholder="Buscar por formador"
                                    value={localOrganizer}
                                    onChange={(e) => setLocalOrganizer(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <label className="form-label">Rango de fechas</label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={localStartDateFrom}
                                        onChange={(e) => setLocalStartDateFrom(e.target.value)}
                                    />
                                    <span className="align-self-center">a</span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={localStartDateTo}
                                        onChange={(e) => setLocalStartDateTo(e.target.value)}
                                    />
                                </div>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <label className="form-label">Modo</label>
                                <select
                                    className="form-select"
                                    value={localMode}
                                    onChange={(e) => setLocalMode(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    <option value="ONSITE">Presencial</option>
                                    <option value="ONLINE">Online</option>
                                    <option value="HYBRID">Presencial+Online</option>
                                </select>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <label className="form-label">Provincia</label>
                                <select
                                    className="form-select"
                                    value={localProvince}
                                    onChange={(e) => setLocalProvince(e.target.value ? Number(e.target.value) : "")}
                                >
                                    <option value="">Todas</option>
                                    {provinces?.map((prov) => (
                                        <option key={prov.id} value={prov.id}>{prov.name}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <hr />
                        <Row className="mb-3">
                            <Col>
                                <label className="form-label">Buscar Por</label>
                                <select
                                    className="form-select"
                                    value={localSortBy}
                                    onChange={(e) => setLocalSortBy(e.target.value)}
                                >
                                    <option key="0" value="startDate">Fecha de inicio</option>
                                    <option key="1" value="province.name">Provincia</option>
                                    <option key="2" value="thematic.name">Temática</option>
                                    <option key="3" value="mode">Modalidad</option>
                                    <option key="4" value="organizer">Organizador</option>

                                </select>
                            </Col>
                            <Col>
                                <label className="form-label">Orden</label>
                                <select
                                    className="form-select"
                                    value={localSortDir}
                                    onChange={(e) => setLocalSortDir(e.target.value)}
                                >
                                    <option key="0" value="desc">Descendente</option>
                                    <option key="1" value="asc">Ascendnente</option>
                                </select>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <label className="form-label">Resultados por página</label>
                                <select
                                    className="form-select"
                                    value={localSize}
                                    onChange={(e) => setLocalSize(e.target.value ? Number(e.target.value) : "")}
                                >
                                    <option key="5" value={5}>5</option>
                                    <option key="10" value={10}>10</option>
                                    <option key="15" value={15}>15</option>
                                </select>
                            </Col>
                        </Row>
                    </CardBody>

                    <CardFooter>
                        <Row>
                            <button type="submit" className="btn btn-azul-oscuro">
                                <i className="bi bi-search"></i> Buscar
                            </button>
                        </Row>
                    </CardFooter>
                </Form>
            </Card>
        </div>
    );
};
