import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (trainers) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Listado de Formadores", 14, 20);

    const tableColumn = ["Apellido","Nombre", "Provincia", "Temáticas", "Documento"];
    const tableRows = [];

    trainers.forEach(trainer => {
        const thematicNames = trainer.thematics?.map(t => t.name).join(", ") || "";
        const trainerData = [
            trainer.lastname.toUpperCase(),
            trainer.name,
            trainer.province.name,
            thematicNames,
            `${trainer.documentType?.name} ${trainer.documentNumber}`
        ];
        tableRows.push(trainerData);
    });

    autoTable(doc, {
        startY: 30,
        head: [tableColumn],
        body: tableRows,
    });

    doc.save("formadores.pdf");
};