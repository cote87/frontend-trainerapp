import { useNavigate, useSearchParams } from "react-router-dom";

export const Paginator = ({ totalPages, pageable, domain }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Leer valores de la URL o usar valores por defecto
    const pageNumber = parseInt(searchParams.get("page")) || 0;
    const pageSize = parseInt(searchParams.get("size")) || pageable.pageSize || 7;

    const MAX_ELEMENTS = 5;
    const pageNumbers = [];

    const onClickPage = (number) => {
        let url = `/${domain}?page=${number}&size=${pageSize}`;
        searchParams.forEach((value, key) => {
            if (key !== "page" && key !== "size") url += `&${key}=${value}`;
        });
        navigate(url); // Cambia la URL sin reemplazar el historial
    };

    // Generar lista de números de página
    for (let i = pageNumber - MAX_ELEMENTS; i <= pageNumber + MAX_ELEMENTS; i++) {
        if (i >= 0 && i < totalPages) {
            pageNumbers.push(
                <li key={i} className={`page-item ${i === pageNumber ? "active" : ""}`}>
                    <button className={`page-link-outline ${i === pageNumber ? "active" : ""}`} onClick={() => onClickPage(i)}>
                        {i + 1}
                    </button>
                </li>
            );
        }
    }

    return (
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {/* Botón "Anterior" */}
                    {pageNumber > 0 && (
                        <li className="page-item">
                            <button className="page-link-outline" onClick={() => onClickPage(pageNumber - 1)}>
                                &laquo;
                            </button>
                        </li>
                    )}

                    {/* Botones de páginas */}
                    {pageNumbers}

                    {/* Botón "Siguiente" */}
                    {pageNumber < totalPages - 1 && (
                        <li className="page-item">
                            <button className="page-link-outline" onClick={() => onClickPage(pageNumber + 1)}>
                                &raquo;
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};