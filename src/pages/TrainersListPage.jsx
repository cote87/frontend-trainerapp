import { useContext } from "react";
import { TrainerContext } from "../context/Trainer/TrainerContext";
import { TrainerModalForm } from "../components/Trainer/TrainerModalForm"
import { TrainerTable } from "../components/Trainer/TrainerTable";
import { TrainerModalView } from "../components/Trainer/TrainerModalView";
import { AuthContext } from "../auth/context/AuthContext";

export const TrainerListPage = () => {

    const {
        viewTrainer,
        visibleForm,
        handlerVisibleForm,
        handlerCleanCurrentTrainer,
        handlerCreateTrainerPDF,
    } = useContext(TrainerContext);

    const {
        login
    } = useContext(AuthContext);

    const writeable = login.user.authorities.includes("KEY_WRITE_TRAINERS");


    return (
        <div className="container-fluid p-4">

            <h1 className="text-start text-white">Listado de Especialistas Formadores</h1>
            {writeable &&
                <div className="text-end">


                    <button
                        className="btn btn-danger mx-2"
                        onClick={() => { handlerCreateTrainerPDF() }}
                    >Exportar PDF</button>

                    <button
                        className="btn btn-register"
                        onClick={() => {
                            handlerVisibleForm(true);
                            handlerCleanCurrentTrainer();
                        }}
                    >Registrar formador</button>
                </div>
            }

            {
                writeable && visibleForm && <TrainerModalForm />
            }

            {
                (viewTrainer.id != 0) && <TrainerModalView trainer={viewTrainer} />
            }

            <TrainerTable />

        </div>

    );
}