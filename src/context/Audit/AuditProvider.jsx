import { useState, useEffect, useCallback } from "react";
import { AuditContext } from "./AuditContext";
import { auditService } from "../../services/auditService";

const initialFilters = {
  username: "",
  entityName: "",
  action: "",
  page: 0,
  size: 20,
};

export const AuditProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [entityDetail, setEntityDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchLogs = useCallback(async (currentFilters) => {
    setLoading(true);
    try {
      const data = await auditService.getAllLogs(currentFilters);
      if (data && data.content) {
        setLogs(data.content);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
      } else {
        setLogs(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error al cargar logs de auditoría:", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs(filters);
  }, [filters, fetchLogs]);

  const handlerChangePage = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handlerSearch = (newFilterValues) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilterValues,
      page: 0,
    }));
  };

  const handlerOpenDetailModal = async (log) => {
    setSelectedLog(log);
    setVisibleModal(true);
    setLoadingDetail(true);
    setEntityDetail(null);

    try {
      const data = await auditService.getEntityDetail(log.id);
      setEntityDetail(data);
    } catch (error) {
      console.error("Error al obtener detalle:", error);
      setEntityDetail({ error: "No se pudo recuperar la información." });
    } finally {
      setLoadingDetail(false);
    }
  };

  const handlerCloseDetailModal = () => {
    setVisibleModal(false);
    setSelectedLog(null);
    setEntityDetail(null);
  };

  return (
    <AuditContext.Provider
      value={{
        logs,
        totalPages,
        totalElements,
        filters,
        loading,
        visibleModal,
        selectedLog,
        entityDetail,
        loadingDetail,
        handlerLoadLogs: () => fetchLogs(filters),
        handlerChangePage,
        handlerSearch,
        handlerOpenDetailModal,
        handlerCloseDetailModal,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
};