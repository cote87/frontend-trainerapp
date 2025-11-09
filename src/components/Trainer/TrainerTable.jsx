import { useContext, useEffect, useState } from "react";
import { TrainerContext } from "../../context/Trainer/TrainerContext";
import { Paginator } from "../layout/Paginator";
import Swal from "sweetalert2";
import { Card, CardBody, CardFooter, CardHeader, Col, Row } from "react-bootstrap";
import { AuthContext } from "../../auth/context/AuthContext";
import { useSearchParams } from "react-router-dom";

export const TrainerTable = () => {

    const [searchParams] = useSearchParams();

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        province: '',
        thematic: '',
        size: '10',
        orderBy: 'lastname',
        asc: 'true',
        enabled: 'true'
    });

    const { name, lastname, province, thematic, size, orderBy, asc, enabled } = formData;

    const {
        totalPages,
        pageable,
        trainers,
        handlerVisibleForm,
        handlerFillCurrentTrainer,
        handlerDeleteTrainer,
        handlerUnsuscribeTrainer,
        handlerViewTrainer,
        handlerLoadingTrainers,
        handlerCleanErrors,
    } = useContext(TrainerContext);

    const {
        login
    } = useContext(AuthContext);


    const writeable = login.user.authorities.includes("KEY_WRITE_TRAINERS");
    const deleteable = login.user.authorities.includes("KEY_DELETE_TRAINERS");


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                handlerLoadingTrainers()
            } catch (err) {
                setError('Hubo un error al cargar los especialistas formadores.');
            } finally {
                setLoading(false); // Terminamos de cargar
            }
        };
        fetchTrainers(); // Llamamos a la función para obtener los formadores
    }, [searchParams]);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            name: searchParams.get('name') || '',
            lastname: searchParams.get('lastname') || '',
            province: searchParams.get('province') || '',
            thematic: searchParams.get('thematic') || '',
            size: searchParams.get('size') || '10',
            orderBy: searchParams.get('orderBy') || 'lastname',
            asc: searchParams.get('asc') || 'true',
            enabled: searchParams.get('enabled') || ''
        }));
    }, [searchParams]);


    const onEditForm = (id) => {
        handlerVisibleForm(true);
        handlerFillCurrentTrainer(id);
        handlerCleanErrors();
    }

    const onShowForm = (id) => {
        handlerViewTrainer(id);
    }

    const onDown = (id) => {

        Swal.fire({
            title: "Está seguro?",
            text: "Está por dar de baja un formador!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, dar de baja!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Completado!",
                    text: "El formador ha sido dado de baja.",
                    icon: "success"
                });
                handlerUnsuscribeTrainer(id);
            }
        });
    }

    const onDelete = (id) => {
        Swal.fire({
            title: "Está seguro?",
            text: "Está por eliminar definitivamente un formador!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Completado!",
                    text: "El formador ha sido eliminado.",
                    icon: "success"
                });
                handlerDeleteTrainer(id);
            }
        });
    }

    if (loading) {
        return (
            <div className="container-fluid">
                <div className="alert alert-warning" >Cargando datos...</div>
            </div>
        );
    }

    // Si ocurrió un error, lo mostramos
    if (error) {
        return (
            <div className="container-fluid">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    const onSubmitSearch = (event) => {

    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    return (<>
        <div className="form-group row">
            <div className="form-group col-3">
                <Card className="my-4 custom-card" backgroundcolor="transparent">
                    <form onSubmit={onSubmitSearch}>
                        <CardHeader className="custom-card-heade-search">
                            <h4>Opciones de búsqueda</h4>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            id="name"
                                            value={name}
                                            onChange={onInputChange}
                                            autoComplete="off"
                                            placeholder="Nombre"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label">Apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastname"
                                            id="lastname"
                                            value={lastname}
                                            onChange={onInputChange}
                                            placeholder="Apellido"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>

                                    <div className="mb-3">
                                        <label htmlFor="province" className="form-label">Provincia</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="province"
                                            id="province"
                                            value={province}
                                            onChange={onInputChange}
                                            placeholder="Provincia"
                                        />
                                    </div>


                                    <div className="mb-3">
                                        <label htmlFor="thematic" className="form-label">Temática</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="thematic"
                                            id="thematic"
                                            value={thematic}
                                            onChange={onInputChange}
                                            placeholder="Temática"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <div className="mb-3">
                                <Row className="m-1">
                                    <Col>
                                        <label htmlFor="size" className="form-label">Resultados por página:</label>
                                        <select
                                            className="form-select"
                                            name="size"
                                            id="size"
                                            onChange={onInputChange}
                                            value={size}
                                        >
                                            <option value={10}>10</option>
                                            <option value={15}>15</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </Col>
                                    <Col>
                                        <label htmlFor="orderBy" className="form-label">Ordenar formadores por:</label>
                                        <select
                                            className="form-select"
                                            id="orderBy"
                                            name="orderBy"
                                            onChange={onInputChange}
                                            value={orderBy}
                                        >
                                            <option value="lastname">Apellido</option>
                                            <option value="name">Nombre</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="m-1">
                                    <Col>
                                        <label htmlFor="asc" className="form-label">Sentido:</label>
                                        <select
                                            className="form-select"
                                            name="asc"
                                            id="asc"
                                            onChange={onInputChange}
                                            value={asc}
                                        >
                                            <option value="true">Ascendente</option>
                                            <option value="false">Descendente</option>
                                        </select>
                                    </Col>
                                    <Col>
                                        <label htmlFor="enabled" className="form-label">Estado:</label>
                                        <select
                                            className="form-select"
                                            id="enabled"
                                            name="enabled"
                                            onChange={onInputChange}
                                            value={enabled}
                                        >
                                            <option value="true">Activo</option>
                                            <option value="false">Dado de baja</option>
                                        </select>
                                    </Col>
                                </Row>
                                <Row className="m-3">
                                    <button type="submit" className="btn btn-azul-oscuro"><i className="bi bi-search"></i> Buscar</button>
                                </Row>
                            </div>

                        </CardFooter>
                    </form>
                </Card>
            </div>
            <div className="form-group col">
                {trainers?.length > 0
                    ?
                    <>
                        <div className="table-responsive border rounded my-4 transparent-table" style={{ maxHeight: '600px', overflowY: 'auto', backgroundColor: 'transparent' }}>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Formador</th>
                                        <th>Temáticas</th>
                                        <th>Documento</th>
                                        <th>Provincia</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        trainers?.map(
                                            t =>
                                                <tr key={t.id} >
                                                    <td>{t.lastname.toUpperCase() + ", " + t.name}</td>
                                                    <td>
                                                        {t.thematics?.map(thematic =>
                                                            <p key={thematic.id}>{thematic.name}</p>
                                                        )
                                                        }
                                                    </td>
                                                    <td>{t.documentType.name}: {t.documentNumber}</td>
                                                    <td>{t.province.name}</td>
                                                    <td style={{ minWidth: "200px", whiteSpace: "nowrap" }}>
                                                        <button
                                                            className="btn btn-view m-1"
                                                            onClick={() => onShowForm(t.id)}
                                                        >Ver</button>
                                                        {
                                                            login.user.authorities.includes("ROLE_SADMIN")
                                                                ?
                                                                <button
                                                                    className="btn btn-edit m-1"
                                                                    onClick={() => onEditForm(t.id)}
                                                                >Editar</button>
                                                                :
                                                                writeable && (login.provinceId == t.province.id) &&
                                                                <button
                                                                    className="btn btn-edit m-1"
                                                                    onClick={() => onEditForm(t.id)}
                                                                >Editar</button>
                                                        }

                                                        {
                                                            (login.user.authorities.includes("ROLE_SADMIN") && t.enabled)
                                                                ?
                                                                <button
                                                                    className="btn btn-delete"
                                                                    onClick={() => onDown(t.id)}
                                                                >Dar Baja</button>
                                                                :
                                                                deleteable && t.enabled && (login.provinceId == t.province.id) &&
                                                                <button
                                                                    className="btn btn-delete"
                                                                    onClick={() => onDown(t.id)}
                                                                >Dar Baja</button>
                                                        }
                                                        {
                                                            (login.user.authorities.includes("ROLE_SADMIN") && !t.enabled) &&
                                                            <button
                                                                className="btn btn-delete"
                                                                onClick={() => onDelete(t.id)}
                                                            >Eliminar</button>
                                                        }
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <Paginator totalPages={totalPages} pageable={pageable} domain={"formadores"} />
                    </>
                    :
                    <>
                        <br />
                        <div className="alert alert-info">No hay datos</div>
                    </>
                }
            </div>
        </div>
    </>);
}