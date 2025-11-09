import { useContext } from "react";
import { UserForm } from "./UserForm";
import { UserContext } from "../../context/User/UserContext";

export const UserModalForm = () => {
    const {
            currentUser,
        } = useContext(UserContext);
    return (<>
        <div className="abrir-modal fadeIn modal-backdrop bg-dark bg-opacity-75">
            <div className="modal modal-lg" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header custom-card-header-search">
                            <h5 className="modal-title text-white">
                                {currentUser.id>0 ? 'Editar Usuario' : 'Registrar Usuario'}
                            </h5>
                        </div>
                        
                        <div className="modal-body">
                            <UserForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}