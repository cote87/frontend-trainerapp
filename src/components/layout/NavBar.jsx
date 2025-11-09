import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import './NavBar.css';

export const NavBar = () => {

    const {
        login,
        handlerLogout
    } = useContext(AuthContext);

    const thematicsReader = login.user.authorities.includes("KEY_READ_THEMATICS");
    const usersReader = login.user.authorities.includes("KEY_READ_USERS");
    const trainersReader = login.user.authorities.includes("KEY_READ_TRAINERS");
    const metricsReader = login.user.authorities.includes("KEY_READ_METRICS");

    const onClickLogout = () => {
        handlerLogout();
    }

    return (<>

        <nav className="navbar navbar-expand-lg navbar-dark-custom">
            <div className="container-fluid">
                <a className="navbar-brand" href="/homepage">RED FoCaSe</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {thematicsReader &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/tematicas'>Temáticas</NavLink>
                            </li>
                        }
                        {trainersReader &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/formadores'>Formadores</NavLink>
                            </li>
                        }
                        {trainersReader &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/capacitaciones'>Capacitaciones</NavLink>
                            </li>
                        }
                        {usersReader &&
                            <li className="nav-item">
                                <NavLink className="nav-link" to='/usuarios'>Usuarios</NavLink>
                            </li>
                        }
                        {metricsReader &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Métricas
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/metrics/map">Formadores por provincia </a></li>
                                </ul>
                            </li>
                        }
                    </ul>
                    <div className="text-end">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {login.nickname}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="/perfil" >Perfil</a></li>
                                    <li><a className="dropdown-item" href="/editarPerfil">Editar Perfil</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={onClickLogout}>Cerrar Sesión</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav>

    </>);
}