import { useContext, useEffect } from "react";
import { UserContext } from "../../context/User/UserContext";
import { AuthContext } from "../../auth/context/AuthContext";
import { Paginator } from "../layout/Paginator";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


export const UserTable = () => {

    //Elementos Globales
    const {
        users,
        handlerLoadingUsers,
        handlerDeleteUser,
        handlerfillCurrentUser,
        handlerVisibleForm,
        totalPages,
        pageable,
    } = useContext(UserContext);

    const {
        login
    } = useContext(AuthContext);

    //Variables locales
    const params = useParams();

    //Use Effects
    useEffect(() => {
        const fetchData = () => {
            try {
                handlerLoadingUsers({ username: params.username });
            } catch (err) {
                throw err;
            }
        };
        fetchData();
    }, [params]);

    //Funcionalidad de botones

    const onEdit = (user) => {
        handlerVisibleForm(true);
        handlerfillCurrentUser(user);
    }

    const onDelete = (id) => {
        Swal.fire({
            title: "Está seguro?",
            text: "Está por eliminar definitivamente el usuario!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                if (handlerDeleteUser(id)) {
                    Swal.fire({
                        title: "Completado!",
                        text: "El usuario ha sido eliminado.",
                        icon: "success"
                    });
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text: "El usuario no pudo ser eliminado.",
                        icon: "error"
                    });
                }
            }
        });
    }

    return (
        <>
            <div className="table-responsive border rounded my-4 transparent-table" style={{ minHeight: '500px', overflowY: 'auto', backgroundColor: 'transparent' }}>
                <table className="table table-hover table-striped">
                    {users.length > 0
                        ?
                        <>
                            <thead>
                                <tr>
                                    <th>Nombre de usuario</th>
                                    <th>Nombre visible</th>
                                    <th>Rol</th>
                                    <th>Provincia</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            {user.username}
                                        </td>
                                        <td>
                                            {user.nickname}
                                        </td>
                                        <td>
                                            {user.role.replace('ROLE_', '')}
                                        </td>
                                        <td>
                                            {user.province?.name}
                                        </td>
                                        <td className="text-end">
                                            <button className="btn btn-edit mx-2" onClick={() => onEdit(user)} >editar</button>
                                            <button className="btn btn-delete mx-2" onClick={() => onDelete(user.id)}>eliminar</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </>
                        :
                        <>
                            <thead>
                                <tr>
                                    <th>Nombre de usuario</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <td>No hay datos</td>
                                </tr>
                            </tbody>
                        </>
                    }
                </table>
            </div>

            <Paginator pageable={pageable} totalPages={totalPages} domain={"usuarios"} />
        </>


    );
}