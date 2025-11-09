
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
    const { 
        login, 
        handlerLogin, 
        handlerLogout,
        handlerValidationPassword,
    } = useAuth();
    return (
        <AuthContext.Provider value={
            {
                login, 
                handlerLogin, 
                handlerLogout,
                handlerValidationPassword,
            }
        } >
            {children}
        </AuthContext.Provider>
    );
}