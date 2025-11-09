import { TrainerView } from "./TrainerView"

export const TrainerModalView = ({ trainer }) => {
    return (<>
        <div className="abrir-modal fadeIn modal-backdrop bg-dark bg-opacity-75">
            <div className="modal" style={{ display: "block" }} tabIndex="-1">
                <div>
                    <TrainerView trainer={trainer} />
                </div>
            </div>
        </div>
    </>);
}
