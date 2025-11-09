import { useContext, useEffect, useState } from "react"
import { getTrainersList } from "../../services/TrainerService";
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "react-bootstrap";
import { ArgentinaMap } from "./ArgentinaMap";
import { ArgentinaTable } from "./ArgentinaTable";
import { ThematicContext } from "../../context/Thematic/ThematicContex";

export const PERCENT = 'percent'
export const QUANTITY = 'quantity'
export const BOTH = 'both'

const initialData = {
    "Buenos Aires": 0,
    "Catamarca": 0,
    "Chaco": 0,
    "Chubut": 0,
    "C.A.B.A.": 0,
    "Córdoba": 0,
    "Corrientes": 0,
    "Entre Ríos": 0,
    "Formosa": 0,
    "Jujuy": 0,
    "La Pampa": 0,
    "La Rioja": 0,
    "Mendoza": 0,
    "Misiones": 0,
    "Neuquén": 0,
    "Río Negro": 0,
    "Salta": 0,
    "San Juan": 0,
    "San Luis": 0,
    "Santa Cruz": 0,
    "Santa Fe": 0,
    "Santiago del Estero": 0,
    "Tierra del Fuego": 0,
    "Tucumán": 0,
};

const initialParametersForm = {
    thematic: "",
    type: PERCENT
}

export const MetricMap = () => {

    const [trainers, setTrainers] = useState([]);
    const [data, setData] = useState(initialData);
    const [parametersForm, setParametersForm] = useState(initialParametersForm);
    const { thematic, type } = parametersForm;

    const {
        thematicList: thematics,
        handlerLoadingThematicsList,
    } = useContext(ThematicContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handlerLoadingThematicsList();
                const trainerList = await getTrainersList(thematic);
                setTrainers(trainerList);
                calculateTrainersInProvince(trainerList, type);

            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, [parametersForm]);

    const calculateTrainersInProvince = (trainers, type) => {
        const updatedData = { ...initialData };

        switch (type) {
            case QUANTITY:
                trainers?.forEach((trainer) => {
                    const provincia = trainer.province.name;
                    if (updatedData[provincia] !== undefined) {
                        updatedData[provincia] += 1;
                    }
                });
                setData(updatedData);
                break;
            case PERCENT:
                let total = 0;
                trainers?.forEach((trainer) => {
                    const provincia = trainer.province.name;
                    if (updatedData[provincia] !== undefined) {
                        updatedData[provincia] += 1;
                        total++;
                    }
                });
                const percents = Object.fromEntries(
                    Object.entries(updatedData).map(([province, value]) => [
                        province,
                        total === 0 ? "0%" : (Math.trunc((value * 10000) / total) / 100) + "%",
                    ])
                );
                setData(percents);
                break;

            case BOTH:
                let totalD = 0;
                trainers?.forEach((trainer) => {
                    const provincia = trainer.province.name;
                    if (updatedData[provincia] !== undefined) {
                        updatedData[provincia] += 1;
                        totalD++;
                    }
                });
                const percentsD = Object.fromEntries(
                    Object.entries(updatedData).map(([province, value]) => [
                        province,
                        totalD === 0 ? "Sin datos" : (Math.trunc((value * 10000) / totalD) / 100) + "%(" + value + ")",
                    ])
                );
                setData(percentsD);
                break;
        }
    };

    const onSelectChange = ({ target }) => {
        const { name, value } = target;

        setParametersForm({
            ...parametersForm,
            [name]: value
        })

    }



return <>
    <Container className="flex">
        <Row>
            <h1 className="mb-4 text-white">Distribución por Provincia</h1>
            <Col className="col-6">
                <ArgentinaMap data={data} />
            </Col>

            <Col className="col-3">
                <ArgentinaTable data={data} params={type} />
            </Col>

            <Col className="col-3 mt-4">
                <Card className="custom-card">
                    <CardHeader className="custom-card-header-search">
                        <h3>Parámetros</h3>
                    </CardHeader>
                    <CardBody>
                        <div className="form-group">
                            <label>Temática:</label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                name="thematic"
                                value={thematic?.name}
                                onChange={onSelectChange}
                            >
                                <option key="0" value="">Todas</option>
                                {thematics?.map(({ id, name }) => {
                                    return (
                                        <option key={id} value={name}>
                                            {name}
                                        </option>
                                    );
                                })}

                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tipo de resultado:</label>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                name="type"
                                value={type}
                                onChange={onSelectChange}
                            >
                                <option key="1" value={BOTH}>Porcentaje (cantidad)</option>
                                <option key="2" value={QUANTITY}>Cantidad</option>
                                <option key="3" value={PERCENT}>Porcentaje</option>
                            </select>
                        </div>
                    </CardBody>
                </Card>

            </Col>

        </Row>
        <br/>
    </Container>
</>
}