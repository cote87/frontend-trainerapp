import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { TrainingSearch } from "../components/Training/TrainingSearch";
import { TrainingTable } from "../components/Training/TrainingTable";
import { useNavigate } from "react-router-dom";

export const TrainingsListPage = () => {

  const navigate = useNavigate();

  const {
    login
  } = useContext(AuthContext);

  const writeable = login.user.authorities.includes("KEY_WRITE_TRAININGS");

  const handlerTrainingForm = () => {
    navigate("/capacitaciones/form");
  }

  return (
    <>
      <div className="container-fluid p-4">
        <h1 className="text-start text-white">Listado de Capacitaciones</h1>
        {writeable &&
          <div className="text-end my-2">
            <button
              className="btn btn-register"
              onClick={handlerTrainingForm}
            >Registrar capacitación</button>
          </div>
        }
        <div className="row">
          <div className="col col-4">
            <TrainingSearch />
          </div>
          <div className="col col-8">
            <TrainingTable />
          </div>
        </div>
      </div>
    </>
  );
};