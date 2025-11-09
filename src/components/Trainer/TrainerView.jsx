import React, { useContext } from "react";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import { TrainerContext } from "../../context/Trainer/TrainerContext";

export const TrainerView = ({ trainer }) => {

  const { handlerViewTrainer } = useContext(TrainerContext);

  if (!trainer) {
    return <p className="text-center text-muted">No hay datos disponibles</p>;
  }

  const onCloseView = () => {
    handlerViewTrainer(0);
  }

  return (
    <Container className="mt-4 p-4 d-flex justify-content-center">

      <Col md={8}>
        <Card className="m-4 p-1">
          <Card.Header className="custom-card-header-view text-white">
            <h4 className="mb-0">{trainer.lastname.toUpperCase()}, {trainer.name}</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              {/* Provincia */}
              <Col md={6}>
              <p>
                <img
                  src="/icons/location.png"
                  alt="User icon"
                  width="16"
                  height="16"
                  style={{ objectFit: 'contain' }}
                />
                <strong> Provincia:</strong> {trainer.province?.name || "No especificado"}</p>
              </Col>
              {/* Tipo y Número de Documento */}
              <Col md={6}>
                <p>
                <img
                  src="/icons/user.png"
                  alt="User icon"
                  width="16"
                  height="16"
                  style={{ objectFit: 'contain' }}
                /><strong> Documento:</strong> {trainer.documentType?.name || "No especificado"} - {trainer.documentNumber}</p>
              </Col>
            </Row>
            <Row>
              {/* Código de Área y Número */}
              <Col md={6}>
                <p>
                <img
                  src="/icons/cellphone.png"
                  alt="User icon"
                  width="16"
                  height="16"
                  style={{ objectFit: 'contain' }}
                /><strong> Teléfono:</strong> ({trainer.areaCode}) {trainer.phone}</p>
              </Col>
              {/* Email */}
              <Col md={6}>
                <p>
                <img
                  src="/icons/email.png"
                  alt="User icon"
                  width="16"
                  height="16"
                  style={{ objectFit: 'contain' }}
                /><strong> Email:</strong> {trainer.email}</p>
              </Col>
            </Row>
            <Row>
              {/* CV */}
              <Col md={12}>
                <p>
                <img
                  src="/icons/search.png"
                  alt="User icon"
                  width="16"
                  height="16"
                  style={{ objectFit: 'contain' }}
                /><strong> CV:</strong> {trainer.cv ? <a href={trainer.cv} target="_blank" rel="noopener noreferrer">Ver CV</a> : "No disponible"}</p>
              </Col>
            </Row>
            <hr />
            {/* Temáticas */}
            <h5>Temáticas</h5>
            {trainer.thematics?.length > 0 ? (
              <ListGroup className="list-group-flush">
                {trainer.thematics?.length > 0 ? (
                  trainer.thematics.map((thematic, index) => (
                    <ListGroup.Item
                      key={index}
                      className="list-group-item-action" // Hover efect
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff", // Alterna colores
                      }}
                    >
                      {thematic.name}
                    </ListGroup.Item>
                  ))
                ) : (
                  <p className="text-muted">No tiene temáticas asignadas.</p>
                )}
              </ListGroup>
            ) : (
              <p className="text-muted">No tiene temáticas asignadas.</p>
            )}
          </Card.Body>
          <Card.Footer>
            <div className="col text-end">
              <button
                type="button"
                className="btn btn-azul-oscuro"
                onClick={onCloseView}
              >
                Volver
              </button>
            </div>

          </Card.Footer>
        </Card>
      </Col>

    </Container>
  );
};