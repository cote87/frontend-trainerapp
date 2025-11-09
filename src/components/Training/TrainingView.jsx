import { useContext, useEffect } from "react";
import { TrainingContext } from "../../context/Training/TrainingContext";
import { Card, CardBody, CardHeader, Row, Col } from "react-bootstrap";

export const TrainingView = () => {
    const { currentTraining } = useContext(TrainingContext);

    if (!currentTraining) {
        return <div className="alert alert-info">No se encontró la capacitación.</div>;
    }

    const renderMode = (mode) => {
        switch (mode) {
            case "ONSITE":
                return "Presencial";
            case "ONLINE":
                return "Online";
            case "HYBRID":
                return "Presencial + Online";
            default:
                return "-";
        }
    };

    return (
        <div className="container my-4">
            <Card className="shadow-sm">
                <CardHeader className="bg-primary text-white custom-card-header-view">
                    <h3>{currentTraining.title}</h3>
                </CardHeader>
                <CardBody>
                    <Row className="mb-3">
                        <Col><b>Organizado por:</b> {currentTraining.organizer || "-"}</Col>
                        <Col><b>Fecha de inicio:</b> {currentTraining.startDate || "-"}</Col>
                        <Col><b>Provincia:</b> {currentTraining.province?.name || "-"}</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col><b>Temática:</b> {currentTraining.thematic?.name || "-"}</Col>
                        <Col><b>Modalidad:</b> {renderMode(currentTraining.mode)}</Col>
                        <Col></Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <div
                                className="training-rich-text"
                                dangerouslySetInnerHTML={{ __html: currentTraining.description || "<p>No hay contenido disponible.</p>" }}
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "1rem",
                                    borderRadius: "0.5rem",
                                    backgroundColor: "#f9f9f9"
                                }}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};