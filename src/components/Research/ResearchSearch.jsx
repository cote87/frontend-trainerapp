import { useContext, useState } from "react";
import { ResearchContext } from "../../context/Research/ResearchContext";
import { Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from "react-bootstrap";

export const ResearchSearch = () => {

    const {
        searchFilters,
        handlerLoadSearchFilters,
    } = useContext(ResearchContext);

    const [searchForm, setSearchForm] = useState(searchFilters);
    const { name, thematic, size, sortBy, sortDir } = searchForm;

    const onChange = ({ target }) => {
        const { name, value } = target;
        setSearchForm({
            ...searchForm,
            [name]: value,
            page: 0,
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        handlerLoadSearchFilters(searchForm);
    };

    return (<>
        <div>
            <Card className="custom-card">
                <CardHeader className="custom-card-header-search">
                    <h4>Opciones de búsqueda</h4>
                </CardHeader>
                <Form onSubmit={onSubmit}>
                    <CardBody>
                        <Row className="mb-3">
                            <Col className="col-9">
                                <label htmlFor="nombre" className="form-label">Nombre de la investigación</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    placeholder="Buscar por nombre"
                                    value={name}
                                    onChange={onChange}
                                />
                            </Col>
                            <Col>
                                <label className="form-label">Resultados por página</label>
                                <select
                                    className="form-select"
                                    value={size}
                                    name="size"
                                    onChange={onChange}
                                >
                                    <option key="0" value={5}>5</option>
                                    <option key="1" value={10}>10</option>
                                    <option key="2" value={15}>15</option>
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
    </>);
}