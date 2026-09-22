import { AuditProvider } from "../context/Audit/AuditProvider";
import { AuditTable } from "../components/Audits/AuditTable";
import { AuditViewModal } from "../components/Audits/AuditViewModal";

export const AuditPage = () => {
  return (
    <AuditProvider>
      <div className="container">
        <h1 className="text-white my-3">Log de Carga y Modificaciones</h1>
        <AuditTable />
        <AuditViewModal />
      </div>
    </AuditProvider>
  );
};

export default AuditPage;