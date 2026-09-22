import { useContext } from "react";
import { AuditContext } from "../context/Audit/AuditContext";

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error("useAudit debe ser utilizado dentro de un AuditProvider");
  }
  return context;
};