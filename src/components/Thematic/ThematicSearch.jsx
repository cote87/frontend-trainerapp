import { useContext, useState } from "react";
import { Card, CardBody, CardHeader } from "react-bootstrap"
import { ThematicContext } from "../../context/Thematic/ThematicContex";

export const ThematicSearch = () => {

    const {
            handlerLoadingThematics,
        } = useContext(ThematicContext);

    const [formData, setFormData] = useState('');
    const { name } = formData;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handlerLoadingThematics({name:name});
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
                            name="name"
                            id="name"
                            value={name || ""}
                            onChange={onInputChange}
                            autoComplete="off"
                            placeholder="Nombre"
                        ></input>
                    </div>
                </CardBody>
            </form>
        </Card>
    </>

}