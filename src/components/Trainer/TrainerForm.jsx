import { useContext, useEffect, useState } from "react";
import { TrainerContext } from "../../context/Trainer/TrainerContext";
import { ThematicContext } from "../../context/Thematic/ThematicContex";
import { AuthContext } from "../../auth/context/AuthContext";

export const TrainerForm = () => {

    const {
        errors,
        documentTypes,
        provinces,
        initialTrainerForm,
        currentTrainerForm,
        handlerVisibleForm,
        handlerCleanCurrentTrainer,
        handlerAddOrUpdateTrainer,
        handlerLoadingProvinces,
        handlerLoadingDocumentTypes,
    } = useContext(TrainerContext);

    const {
        login
    } = useContext(AuthContext);

    const isSAdmin = login.user.authorities.includes('ROLE_SADMIN');

    const {
        thematicList: thematics,
        handlerLoadingThematicsList,
    } = useContext(ThematicContext);

    const [trainerForm, setTrainerForm] = useState(currentTrainerForm);
    const { name, lastname, email, areaCode, phone, documentType, documentNumber, province, cv, thematics: selectedThematics } = trainerForm;

    useEffect(() => {
        const fetchData = () => {
            try {
                handlerLoadingProvinces();
                handlerLoadingDocumentTypes();
                handlerLoadingThematicsList();
            } catch (err) {

            } finally {
            }
        };

        fetchData(); // Llamamos a la función para obtener los formadores
    }, []);

    useEffect(() => {
        if (provinces.length > 0 && login?.provinceId) {
            setTrainerForm(prev => ({
                ...prev,
                province: provinces.find(p => p.id == login.provinceId),
                documentType: documentTypes.find(d => d.name == "DNI")
            }));
        }
    }, [provinces, login]);

    const onDeleteThematic = (id) => {
        setTrainerForm({
            ...trainerForm,
            thematics: selectedThematics.filter(t => t.id != id),
        });
    }
    const onCloseForm = () => {
        handlerVisibleForm(false);
        handlerCleanCurrentTrainer();
    }

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setTrainerForm({
            ...trainerForm,
            [name]: value,
        });
    }

    const onSelectChange = ({ target }) => {
        const { name, value } = target;
        let object = {};
        if (value != 0 || value != '0') {
            switch (name) {
                case 'province':
                    object = provinces.find(p => p.id == value)
                    break;
                case 'documentType':
                    object = documentTypes.find(t => t.id == value)
                    break;
                case 'thematics':
                    let exist = false;
                    exist = selectedThematics.some(t => t.id == value)
                    if (!exist) {
                        const selectedThematic = thematics.find(t => t.id == value);
                        object = [
                            ...selectedThematics,
                            selectedThematic,
                        ]
                    }
                    else {
                        object = selectedThematics;
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case 'province':
                    object = initialTrainerForm.province;
                    break;
                case 'documentType':
                    object = initialTrainerForm.documentType;
                    break;
                case 'thematics':
                    object = selectedThematics;
                    break;
                default:
                    break;
            }
        }

        setTrainerForm({
            ...trainerForm,
            [name]: object,
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        handlerAddOrUpdateTrainer(trainerForm)
    }

    const handleChange = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, ""); // deja solo 0–9
        setTrainerForm({
            ...trainerForm,
            documentNumber: onlyNums,
        });
    };

    return (<>
        <form onSubmit={onSubmit}>
            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Temática:</label>
                <div className="col-9">
                    <div className="row-9">
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="thematics"
                            value={selectedThematics.at(-1)?.id || 0}
                            onChange={onSelectChange}>
                            <option key="0" value={'0'} disabled>Seleccione una opción.</option>
                            {thematics && thematics.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <span className="text-danger">{errors?.thematics}</span>
                    </div>
                    <div className="row-9">
                        {
                            selectedThematics.map(({ id, name }) => (
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm mx-1 my-2"
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

            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Apellido:</label>
                <div className="col-9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Apellido"
                        name="lastname"
                        value={lastname}
                        onChange={onInputChange}
                    />
                    <span className="text-danger">{errors?.lastname}</span>
                </div>
            </div>

            {isSAdmin
                ?
                <div className="form-group row mb-3">
                    <label className="col-form-label col-3 fw-bold">Provincia:</label>
                    <div className="col-9">
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="province"
                            value={province.id}
                            onChange={onSelectChange}>
                            <option key="0" value={'0'} disabled>Seleccione una opción.</option>
                            {provinces.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <span className="text-danger">{errors?.province?.name}</span>
                    </div>
                </div>
                :
                <div className="form-group row mb-3">
                    <label className="col-form-label col-3 fw-bold">Provincia:</label>
                    <div className="col-9">
                        <input
                            type="text"
                            className="form-control"
                            value={provinces?.find(p => p.id == login?.provinceId)?.name ?? ""}
                            disabled
                        />
                    </div>
                </div>
            }


            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Tipo de documento:</label>
                <div className="col-9">
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={documentType.id}
                        name="documentType"
                        onChange={onSelectChange}>
                        <option key={0} value={0} disabled >Seleccione una opción.</option>
                        {documentTypes.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <span className="text-danger">{errors?.documentType?.name}</span>
                </div>
            </div>

            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">N° documento:</label>
                <div className="col-9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Número de Documento"
                        name="documentNumber"
                        value={documentNumber}
                        onChange={handleChange}
                    />
                    <span className="text-danger">{errors?.documentNumber}</span>
                </div>
            </div>

            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Email:</label>
                <div className="col-9">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                    />
                    <span className="text-danger">{errors?.email}</span>
                </div>
            </div>

            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">Teléfono:</label>
                <div className="col-9">
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Cód. Área"
                                name="areaCode"
                                value={areaCode}
                                onChange={onInputChange}
                            />
                            <span className="text-danger">{errors?.areaCode}</span>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Teléfono"
                                name="phone"
                                value={phone}
                                onChange={onInputChange}
                            />
                            <span className="text-danger">{errors?.phone}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-group row mb-3">
                <label className="col-form-label col-3 fw-bold">CV URL:</label>
                <div className="col-9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="URL Currículum Vitae"
                        name="cv"
                        value={cv}
                        onChange={onInputChange}
                    />
                    <span className="text-danger">{errors?.cv}</span>
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

    </>);
}