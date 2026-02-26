import { useContext, useState } from "react";
import { ResearchContext } from "../../context/Research/ResearchContext";
import { AuthContext } from "../../auth/context/AuthContext";

export const ResearchForm = () => {
    const {
        login
    } = useContext(AuthContext);

    const {
        currentResearch,
        trainers,
        thematics,
        errors,
        handlerCloseResearchForm,
        handlerSaveResearch,
    } = useContext(ResearchContext);



    const [researchForm, setResearchForm] = useState({
        ...currentResearch,
        userId: login.id,
        researchers: currentResearch?.researchers || []
    })
    const { id, name, description, researchers, thematics: researchThematics, userId } = researchForm;

    const onAddResearcher = () => {
        const newResearcher = {
            id: 0,
            name: '',
            trainer: null
        };

        setResearchForm({
            ...researchForm,
            researchers: [...researchForm.researchers, newResearcher]
        });
    };

    const onDeleteResearcher = (index) => {
        const updated = researchForm.researchers.filter((_, i) => i !== index);

        setResearchForm({
            ...researchForm,
            researchers: updated
        });
    };

    const onDeleteThematic = (id) => {
        setResearchForm({
            ...researchForm,
            thematics: researchThematics?.filter(t => t.id != id),
        });
    }

    const onResearcherNameChange = (index, value) => {
        const updated = [...researchForm.researchers];
        updated[index].name = value;

        setResearchForm({
            ...researchForm,
            researchers: updated
        });
    };

    const onResearcherTrainerChange = (index, trainerId) => {
        const updated = [...researchForm.researchers];

        if (trainerId === '0') {
            // No es formador registrado
            updated[index].trainer = null;
            updated[index].name = '';
        } else {
            const selectedTrainer = trainers.find(t => t.id == trainerId);

            updated[index].trainer = selectedTrainer;
            updated[index].name = selectedTrainer.lastname + ', ' + selectedTrainer.name;
        }

        setResearchForm({
            ...researchForm,
            researchers: updated
        });
    };

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setResearchForm({
            ...researchForm,
            [name]: value,
        });
    }

    const onSelectChange = ({ target }) => {
        const { name, value } = target;
        let object = {};
        if (value != 0 || value != '0') {
            switch (name) {
                case 'thematics':
                    let exist = false;
                    exist = researchThematics?.some(t => t.id == value)
                    if (!exist) {
                        const researchThematic = thematics.find(t => t.id == value);
                        object = [
                            ...researchThematics,
                            researchThematic,
                        ]
                    }
                    else {
                        object = researchThematics;
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case 'thematics':
                    object = researchThematics;
                    break;
                default:
                    break;
            }
        }
        setResearchForm({
            ...researchForm,
            [name]: object,
        });
    }


    const onCloseForm = () => {
        handlerCloseResearchForm();
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await handlerSaveResearch(researchForm)
            if(response){
                handlerCloseResearchForm();
            }
        } catch (e) {

        }
        
    }

    return (<>
        <div className="abrir-modal fadeIn modal-backdrop bg-dark bg-opacity-75">
            <div className="modal modal-lg" style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document" style={{ maxWidth: '55%' }}>
                    <div className="modal-content">
                        <div className="modal-header custom-card-header-register">
                            <h5 className="modal-title">
                                {
                                    id > 0 ? 'Editar Investigación' : 'Registrar Investigación'
                                }
                            </h5>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group row mb-3">
                                    <label className="col-form-label col-3 fw-bold">Título:</label>
                                    <div className="col-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Título de la investigación"
                                            name="name"
                                            value={name || ''}
                                            onChange={onInputChange}
                                        />
                                        <span className="text-danger">{errors?.name}</span>
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label className="col-form-label col-3 fw-bold">Temática:</label>
                                    <div className="col-9">
                                        <div className="row-9">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                name="thematics"
                                                value={researchThematics?.at(-1)?.id || 0}
                                                onChange={onSelectChange}>
                                                <option key="0" value={'0'} disabled>Seleccione una opción.</option>
                                                {thematics && thematics?.map(({ id, name }) => (
                                                    <option key={id} value={id}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </select>
                                            <span className="text-danger">{errors?.thematics}</span>
                                        </div>
                                        <div className="row-9">
                                            {
                                                researchThematics?.map(({ id, name }) => (
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary mx-1 my-2   rounded-pill"
                                                        key={id}
                                                        onClick={() => onDeleteThematic(id)}>
                                                        {name + " x"}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label className="col-form-label col-3 fw-bold">Investigadores:</label>
                                    <div className="col-9">

                                        {researchForm.researchers.map((researcher, index) => (
                                            <div key={index} className="border rounded p-2 mb-2">

                                                <div className="row mb-2">
                                                    <div className="col-5">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Nombre investigador"
                                                            value={researcher.name}
                                                            disabled={researcher.trainer != null}
                                                            onChange={(e) =>
                                                                onResearcherNameChange(index, e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-6">
                                                        <select
                                                            className="form-select"
                                                            value={researcher.trainer?.id || 0}
                                                            disabled={researcher.id > 0}
                                                            onChange={(e) =>
                                                                onResearcherTrainerChange(index, e.target.value)
                                                            }
                                                        >
                                                            <option value="0">
                                                                No es un formador registrado
                                                            </option>
                                                            {trainers.map(t => (
                                                                <option key={t.id} value={t.id}>
                                                                    {t.lastname} {t.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="col-1 text-end">
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm rounded-pill"
                                                            onClick={() => onDeleteResearcher(index)}
                                                        >
                                                            x
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            onClick={onAddResearcher}
                                        >
                                            + Agregar investigador
                                        </button>

                                        <p><span className="text-danger">{errors?.researchers}</span></p>
                                    </div>
                                </div>
                                <div className="form-group row mb-3">
                                    <label className="col-form-label col-3 fw-bold">Descripción de la investigación:</label>
                                    <div className="col-9">
                                        <textarea
                                            className="form-control"
                                            placeholder="Descripción"
                                            name="description"
                                            value={description || ''}
                                            onChange={onInputChange}
                                            rows="4"
                                        />
                                        <span className="text-danger">{errors?.description}</span>
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
                                        <button type="submit" className="btn btn-azul-oscuro">Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}