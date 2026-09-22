import { useAudit } from "../../hooks/useAudit";

export const AuditViewModal = () => {
  const { visibleModal, selectedLog, entityDetail, loadingDetail, handlerCloseDetailModal } = useAudit();

  if (!visibleModal || !selectedLog) return null;

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

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-dark text-white border-secondary">
          
          <div className="modal-header border-secondary">
            <h5 className="modal-title">
              Inspección de Auditoría #{selectedLog.id}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handlerCloseDetailModal}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <p><strong>Fecha/Hora:</strong> {new Date(selectedLog.timestamp).toLocaleString()}</p>
                <p><strong>Usuario:</strong> {selectedLog.username}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Acción:</strong> <span className="badge bg-info">{selectedLog.action}</span></p>
                <p><strong>Módulo:</strong> {transformEntityName(selectedLog.entityName)}</p>
              </div>
            </div>

            <hr className="border-secondary" />

            {/* SECCIÓN DE DIFERENCIAS (DETAILS) */}
            <h6 className="mb-2">Cambios Detectados (Diferencias):</h6>
            <pre
              className="p-3 rounded text-warning bg-black border border-secondary mb-3"
              style={{ maxHeight: "150px", overflowY: "auto", fontSize: "0.85rem", whiteSpace: "pre-wrap" }}
            >
              {selectedLog.details || "Sin detalles de cambios registrados."}
            </pre>

            <h6 className="mb-2">Estado Actual / Detalle de la Entidad:</h6>
            
            {loadingDetail ? (
              <div className="text-center p-4">
                <div className="spinner-border text-light" role="status"></div>
                <p className="mt-2 text-muted">Cargando detalles de la inspección...</p>
              </div>
            ) : (
              <pre
                className="p-3 rounded text-success bg-black"
                style={{ maxHeight: "300px", overflowY: "auto", fontSize: "0.85rem" }}
              >
                {JSON.stringify(entityDetail, null, 2)}
              </pre>
            )}
          </div>

          <div className="modal-footer border-secondary">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlerCloseDetailModal}
            >
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};