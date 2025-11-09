import { useContext } from "react";
import { ThematicForm } from "./ThematicForm";
import { ThematicContext } from "../../context/Thematic/ThematicContex";

export const ThematicModalForm = () => {

     const {
            currentThematicForm,
        } = useContext(ThematicContext);

    return (<>
        <div className="abrir-modal fadeIn modal-backdrop bg-dark bg-opacity-75">
            <div className="modal modal-lg" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header custom-card-header-search">
                            <h5 className="modal-title text-white">
                                {currentThematicForm.id > 0 ? "Editar Temática" : "Registrar Temática"}
                            </h5>
                        </div>
                        <div className="modal-body">
                            <ThematicForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}