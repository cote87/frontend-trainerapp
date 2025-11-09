import { useState } from "react";
import { deleteUser, editForm, getUsers, saveUser } from "../services/UserService";
import { getRoles } from "../services/RoleService";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";

const initialUserForm = {
    id: 0,
    username: "",
    password: "",
    province:
    {
        id: 0,
    },
    role:
    {
        id: 0,
    }
};

const initialUserErrors = {
    user: {
        id: 0,
        username: "",
        password: "",
        nickname: "",
        province: "",
        role: "",
    },

    repeatPassword: ""
}

const initialProfileErrors = {
    username:"",
    nickname: "",
    currentPassword:"",
    newPassword: "",
    confirmNewPassword:""
}

export const useUsers = () => {

    const [searchParams] = useSearchParams();

    const [currentUser, setCurrentUser] = useState(initialUserForm);

    const [users, setUsers] = useState([]);

    const [roles, setRoles] = useState([]);

    const [visibleForm, setVisibleForm] = useState(false);

    const [errors, setErrors] = useState(initialUserErrors);

    const [pageable, setPageable] = useState({});

    const [totalPages, setTotalPages] = useState(0);

    const page = (searchParams.get("page") || 0);

    const size = (searchParams.get("size") || 8);


    //CRUD USERS///////////////////////////////////////////

    //CREATE and UPDATE USERS
    const handlerSaveUser = async (userForm) => {
        let response;

        if (userForm.password !== userForm.repeatPassword) {
            setErrors(prev => ({
                ...prev,
                repeatPassword: "Las contraseñas no son iguales."
            }));
            return false;
        }

        try {
            response = await saveUser(userForm)
            if (response) {
                handlerVisibleForm(false);
                handlerCleanCurrentUser();
                Swal.fire({
                    title: "Completado!",
                    text: (userForm.id > 0) ? "Se actualizaron los datos correctamente! de " + userForm.username : userForm.username + " se registró con éxito!",
                    icon: "success"
                });
                handlerLoadingUsers({ username: userForm.username || "" });
            }
            return true;
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setErrors(formatErrors(error.response.data));
            }
            return false;
        }
    }

    const handlerEditForm = async ({ username,nickname, currentPassword, newPassword, confirmNewPassword }) => {
        setErrors(initialProfileErrors);

        if (newPassword !== confirmNewPassword) {
            setErrors(prev => ({
                ...prev,
                confirmNewPassword: "Las contraseñas no son iguales."
            }));
            return false;
        }

        try {
            const response = await editForm({ username, nickname, currentPassword, newPassword })
            handlerCleanCurrentUser();
            return response;
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setErrors(formatErrors(error.response.data));
            }
            return false;
        }


    }

    //READ USERS
    const handlerLoadingUsers = async ({ username }) => {
        try {
            const responseRoles = await getRoles();
            responseRoles && setRoles(responseRoles);
            const responseUsers = await getUsers({
                page: page,
                size: size,
                username: username || "",
            })

            if (responseUsers) {
                setUsers(responseUsers.content);
                setPageable(responseUsers.pageable);
                setTotalPages(responseUsers.totalPages);
            }

        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
        }
    }

    //DELETE USERS
    const handlerDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            handlerLoadingUsers({ username: "" });
            return true;
        } catch (error) {
            return false;
        }
    }

    //INTERFAZ /////////////////////////////////////////////

    const handlerVisibleForm = (isVisible) => {
        setVisibleForm(isVisible);
        handlerCleanCurrentUser();
    };

    const handlerCleanCurrentUser = () => {
        setCurrentUser(initialUserForm);
        setErrors(initialUserErrors);
    }

    const handlerfillCurrentUser = (user) => {
        setCurrentUser({
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            password: '',
            province: user.province,
            role: user.role
        })
    }

    //TOOLS

    const formatErrors = (errors) => {
        const formattedErrors = {};

        Object.keys(errors).forEach((key) => {
            const keys = key.split("."); // Divide "province.name" en ["province", "name"]

            if (keys.length > 1) {
                if (!formattedErrors[keys[0]]) {
                    formattedErrors[keys[0]] = {}; // Crea el objeto si no existe
                }
                formattedErrors[keys[0]][keys[1]] = errors[key]; // Guarda el mensaje dentro del objeto anidado
            } else {
                formattedErrors[key] = errors[key]; // Si no está anidado, lo guarda normal
            }
        });
        return formattedErrors;
    };

    return ({
        totalPages,
        pageable,
        errors,
        roles,
        users,
        initialUserForm,
        currentUser,
        visibleForm,
        handlerLoadingUsers,
        handlerVisibleForm,
        handlerCleanCurrentUser,
        handlerSaveUser,
        handlerDeleteUser,
        handlerEditForm,
        handlerfillCurrentUser
    });
}