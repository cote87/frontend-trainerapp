import { useTrainings } from "../../hooks/useTrainings";
import { TrainingContext } from "./TrainingContext";


export const TrainingProvider = ({ children }) => {
    const {
        initialSearchFilters,
        searchFilters,
        trainings,
        loading,
        currentTraining,
        page,
        totalPages,
        pageable,
        totalElements,
        setSearchFilters,
        clearFilters,
        setPage,
        loadTrainings,
        handlerLoadingTraining,
        handlerSaveTraining,
        handlerClearCurrentTraining,
        handlerDeleteTraining,
    } = useTrainings();
    return (
        <TrainingContext.Provider value={
            {
                initialSearchFilters,
                searchFilters,
                trainings,
                loading,
                currentTraining,
                page,
                totalPages,
                pageable,
                totalElements,
                setSearchFilters,
                clearFilters,
                setPage,
                loadTrainings,
                handlerLoadingTraining,
                handlerSaveTraining,
                handlerClearCurrentTraining,
                handlerDeleteTraining,
            }
        }>
            {children}
        </TrainingContext.Provider>
    );
}