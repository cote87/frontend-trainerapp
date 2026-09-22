import { useAudit } from "../../hooks/useAudit";
import { AuditSearch } from "./AuditSearch";

export const AuditTable = () => {
  const { logs, loading, handlerOpenDetailModal, totalPages, filters, handlerChangePage } = useAudit();

  const transformEntityName = (name) => {
    const map = {
      UserDto: "Usuarios",
      User: "Usuarios",
      Research: "Investigaciones",
      Researcher: "Investigadores",
      Thematic: "Temáticas",
      Trainer: "Formadores",
      Training: "Capacitaciones",
    };
    return map[name] || name;
  };

  const getBadgeClass = (action) => {
    switch (action) {
      case "CREATE":
        return "badge bg-success";
      case "UPDATE":
        return "badge bg-primary";
      case "DELETE":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <>
      <AuditSearch />

      <div
        className="table-responsive border rounded my-4 transparent-table"
        style={{ minHeight: "100px", overflowY: "auto", backgroundColor: "transparent" }}
      >
        <table className="table table-hover table-striped text-white">
          {loading ? (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Cargando registros de auditoría...
                </td>
              </tr>
            </tbody>
          ) : logs.length > 0 ? (
            <>
              <thead>
                <tr>
                  <th>Fecha/Hora</th>
                  <th>Usuario</th>
                  <th>Acción</th>
                  <th>Módulo</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>{log.username}</td>
                    <td>
                      <span className={getBadgeClass(log.action)}>
                        {log.action}
                      </span>
                    </td>
                    <td>{transformEntityName(log.entityName)}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-view btn-sm"
                        onClick={() => handlerOpenDetailModal(log)}
                      >
                        Ver inspección
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <>
              <thead>
                <tr>
                  <th>Auditoría</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>No hay datos de auditoría para mostrar</td>
                </tr>
              </tbody>
            </>
          )}
        </table>
      </div>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center my-3 text-white">
          <button
            className="btn btn-outline-light btn-sm"
            disabled={filters.page === 0}
            onClick={() => handlerChangePage(filters.page - 1)}
          >
            Anterior
          </button>
          <span>
            Página {filters.page + 1} de {totalPages}
          </span>
          <button
            className="btn btn-outline-light btn-sm"
            disabled={filters.page + 1 >= totalPages}
            onClick={() => handlerChangePage(filters.page + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
};