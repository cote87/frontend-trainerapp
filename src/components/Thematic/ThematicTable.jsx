import { useContext, useEffect } from "react";
import { ThematicContext } from "../../context/Thematic/ThematicContex";
import Swal from "sweetalert2";
import { Paginator } from "../layout/Paginator";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";

export const ThematicTable = () => {
    const {
        totalPages,
        pageable,
        thematics,
        handlerFillCurrentThematicForm,
        handlerLoadingThematics,
        handlerVisibleForm,
        handlerDeleteThematic,
    } = useContext(ThematicContext);
    const {
        login
    } = useContext(AuthContext);

    const writeable = login.user.authorities.includes("KEY_WRITE_THEMATICS");
    const deleteable = login.user.authorities.includes("KEY_DELETE_THEMATICS");

    const params = useParams();

    useEffect(() => {
        const fetchData = () => {
            try {
                handlerLoadingThematics({ name: params.name || "" });
            } catch (err) {
                throw (err);
            }
        };

        fetchData();
    }, [params]);

    const onEditThematic = (id) => {
        handlerVisibleForm(true);
        handlerFillCurrentThematicForm(id);
    }

    const onDeleteThematic = async (id) => {


        Swal.fire({
            title: "Está seguro?",
            text: "Está por eliminar una temática!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Eliminada!",
                    text: "La temática ha sido eliminada",
                    icon: "success"
                });
                handlerDeleteThematic(id);
            }
        });
    }

    return (
        <>

            <div className="table-responsive border rounded my-4 transparent-table" style={{ minHeight: '100px', overflowY: 'auto', backgroundColor: 'transparent' }}>

                <table className="table table-hover table-striped">


                    {thematics.length > 0
                        ?
                        <>
                            <thead>
                                <tr>
                                    <th>Temáticas</th>
                                    <th className="text-end"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {thematics.map(({ id, name }) => (

                                    <tr key={id}>
                                        <td>{name}</td>
                                        <td className="text-end">
                                            {writeable &&
                                                <button
                                                    className="btn btn-edit mx-2"
                                                    onClick={() => onEditThematic(id)}
                                                >Editar</button>
                                            }
                                            {deleteable &&
                                                <button
                                                    className="btn btn-delete mx-2"
                                                    onClick={() => onDeleteThematic(id)}
                                                >Eliminar</button>
                                            }
                                        </td>
                                    </tr>

                                ))
                                }
                            </tbody>
                        </>

                        :
                        <>
                            <thead>
                                <tr>
                                    <th>Temáticas</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                    <td>No hay datos</td>
                                </tr>
                            </tbody>


                        </>


                    }
                </table>
                <Paginator pageable={pageable} totalPages={totalPages} domain={"tematicas"} />
            </div>
        </>
    );
}