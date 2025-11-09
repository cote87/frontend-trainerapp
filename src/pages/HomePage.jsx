
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <br/><br/><br/><br/><br/><br/><br/><br/>
      <img
        src="/img/logo-blanco.png"
        alt="Logo"
        className="img-fluid w-25"
      />
      <br />
      <hr className="w-25 border border-2 border-primary mt-3" />
      <br />
      <h1 className="mb-5 text-white">Bienvenido</h1>
      <div className="row w-100 justify-content-center gap-4">
        <div className="col-6 col-md-3">
          <button
            className="btn btn-azul-oscuro rounded-pill w-100 d-flex align-items-center justify-content-center text-white border border-white"
            onClick={() => navigate('/formadores')}
          >
            <h4 className="m-0 py-1">FORMADORES</h4>
          </button>
        </div>
        <div className="col-6 col-md-3">
          <button
            className="btn btn-azul-oscuro rounded-pill w-100 d-flex align-items-center justify-content-center text-white border border-white"
            onClick={() => navigate('/capacitaciones')}
          >
            <h4 className="m-0 py-1">CAPACITACIONES</h4>
          </button>
        </div>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
};