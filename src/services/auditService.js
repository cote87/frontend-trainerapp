import api from "./api";

export const auditService = {
  getAllLogs: async (filters = {}) => {
    // Filtra claves que tengan valores vacíos, nulls o undefined
    const cleanParams = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );

    const response = await api.get("/audit-logs", { params: cleanParams });
    return response.data;
  },

  getEntityDetail: async (logId) => {
    const response = await api.get(`/audit-logs/${logId}/entity`);
    return response.data;
  }
};