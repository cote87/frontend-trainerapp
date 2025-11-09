import { useContext, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap"
import { UserContext } from "../../context/User/UserContext";

export const UserSearch = () => {
    

    const {handlerLoadingUsers} = useContext(UserContext);

    const [searchUserForm,setSearchUserForm] = useState('');
    const {username} = searchUserForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setSearchUserForm({
            ...searchUserForm,
            [name]: value,
        });
    }

    const onSubmit = (event) => { 
        event.preventDefault();
        console.log(searchUserForm)
        handlerLoadingUsers(searchUserForm);
    }

    return <>
        <Card className="my-2 custom-card">
            <CardHeader className="custom-card-header-search"><h4>Buscar temática</h4></CardHeader>
            <form onSubmit={onSubmit}>
                <CardBody>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            value={username||""}
                            onChange={onInputChange}
                            autoComplete="off"
                            placeholder="Nombre de usuario"
                        ></input>
                    </div>
                </CardBody>
            </form>
        </Card>
    </>

}