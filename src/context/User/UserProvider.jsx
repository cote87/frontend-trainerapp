import { useUsers } from "../../hooks/useUsers"
import { UserContext } from "./UserContext"

export const UserProvider = ({ children }) => {
    const {
        totalPages,
        pageable,
        errors,
        roles,
        users,
        handlerLoadingUsers,
        visibleForm,
        handlerVisibleForm,
        currentUser,
        handlerDeleteUser,
        handlerCleanCurrentUser,
        handlerSaveUser,
        handlerEditForm,
        handlerfillCurrentUser
    } = useUsers();
    return (
        <UserContext.Provider value={
            {
                totalPages,
                pageable,
                errors,
                roles,
                users,
                handlerLoadingUsers,
                visibleForm,
                handlerVisibleForm,
                currentUser,
                handlerDeleteUser,
                handlerCleanCurrentUser,
                handlerSaveUser,
                handlerEditForm,
                handlerfillCurrentUser
            }
        }>
            {children}
        </UserContext.Provider>
    );
}