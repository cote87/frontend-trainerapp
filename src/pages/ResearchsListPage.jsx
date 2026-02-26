import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { ResearchContext } from "../context/Research/ResearchContext";
import { ResearchForm } from "../components/Research/ResearchForm";
import { ResearchSearch } from "../components/Research/ResearchSearch";
import { ResearchTable } from "../components/Research/ResearchTable";
import { ResearchTModalView } from "../components/Research/ResearchTModalView";

export const ResearchsListPage = () => {
    const {
        login
    } = useContext(AuthContext);
    const writeable = login.user.authorities.includes("KEY_WRITE_RESEARCHS");

    const {
        visibleForm,
        visibleViewTrainer,
        handlerLoadResearchs,
        handlerOpenResearchForm,
        searchFilters,
    } = useContext(ResearchContext);

    useEffect(() => {
        try {
            handlerLoadResearchs();
        } catch (error) {

        }
    }, [searchFilters])

    return (
        <>
            <div className="container p-4">
                <h1 className="text-white">Proyectos de investigación</h1>
                {writeable &&
                    <div className="text-end">
                        <button
                            className="btn btn-register"
                            onClick={() => {
                                handlerOpenResearchForm(0);
                            }}
                        >Registrar Investigación</button>
                    </div>
                }
                {writeable && visibleForm && <ResearchForm />}
                {visibleViewTrainer &&  <ResearchTModalView/>}
                <div className="form-group row">
                    <div className="form-group col-12 my-4">
                        <ResearchSearch/>
                    </div>
                    
                    <div className="form-group col-12">
                        <ResearchTable/>
                    </div>
                </div>
            </div>
        </>

    );
}