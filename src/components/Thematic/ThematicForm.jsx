import { useContext, useState } from "react";
import { ThematicContext } from "../../context/Thematic/ThematicContex";

export const ThematicForm = () => {

    const {
        errors,
        currentThematicForm,
        initialThematicForm,
        handlerVisibleForm,
        handlerAddOrUpdateThematic,
    } = useContext(ThematicContext);

    const [thematicForm, setThematicForm] = useState(currentThematicForm);
    const { name } = thematicForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setThematicForm({
            ...thematicForm,
            [name]: value,
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (await handlerAddOrUpdateThematic(thematicForm)) {
            setThematicForm(initialThematicForm);
        }
    };

    const onCloseForm = () => {
        handlerVisibleForm(false);
    };

    return (<>
        <form onSubmit={onSubmit}>
            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Nombre:</label>
                <div className="col-9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="name"
                        value={name}
                        onChange={onInputChange}
                    />
                    <span className="text-danger">{errors?.name}</span>
                </div>
            </div>

            <div className="row m-3">
                <div className="col text-start">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={onCloseForm}
                    >
                        Volver
                    </button>
                </div>
                <div className="col text-end">
                    <button type="submit" className="btn btn-azul-oscuro">Confirmar</button>
                </div>
            </div>
        </form>
    </>);
}