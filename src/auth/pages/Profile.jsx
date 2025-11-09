import { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext";
import { TrainerContext } from "../../context/Trainer/TrainerContext";

const initialProfileForm = {
    nickname: '',
    role: '',
    province: '',
}

export const Profile = () => {

    const {
        login
    } = useContext(AuthContext);

    const {
        provinces,
        handlerLoadingProvinces,
    } = useContext(TrainerContext);

    const [profileForm, setProfileForm] = useState(initialProfileForm);
    const { province, nickname, role } = profileForm;

    useEffect(() => {
        handlerLoadingProvinces(); // Carga las provincias una sola vez al montar
    }, []);

    useEffect(() => {
        if (provinces.length > 0 && login) {
            setProfileForm({
                province: provinces.find(p => p.id == login.provinceId),
                nickname: login.nickname,
                role: login.user.authorities.find(a => a.includes("ROLE_"))
            });
        }
    }, [provinces, login]);



    return <>
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "87vh" }}
        >
            <Card className="custom-card w-50">
                <CardHeader>
                    <h1 className="text-center">Perfil de usuario</h1>
                </CardHeader>
                <CardBody>
                    <Col className="form-group">
                        <Row className="mb-3">
                            <label className="col-form-label col-3 fw-bold">Nombre visible:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre que será visible en la aplicación"
                                name="nickname"
                                defaultValue={nickname}
                                disabled
                            />
                        </Row>
                        <Row className="mb-3">
                            <label className="col-form-label col-3 fw-bold">Provincia:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Provincia"
                                name="province"
                                defaultValue={province?.name}
                                disabled
                            />
                        </Row>
                        <Row>
                            <label className="col-form-label col-3 fw-bold">Rol:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Rol"
                                name="role"
                                defaultValue={role.replace('ROLE_', '')}
                                disabled
                            />
                        </Row>
                    </Col>
                </CardBody>
            </Card>
        </Container>


    </>
}