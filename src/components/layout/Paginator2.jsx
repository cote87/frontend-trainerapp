export const Paginator2 = ({ page, totalPages, searchFunction }) => {

    const MAX_ELEMENTS = 5;
    const pageNumbers = [];

    const onClickPage = (newPageNumber) => {
        searchFunction(newPageNumber);
    };

    // Generar lista de números de página
    for (let i = page - MAX_ELEMENTS; i <= page + MAX_ELEMENTS; i++) {
        if (i >= 0 && i < totalPages) {
            pageNumbers.push(
                <li key={i} className={`page-item ${i === page ? "active" : ""}`}>
                    <button className={`page-link-outline ${i === page ? "active" : ""}`} onClick={() => onClickPage(i)}>
                        {i + 1}
                    </button>
                </li>
            );
        }
    }

    return (
        <div className="d-flex justify-content-center my-3">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {/* Botón "Anterior" */}
                    {page > 0 && (
                        <li className="page-item">
                            <button className="page-link-outline" onClick={() => onClickPage(page - 1)}>
                                &laquo;
                            </button>
                        </li>
                    )}

                    {/* Botones de páginas */}
                    {pageNumbers}

                    {/* Botón "Siguiente" */}
                    {page < totalPages - 1 && (
                        <li className="page-item">
                            <button className="page-link-outline" onClick={() => onClickPage(page + 1)}>
                                &raquo;
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};