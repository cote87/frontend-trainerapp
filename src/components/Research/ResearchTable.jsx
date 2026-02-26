import { AuthContext } from "../../auth/context/AuthContext";
import { useContext } from "react";
import { ResearchContext } from "../../context/Research/ResearchContext";
import Swal from "sweetalert2";
import { Col, Row } from "react-bootstrap";
import { Paginator2 } from "../layout/Paginator2";

export const ResearchTable = () => {
    const {
        login
    } = useContext(AuthContext);

    const writeable = login.user.authorities.includes("KEY_WRITE_RESEARCHS");
    const isAdmin = login.isAdmin;

    const {
        loading,
        researchs,
        totalPages,
        handlerOpenViewTrainer,
        handlerChangePageResearchs,
        handlerOpenResearchForm,
        handlerDeleteResearch,
        page,
    } = useContext(ResearchContext);

    if (loading) return <div className="alert alert-warning">Cargando investigaciones...</div>;
    if (!researchs || researchs.length === 0) return <div className="alert alert-info">No hay investigaciones.</div>;

    const onClickEditResearch = (id) => {
        handlerOpenResearchForm(id);
    }

    const onClickDeleteResearch = (id) => {

        Swal.fire({
            title: "Está seguro?",
            text: "Está por eliminar definitivamente una investigación!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    handlerDeleteResearch(id);
                } catch (error) {
                    Swal.fire({
                        title: "No se pudo eliminar!",
                        text: "La investigación no se pudo eliminar",
                        icon: "error"
                    });
                } finally {
                    Swal.fire({
                        title: "Completado!",
                        text: "La investigación ha sido eliminada.",
                        icon: "success"
                    });
                }

            }
        });
    }

    const onClickViewTrainer = (id) => {
        handlerOpenViewTrainer(id);
    }

    return (
        <>
            <div className="list-group shadow-sm">
                {researchs.map((research) => (
                    <div key={research.id} className="list-group-item justify-content-between align-items-start transparent-list">
                        <Row>
                            <h4 className="mb-3">{research.name}</h4>
                        </Row>
                        <Row>
                            <Col className="col-10">
                                <Row>
                                    <Col>
                                        <small> <b>Temáticas:</b>
                                            <p>
                                                {research.thematics.map(
                                                    (thematic) => (
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary btn-sm mx-1 my-2"
                                                            id={thematic.id}
                                                            key={thematic.id}>
                                                            {thematic.name}
                                                        </button>)
                                                )}
                                            </p>
                                        </small>
                                    </Col>
                                    <Col>
                                        <small> <b>Investigadores:</b>
                                            <p>
                                                {research.researchers.map(
                                                    (researcher) => researcher.trainer == null
                                                        ?
                                                        researcher.name
                                                        :
                                                        <button
                                                            type="button"
                                                            id={researcher.id}
                                                            key={researcher.id}
                                                            className="btn btn-primary btn-sm mx-1 my-2"
                                                            onClick={() => onClickViewTrainer(researcher.trainer?.id)}
                                                        >
                                                            {researcher.name}
                                                        </button>
                                                )}
                                            </p>
                                        </small>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <small><b>Descripción:</b><p>{research.description}</p></small><br />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="col-2">
                                {writeable && (isAdmin || research.userId == login.id) &&
                                    <>
                                        <p>
                                            <button className="btn btn-edit" onClick={() => onClickEditResearch(research.id)}>
                                                Editar
                                            </button>
                                        </p>
                                        <p>
                                            <button className="btn btn-delete" onClick={() => onClickDeleteResearch(research.id)}>
                                                Eliminar
                                            </button>
                                        </p>
                                    </>
                                }
                            </Col>
                        </Row>
                    </div>
                ))}
                <Paginator2 page={page} totalPages={totalPages} searchFunction={handlerChangePageResearchs} />
            </div>
        </>
    );
}