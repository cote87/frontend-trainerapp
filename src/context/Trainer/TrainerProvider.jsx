import { useTrainers } from "../../hooks/useTrainers";
import { TrainerContext } from "../Trainer/TrainerContext";

export const TrainerProvider = ({ children }) => {
    const {
        currentSearchTrainerForm,
        pageable,
        totalPages,
        viewTrainer,
        errors,
        documentTypes,
        provinces,
        trainers,
        visibleForm,
        initialTrainerForm,
        currentTrainerForm,
        handlerViewTrainer,
        handlerAddOrUpdateTrainer,
        handlerVisibleForm,
        handlerCleanCurrentTrainer,
        handlerFillCurrentTrainer,
        handlerDeleteTrainer,
        handlerLoadingTrainers,
        handlerLoadingProvinces,
        handlerLoadingDocumentTypes,
        handlerNavigate,
        handlerSearchTrainers,
        handlerSetCurrentSearchTrainerForm,
        handlerCleanErrors,
        handlerUnsuscribeTrainer,
        handlerCreateTrainerPDF,
    } = useTrainers();
    return (
        <TrainerContext.Provider value={
            {
                currentSearchTrainerForm,
                pageable,
                totalPages,
                viewTrainer,
                errors,
                documentTypes,
                provinces,
                trainers,
                visibleForm,
                initialTrainerForm,
                currentTrainerForm,
                handlerViewTrainer,
                handlerAddOrUpdateTrainer,
                handlerVisibleForm,
                handlerCleanCurrentTrainer,
                handlerFillCurrentTrainer,
                handlerDeleteTrainer,
                handlerLoadingTrainers,
                handlerLoadingProvinces,
                handlerLoadingDocumentTypes,
                handlerNavigate,
                handlerSearchTrainers,
                handlerSetCurrentSearchTrainerForm,
                handlerCleanErrors,
                handlerUnsuscribeTrainer,
                handlerCreateTrainerPDF,
            }
        }>
            {children}
        </TrainerContext.Provider>
    );
}