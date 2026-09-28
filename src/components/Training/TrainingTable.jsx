import { useContext } from "react";
import { TrainingContext } from "../../context/Training/TrainingContext";
import { Col, Row } from "react-bootstrap";
import { Paginator2 } from "../layout/Paginator2";
import { TrainingView } from "./TrainingView";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/context/AuthContext";

export const TrainingTable = () => {

    const {
        login
    } = useContext(AuthContext);

    const writeable = login.user.authorities.includes("KEY_WRITE_TRAININGS");
    const isAdmin = login.isAdmin;
    const isSAdmin = login.user.authorities.includes("ROLE_SADMIN");

    const navigate = useNavigate();

    const {
        trainings,
        loadTrainings,
        loading,
        page,
        totalPages,
        totalElements,
        handlerLoadingTraining,
        handlerDeleteTraining,
        handlerExportPdf,
        handlerExportListPdf, // 👈 Se agrega el handler para la lista completa
    } = useContext(TrainingContext);

    const renderMode = (mode) => {
        switch (mode) {
            case "ONSITE":
                return "Presencial";
            case "ONLINE":
                return "Online";
            case "HYBRID":
                return "Presencial+Online";
            default:
                return "-";
        }
    };

    const onClickExportList = async () => {
        try {
            await handlerExportListPdf();
        } catch (error) {
            Swal.fire({
                title: "Error al exportar",
                text: error.message === "No hay datos para exportar" ? "No hay capacitaciones que coincidan con la búsqueda." : "No se pudo generar el listado en PDF.",
                icon: "error"
            });
        }
    };

    if (loading) {
        return <div className="alert alert-warning">Cargando capacitaciones...</div>;
    }

    if (!trainings || trainings.length === 0) {
        return <div className="alert alert-info">No hay capacitaciones</div>;
    }

    const onClickViewTraining = (id) => {
        handlerLoadingTraining(id);
    }

    const onClickEditTraining = (id) => {
        navigate("/capacitaciones/form/" + id);
    }

    const onClickDeleteTraining = (id) => {
        Swal.fire({
            title: "Está seguro?",
            text: "Está por eliminar definitivamente una capacitación!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    handlerDeleteTraining(id);
                } catch (error) {
                    Swal.fire({
                        title: "No se pudo eliminar!",
                        text: "La capacitación no se pudo eliminar",
                        icon: "error"
                    });
                } finally {
                    Swal.fire({
                        title: "Completado!",
                        text: "La capacitación ha sido eliminada.",
                        icon: "success"
                    });
                }
            }
        });
    }

    const onClickExportPdf = async (training) => {
        try {
            await handlerExportPdf(training);
        } catch (error) {
            Swal.fire({
                title: "Error al exportar",
                text: "No se pudo generar el archivo PDF de la capacitación.",
                icon: "error"
            });
        }
    };

    return (
        <>
            <div className="modal fade" id="viewTrainingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-xl">
                    <div className="modal-body">
                        <TrainingView />
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 px-1">
                <span className="text-muted small">
                    Resultados encontrados: <strong>{totalElements}</strong>
                </span>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={onClickExportList}
                >
                    <i className="bi bi-file-earmark-pdf me-1"></i> Exportar Resultados
                </button>
            </div>

            <div className="list-group shadow-sm">
                {trainings.map((cap) => (
                    <div key={cap.id} className="list-group-item justify-content-between align-items-start transparent-list">
                        <Row>
                            <h4 className="mb-3">{cap.title}</h4>
                        </Row>
                        <Row>
                            <Col className="col-10">
                                <Row>
                                    <Col>
                                        <small> <b>Temática:</b> {cap.thematic?.name ?? "-"}</small>
                                    </Col>
                                    <Col>
                                        <small><b>Modo:</b> {renderMode(cap.mode)}</small><br />
                                    </Col>
                                    <Col>
                                        <p><b>Organizado por:</b> {cap.organizer}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>
                                            <small>
                                                <b>Fecha de inicio:</b>{" "}
                                                {cap.startDate
                                                    ? cap.startDate.split('-').reverse().join('/')
                                                    : 'a confirmar'}
                                            </small>
                                        </p>
                                    </Col>
                                    <Col>
                                        <small><b>Provincia:</b> {cap.province?.name ?? "-"}</small>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-2">
                                <p>
                                    <button type="button" className="btn btn-view" onClick={() => onClickViewTraining(cap.id)} data-bs-toggle="modal" data-bs-target="#viewTrainingModal">
                                        Ver más
                                    </button>
                                </p>
                                <p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm w-50"
                                        onClick={() => onClickExportPdf(cap)}
                                    >
                                        <i className="bi bi-file-earmark-pdf me-1"></i> Exportar
                                    </button>
                                </p>
                                {writeable && (login.provinceId == cap.province?.id || isSAdmin) && (isAdmin || cap.userId == login.id) &&
                                    <>
                                        <p>
                                            <button className="btn btn-edit" onClick={() => onClickEditTraining(cap.id)}>
                                                Editar
                                            </button>
                                        </p>
                                        <p>
                                            <button className="btn btn-delete" onClick={() => onClickDeleteTraining(cap.id)}>
                                                Eliminar
                                            </button>
                                        </p>
                                    </>
                                }
                            </Col>
                        </Row>
                    </div>
                ))}
                <Paginator2 page={page} totalPages={totalPages} searchFunction={loadTrainings} />
            </div>
        </>
    );
};