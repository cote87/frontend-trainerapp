import { useState, useContext, useRef } from "react";
import { Row, Col, Container, InputGroup, FormControl, Button, Overlay, Popover } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {
    username: '',
    password: ''
};

export const LoginPage = () => {
    const { handlerLogin } = useContext(AuthContext);
    const [LoginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = LoginForm;
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...LoginForm,
            [name]: value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await handlerLogin({ username, password });
        const login = JSON.parse(sessionStorage.getItem('login'));
        login?.isAuth && setLoginForm(initialLoginForm);
    };

    const handleClick = () => setShow(!show);


    return (
        <div
            className="bg-white"
            style={{
                backgroundImage: "url('/img/login/bg-login.png')",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}

        >
            <Row  className="justify-content-end">
                <Col
                    md={4}
                    className="d-flex flex-column align-items-center"
                >
                    <br /><br /><br /><br /><br /><br />

                    <img
                        src="/img/login/logo.png"
                        alt="Logo"
                        className="img-fluid w-50"
                    />
                    <hr />
                    <hr className="w-50 border border-2 border-primary mt-3" />
                    <hr />
                    <Container>
                        <h6 className="text-center">Ingrese sus datos</h6>
                        <form onSubmit={onSubmit}>
                            <Col md={6} className="mx-auto">
                                <Row className="mb-3">
                                    <InputGroup
                                        className="rounded-pill border border-secondary overflow-hidden"
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <InputGroup.Text
                                            className="bg-white border-0"
                                            style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}
                                        >
                                            <img
                                                src="/icons/user.png"
                                                alt="User icon"
                                                width="24"
                                                height="24"
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </InputGroup.Text>
                                        <FormControl
                                            placeholder="Usuario"
                                            value={username}
                                            onChange={onInputChange}
                                            name="username"
                                            style={{
                                                borderTopRightRadius: '50px',
                                                borderBottomRightRadius: '50px',
                                                border: 'none',
                                                boxShadow: 'none',
                                            }}
                                        />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup
                                        className="rounded-pill border border-secondary overflow-hidden"
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <InputGroup.Text
                                            className="bg-white border-0"
                                            style={{ borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }}
                                        >
                                            <img
                                                src="/icons/password.png"
                                                alt="Password icon"
                                                width="24"
                                                height="24"
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </InputGroup.Text>
                                        <FormControl
                                            type="password"
                                            placeholder="Contraseña"
                                            value={password}
                                            onChange={onInputChange}
                                            name="password"
                                            style={{
                                                borderTopRightRadius: '50px',
                                                borderBottomRightRadius: '50px',
                                                border: 'none',
                                                boxShadow: 'none',
                                            }}
                                        />
                                    </InputGroup>
                                </Row>
                                <Row className="my-2">
                                    <Button type="submit" className="rounded-pill btn-azul-oscuro">ACCEDER</Button>
                                </Row>
                            </Col>
                        </form>
                    </Container>
                    <br />
                    <a
                        href="#"
                        ref={target}
                        onClick={handleClick}
                        style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                    >
                        ¿Olvidó su contraseña?
                    </a>
                    <Overlay target={target.current} show={show} placement="left">
                        {(props) => (
                            <Popover id="popover-click" {...props}>
                                <Popover.Body>Contáctese con el administrador de su provincia.</Popover.Body>
                            </Popover>
                        )}
                    </Overlay>
                    <br /><br />
                    <img
                        src="/img/sello-ministerio-seguridad.png"
                        alt="Sello"
                        className="img-fluid w-50"
                    />
                    <br /><br />
                </Col>
            </Row>
        </div>
    );
};
