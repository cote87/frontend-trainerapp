import { useContext } from "react";
import { TrainerContext } from "../../context/Trainer/TrainerContext";
import { TrainerForm } from "../Trainer/TrainerForm"

export const TrainerModalForm = () => {
    const { currentTrainerForm, disableForm } = useContext(TrainerContext);
    return (<>
        <div className="abrir-modal fadeIn modal-backdrop bg-dark bg-opacity-75">
            <div className="modal modal-lg" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header custom-card-header-register">
                            <h5 className="modal-title">
                                {
                                    !disableForm
                                        ? (currentTrainerForm.id > 0 ? 'Editar Especialista Formador' : 'Registrar Especialista Formador')
                                        : 'Detalles del Especialista Formador'
                                }
                            </h5>
                        </div>
                        <div className="modal-body">
                            <TrainerForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}