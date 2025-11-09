import { useReducer, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LOGIN, LoginReducer, LOGOUT } from "../reducers/LoginReducer";
import { loginAuth, verifyPassword } from "../services/AuthService";
import axios from "axios";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    user: undefined
};

export const useAuth = () => {

    const navigate = useNavigate();

    const [login, dispatch] = useReducer(LoginReducer, initialLogin);

    const handlerLogin = async (userLogin) => {

        try {
            const response = await loginAuth(userLogin);
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            const authoritiesRaw = JSON.parse(claims.authorities);
            const authorities = [];
            for (let i = 0; i < authoritiesRaw.length; i++) {
                authorities.push(authoritiesRaw[i].authority);
            }
            const user = {
                username: claims.sub,
                authorities: authorities,
            };

            dispatch({
                type: LOGIN,
                payload: {
                    user,
                    isAdmin: claims.isAdmin,
                    provinceId: claims.provinceId,
                    nickname: claims.nickname,
                }
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                provinceId: claims.provinceId,
                nickname: claims.nickname,
                user
            }))
            sessionStorage.setItem('token', "Bearer " + token);
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            navigate('/formadores');
        } catch (error) {
            if (error.response?.status == 401) {
                Swal.fire(
                    {
                        title: 'Error!',
                        text: 'El usuario o contraseña son incorrectos',
                        icon: 'error',
                        confirmButtonText: 'Volver',
                    }
                );
            } else if (error.response?.status == 403) {
                Swal.fire(
                    {
                        title: 'Error!',
                        text: 'No tiene acceso al recurso o permiisos',
                        icon: 'error',
                        confirmButtonText: 'Volver',
                    }
                );
            } else {
                throw error;
            }
            Swal.fire(
                {
                    title: 'Error!',
                    text: 'El usuario o contraseña son incorrectos',
                    icon: 'error',
                    confirmButtonText: 'Volver',
                }
            );
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: LOGOUT,
        });
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    }

    const handlerValidationPassword = async () => {
        return await Swal.fire({
            title: 'Confirmar acción',
            html: `<p>Estás por crear un administrador. Por seguridad, ingresa tu contraseña:</p>`,
            input: 'password',
            inputPlaceholder: 'Tu contraseña actual',
            inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async (password) => {
                if (!password) {
                    Swal.showValidationMessage('Debes ingresar tu contraseña');
                    return false;
                }
                try {
                    const resp = await verifyPassword(password);
                    if (!resp.data.success) {
                        Swal.showValidationMessage('Contraseña incorrecta');
                        return false;
                    }
                    return true;
                } catch (err) {
                    Swal.showValidationMessage('Error al verificar');
                    return false;
                }
            }
        }).then(result => result.isConfirmed);
    };

    return ({
        login,
        handlerLogin,
        handlerLogout,
        handlerValidationPassword,
    });

}