import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Tu función existente para formadores
export const generatePDF = (trainers) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Listado de Formadores", 14, 20);

    const tableColumn = ["Apellido", "Nombre", "Provincia", "Temáticas", "Documento"];
    const tableRows = [];

    trainings.forEach(trainer => {
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

export const generateSingleTrainingPDF = async (training) => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(training.title || "Detalle de Capacitación", 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);

    // Tabla de Datos Principales
    const tableData = [
        ["Temática", training.thematic?.name || "-"],
        ["Modalidad", training.mode || "-"],
        ["Capacitador/a", training.trainer || "-"],
        ["Fecha de Inicio", training.startDate || "-"],
        ["Provincia", training.province?.name || "-"]
    ];

    autoTable(doc, {
        startY: 32,
        head: [["Campo", "Detalle"]],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [52, 58, 64] },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 45 },
            1: { cellWidth: 'auto' }
        }
    });

    // Descripción Enriquecida (HTML)
    if (training.description) {
        const startY = doc.lastAutoTable.finalY + 12;

        // Título de la sección
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text("Descripción / Programa:", 14, startY);

        // Crear un contenedor temporal oculto para procesar el HTML
        const container = document.createElement("div");
        container.style.width = "170mm";
        container.style.fontFamily = "helvetica, sans-serif";
        container.style.fontSize = "11pt";
        container.style.lineHeight = "1.4";
        container.style.color = "#333333";
        container.innerHTML = training.description;

        // Convertir y renderizar el HTML procesado dentro del PDF
        await doc.html(container, {
            x: 14,
            y: startY + 4,
            width: 170,
            windowWidth: 650,
            autoPaging: 'text', 
        });
    }

    // Nombre de archivo formateado
    const cleanTitle = (training.title || `capacitacion_${training.id}`)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_");

    doc.save(`${cleanTitle}.pdf`);
};