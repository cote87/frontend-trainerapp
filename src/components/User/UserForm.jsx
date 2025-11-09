import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User/UserContext";
import { TrainerContext } from "../../context/Trainer/TrainerContext";
import { AuthContext } from "../../auth/context/AuthContext";

export const UserForm = () => {

    //Recursos Globales//////////////////////////////////////////////
    const {
        provinces,
        handlerLoadingProvinces,
    } = useContext(TrainerContext);

    const {
        roles,
        initialUserForm,
        currentUser,
        errors,
        handlerVisibleForm,
        handlerSaveUser,
    } = useContext(UserContext);

    const {
        login,
        handlerValidationPassword,
    } = useContext(AuthContext);

    //Variables locales//////////////////////////////////////////////
    const isSAdmin = login.user.authorities.includes('ROLE_SADMIN');
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [userForm, setUserForm] = useState({
        id: 0,
        username: "",
        password: "",
        nickname: "",
        repeatPassword: "",
        province:
        {
            id: 0,
            name: ''
        },
        role:
        {
            id: 3,
            name: "ROLE_USER"
        },
        changePassword: false,
    });
    const { id, username, password, nickname, province, role, repeatPassword } = userForm;

    //Funciones de dinámicas del Formulario//////////////////////////////////////////

    const onSelectChange = ({ target }) => {
        const { name, value } = target;
        let object = {};

        const idValue = parseInt(value);

        if (idValue !== 0) {
            switch (name) {
                case 'province':
                    object = provinces.find(p => p.id === idValue);
                    break;
                case 'role':
                    object = roles.find(r => r.id === idValue);
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case 'province':
                    object = initialUserForm.province;
                    break;
                case 'role':
                    object = initialUserForm.role;
                    break;
                default:
                    break;
            }
        }

        setUserForm({
            ...userForm,
            [name]: object,
        });
    };


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        });
    };

    //Funciones de botones///////////////////////////////////////////////////

    const onSubmit = async (event) => {
        event.preventDefault();

        let save = false;

        const formToSend = { ...userForm, changePassword: showPasswordFields };

        const userIsAdmin = formToSend.role.name === "ROLE_ADMIN";

        if (userIsAdmin) {
            save = await handlerValidationPassword();
        } else {
            save = true;
        }

        if (!isSAdmin) {
            const provinciaAsignada = provinces.find(p => p.id === login.provinceId);
            formToSend.province = provinciaAsignada;
        }

        if (save) {
            handlerSaveUser(formToSend);
        }
    };

    const onCloseForm = () => {
        handlerVisibleForm(false);
    };

    //UseEffects /////////////////////////////////////////////////////////////////

    //Inicio
    useEffect(() => {
        const fetchData = () => {
            handlerLoadingProvinces();
        };
        fetchData();
    }, []);

    //Se actualizan los datos del formulario en base al usuario actual seleccionado

    useEffect(() => {
        if (currentUser) {
            const matchedRol = roles?.find(r => r.name == currentUser.role) ?? { id: 0, name: "" };
            setUserForm({
                id: currentUser.id ?? 0,
                username: currentUser.username ?? "",
                nickname: currentUser.nickname ?? "",
                province: currentUser.province ?? { id: 0, name: "" },
                role: matchedRol,
                password: currentUser.password ?? "",
                repeatPassword: "",
            });
        }
    }, [currentUser]);

    return (
        <form onSubmit={onSubmit}>
            {id == 0 &&
                <div className="form-group row mb-3">
                    <label className="col-form-label col-3 fw-bold">Nombre de usuario:</label>
                    <div className="col-9">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de usuario"
                            name="username"
                            value={username}
                            onChange={onInputChange}
                        />
                        {errors.user?.username && <span className="text-danger">{errors.user.username}</span>}
                    </div>
                </div>
            }

            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Nombre visible:</label>
                <div className="col-9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre que será visible en la aplicación"
                        name="nickname"
                        value={nickname}
                        onChange={onInputChange}
                    />
                    {errors.user?.nickname && <span className="text-danger">{errors.user.nickname}</span>}
                </div>
            </div>
            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Provincia:</label>
                <div className="col-9">
                    {isSAdmin
                        ?
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="province"
                            value={province.id}
                            onChange={onSelectChange}>
                            <option key="0" value={'0'} disabled>Seleccione una opción.</option>
                            {provinces.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        :
                        <input
                            type="text"
                            className="form-control"
                            value={provinces?.find(p => p.id == login?.provinceId)?.name ?? ""}
                            disabled
                        />
                    }
                    {errors.user?.province && <span className="text-danger">{errors.user.province}</span>}
                </div>
            </div>

            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Rol:</label>
                <div className="col-9">
                    {isSAdmin
                        ?
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="role"
                            value={role.id}
                            onChange={onSelectChange}>
                            <option key="0" value={'0'} disabled>Seleccione una opción.</option>
                            {roles?.map(r =>
                                <option key={r.id} value={r.id}>{r.name.replace('ROLE_', '')}</option>
                            )}
                        </select>
                        :
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="role"
                            value={role.id}
                            onChange={onSelectChange}>
                            <option key="0" value={'0'} disabled>Seleccione una opción.</option>
                            {roles?.filter(rol => rol.name != 'ROLE_ADMIN').map(r =>
                                <option key={r.id} value={r.id}>{r.name.replace('ROLE_', '')}</option>
                            )}
                        </select>
                    }
                    {errors.user?.role && <span className="text-danger">{errors.user.role}</span>}
                </div>
            </div>

            {id > 0 &&
                <div className="form-group form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="changePasswordCheck"
                        checked={showPasswordFields}
                        onChange={() => {
                            setShowPasswordFields(!showPasswordFields);
                            if (!showPasswordFields) {
                                setUserForm({ ...userForm, password: "", repeatPassword: "" });
                            }
                        }}
                    />
                    <label className="form-check-label" htmlFor="changePasswordCheck">
                        Cambiar contraseña
                    </label>
                </div>
            }

            {(id === 0 || showPasswordFields) &&
                <>
                    <div className="form-group row mb-3">
                        <label className="col-form-label col-3 fw-bold">Contraseña:</label>
                        <div className="col-9">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña del usuario"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                            />
                            {errors.user?.password ? <span className="text-danger">{errors.user.password}</span> : <span className="text-warning">El campo La contraseña debe tener al menos 8 caracteres, una mayúscula y un número</span>}
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label className="col-form-label col-3 fw-bold">Repetir contraseña:</label>
                        <div className="col-9">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repetir contraseña"
                                name="repeatPassword"
                                value={repeatPassword}
                                onChange={onInputChange}
                            />
                            <span className="text-danger">{errors?.repeatPassword}</span>
                        </div>
                    </div>
                </>
            }

            <div className="row m-3">
                <div className="col text-start">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={onCloseForm}
                    >
                        Volver
                    </button>
                </div>
                <div className="col text-end">
                    <button type="submit" className="btn btn-azul-oscuro">Confirmar</button>
                </div>
            </div>
        </form>
    );
}