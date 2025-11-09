import { useContext } from "react";
import { ThematicContext } from "../context/Thematic/ThematicContex";
import { ThematicTable } from "../components/Thematic/ThematicTable";
import { ThematicModalForm } from "../components/Thematic/ThematicModalForm"
import { AuthContext } from "../auth/context/AuthContext";
import { ThematicSearch } from "../components/Thematic/ThematicSearch";

export const ThematicListPage = () => {
    const {
        visibleForm,
        handlerVisibleForm,
    } = useContext(ThematicContext);
    const {
        login
    } = useContext(AuthContext);

    const writeable = login.user.authorities.includes("KEY_WRITE_THEMATICS");

    return (
        <div className="container">
            <h1 className="text-white">Listado de Temáticas disponibles</h1>
            <ThematicSearch/>
            {writeable && visibleForm && <ThematicModalForm />}
            {writeable && <button className="btn btn-register my-1" onClick={() => { handlerVisibleForm(true) }}>Agregar Temática</button> }
            <ThematicTable />
        </div>

    );

}