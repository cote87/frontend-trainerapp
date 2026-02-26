import { useResearchs } from "../../hooks/useResearchs";
import { ResearchContext } from "./ResearchContext";

export const ResearchProvider = ({ children }) => {

    const {
        loading,
        searchFilters,
        researchs,
        visibleForm,
        currentResearch,
        trainers,
        thematics,
        errors,
        visibleViewTrainer,
        currentTrainer,
        page,
        totalPages,
        pageable,
        totalElements,
        handlerLoadSearchFilters,
        handlerLoadResearchs,
        handlerOpenViewTrainer,
        handlerChangePageResearchs,
        handlerCloseResearchForm,
        handlerCloseViewTrainer,
        handlerOpenResearchForm,
        handlerSaveResearch,
        handlerDeleteResearch,
    } = useResearchs();
    return (
        <ResearchContext.Provider value={
            {
                loading,
                searchFilters,
                researchs,
                visibleForm,
                currentResearch,
                trainers,
                thematics,
                errors,
                visibleViewTrainer,
                currentTrainer,
                page,
                totalPages,
                pageable,
                totalElements,
                handlerLoadSearchFilters,
                handlerLoadResearchs,
                handlerOpenViewTrainer,
                handlerChangePageResearchs,
                handlerCloseResearchForm,
                handlerCloseViewTrainer,
                handlerOpenResearchForm,
                handlerSaveResearch,
                handlerDeleteResearch,
            }
        }>
            {children}
        </ResearchContext.Provider>
    );
}