import { useContext } from "react";
import { UserModalForm } from "../components/User/UserModalForm";
import { UserTable } from "../components/User/UserTable";
import { UserContext } from "../context/User/UserContext";
import { AuthContext } from "../auth/context/AuthContext";
import { UserSearch } from "../components/User/UserSearch";

export const UserListPage = () => {

    const {
        visibleForm,
        handlerVisibleForm
    } = useContext(UserContext)

    const {
        login
    } = useContext(AuthContext);

    const writeable = login.user.authorities.includes("KEY_WRITE_USERS");

    const onAddUserForm = () => {
        handlerVisibleForm(true);
    }

    return (
        <div className="container">
            <h1 className="text-white">Listado de Usuarios</h1>
            {writeable && visibleForm && <UserModalForm />}
            <UserSearch/>
            {writeable && <button className="btn btn-register" onClick={onAddUserForm}>Agregar Usuario</button>}
            <UserTable />
        </div>
    );
}