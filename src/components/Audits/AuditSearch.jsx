import { useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { useAudit } from "../../hooks/useAudit";

export const AuditSearch = () => {
  const { handlerSearch } = useAudit();
  const [filters, setFilters] = useState({
    username: "",
    entityName: "",
    action: "",
  });

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    handlerSearch(newFilters);
  };

  const onReset = () => {
    const initial = { username: "", entityName: "", action: "" };
    setFilters(initial);
    handlerSearch(initial);
  };

  return (
    <Card className="my-2 custom-card">
      <CardHeader className="custom-card-header-search">
        <h4 className="m-0 text-white">Filtrar Auditoría</h4>
      </CardHeader>
      <CardBody>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="username"
              value={filters.username}
              onChange={onInputChange}
              placeholder="Buscar por Usuario"
              autoComplete="off"
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              name="entityName"
              value={filters.entityName}
              onChange={onInputChange}
            >
              <option value="">Todos los Módulos</option>
              <option value="Research">Investigaciones</option>
              <option value="Researcher">Investigadores</option>
              <option value="Thematic">Temáticas</option>
              <option value="Trainer">Formadores</option>
              <option value="Training">Capacitaciones</option>
              <option value="User">Usuarios</option>
            </select>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              name="action"
              value={filters.action}
              onChange={onInputChange}
            >
              <option value="">Todas las Acciones</option>
              <option value="CREATE">Creación (CREATE)</option>
              <option value="UPDATE">Edición (UPDATE)</option>
              <option value="DELETE">Eliminación (DELETE)</option>
            </select>
          </div>

          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={onReset}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};