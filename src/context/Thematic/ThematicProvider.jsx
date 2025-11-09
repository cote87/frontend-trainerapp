import { useThematics } from "../../hooks/useThematics";
import { ThematicContext } from "./ThematicContex";

export const ThematicProvider = ({ children }) => {
    const {
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
    } = useThematics();
    return (
        <ThematicContext.Provider value={
            {
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
            }
        }>
            {children}
        </ThematicContext.Provider>
    );
}