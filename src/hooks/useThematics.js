import { useState } from "react"
import { deleteThematic, getThematics, getThematicsList, saveThematic, updateThematic } from "../services/ThematicService";
import Swal from "sweetalert2";
import { useSearchParams } from "react-router-dom";

export const useThematics = () => {

    const initialThematicForm = {
        id: 0,
        name: ''
    }
    const initialErrors = {
        name: ''
    }

    const [searchParams] = useSearchParams();

    const [thematics, setThematics] = useState([]);

    const [thematicList, setThematicList] = useState([]);

    const [pageable, setPageable] = useState({});

    const [totalPages, setTotalPages] = useState(0);

    const [visibleForm, setVisibleForm] = useState(false);

    const [currentThematicForm, setCurrentThematicForm] = useState(initialThematicForm);

    const [errors, setErrors] = useState(initialErrors);

    const page = (searchParams.get("page") || 0);

    const size = (searchParams.get("size") || 8);

    const handlerFillCurrentThematicForm = (id) => {
        const selectedThematic = thematics.find(t => t.id == id);
        setCurrentThematicForm(selectedThematic);
    }

    const handlerVisibleForm = (isVisible) => {
        setVisibleForm(isVisible);
        !isVisible && setCurrentThematicForm(initialThematicForm);
    };

    const handlerLoadingThematicsList = async () => {
        try {
            if (thematicList.length === 0) {
                const db = await getThematicsList();
                setThematicList(db.data);
            }
        } catch (error) {
            console.error("Error al cargar las temáticas:", err);
        }
    };

    const handlerLoadingThematics = async ({ name }) => {

        try {
            const thematicsDB = await getThematics({
                page: page,
                size: size,
                name: name
            });
            setTotalPages(thematicsDB.data.totalPages);
            setPageable(thematicsDB.data.pageable);
            setThematics(thematicsDB.data.content);
        } catch (error) {
            console.error("Error al cargar las temáticas:", err);
        }
    };

    const handlerAddOrUpdateThematic = async (thematicForm) => {
        const { id, ...data } = thematicForm;
        try {
            (id > 0) ? await updateThematic(thematicForm) : await saveThematic(data);
            handlerVisibleForm(false);
            handlerCleanCurrentThematic();

            Swal.fire({
                title: "Completado!",
                text: (id > 0) ? "Se actualizaron los datos correctamente!" : "Se registró con éxito!",
                icon: "success"
            });
            handlerLoadingThematics({ name: thematicForm.name || "" });
            return true;
        } catch (error) {
            if (error.response && error.response.status == 400) {
                setErrors(error.response.data);
            }
            return false;
        }
    }

    const handlerDeleteThematic = async (id) => {

        const response = await deleteThematic(id);

        Swal.fire({
            title: response.success ? 'Éxito!' : 'Error!',
            text: response.message,
            icon: response.success ? 'success' : 'error',
            confirmButtonText: 'Volver',
        });
        handlerLoadingThematics({ name: "" });

    }

    const handlerCleanCurrentThematic = () => {
        setCurrentThematicForm(initialThematicForm);
    }

    return ({
        thematicList,
        pageable,
        totalPages,
        errors,
        initialThematicForm,
        currentThematicForm,
        thematics,
        visibleForm,
        handlerLoadingThematics,
        handlerFillCurrentThematicForm,
        handlerVisibleForm,
        handlerAddOrUpdateThematic,
        handlerDeleteThematic,
        handlerLoadingThematicsList,
    });

}