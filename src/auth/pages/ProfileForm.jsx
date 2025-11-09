import { useContext, useEffect, useState } from "react"
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, Row } from "react-bootstrap"
import { UserContext } from "../../context/User/UserContext"
import { AuthContext } from "../context/AuthContext"
import Swal from "sweetalert2"

export const ProfileForm = () => {
    const {
        handlerEditForm,
        errors
    } = useContext(UserContext);
    const {
        login,
        handlerLogout
    } = useContext(AuthContext);

    const [changePasswordForm, setChangePasswordForm] = useState({});
    const { currentPassword, newPassword, confirmNewPassword, nickname, username } = changePasswordForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setChangePasswordForm({
            ...changePasswordForm,
            [name]: value
        });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (await handlerEditForm(changePasswordForm)) {
            Swal.fire({
                title: "Completado!",
                text: "Los datos han sido actualizados con éxito!",
                icon: "success"
            });
            handlerLogout();
        } else {
            Swal.fire({
                title: "Error!",
                text: "No se pudo guardar los cambios!",
                icon: "error"
            });
        }
        console.log(errors);
    }

    useEffect(() => {
        setChangePasswordForm({
            username: login.user.username,
            nickname: login.nickname,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
    }, []);

    return <>
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "87vh" }}
        >
            <Form onSubmit={onSubmit}>
                <Card className="form-control custom-card">
                    <CardHeader>
                        <h1>Editar Perfil</h1>
                    </CardHeader>
                    <CardBody>
                        <Col>
                            <Row className="form-group">
                                <label className="col-form-label fw-bold">Nombre de usuario:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre de usuario"
                                    name="username"
                                    value={username || ''}
                                    onChange={onInputChange}
                                />
                                <span className="text-danger">{errors?.username}</span>
                            </Row>
                            <Row className="form-group">
                                <label className="col-form-label fw-bold">Nombre visible:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre visible"
                                    name="nickname"
                                    value={nickname || ''}
                                    onChange={onInputChange}
                                />
                                <span className="text-danger">{errors?.nickname}</span>
                            </Row>
                            <Row className="form-group">
                                <label className="col-form-label fw-bold">Contraseña Actual:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña actual"
                                    name="currentPassword"
                                    value={currentPassword || ''}
                                    onChange={onInputChange}
                                />
                                <span className="text-danger">{errors?.currentPassword}</span>
                            </Row>
                            <Row className="form-group">
                                <label className="col-form-label fw-bold">Contraseña Nueva:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña nueva"
                                    name="newPassword"
                                    value={newPassword || ''}
                                    onChange={onInputChange}
                                />
                                {errors.newPassword ? <span className="text-danger">{errors?.newPassword}</span> : <span className="text-warning">El campo La contraseña debe tener al menos 8 caracteres, una mayúscula y un número</span>}
                            </Row>
                            <Row className="form-group">
                                <label className="col-form-label fw-bold">Confirmar Contraseña Nueva:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirmar contraseña nueva"
                                    name="confirmNewPassword"
                                    value={confirmNewPassword || ''}
                                    onChange={onInputChange}
                                />
                                <span className="text-danger">{errors?.confirmNewPassword}</span>
                            </Row>
                        </Col>
                    </CardBody>
                    <CardFooter className="d-flex justify-content-end">
                        <Button type="submit" className=" btn-azul-oscuro">Aceptar</Button>
                    </CardFooter>
                </Card>
            </Form>
        </Container>
    </>
}