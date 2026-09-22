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

    const doc = new jsPDF({
        unit: "mm",
        format: "a4",
    });

    const marginX = 14;
    const maxLineWidth = 180; 

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);

    const titleText = training.title || "Detalle de Capacitación";
    // Divide el título si supera los 180mm de ancho
    const titleLines = doc.splitTextToSize(titleText, maxLineWidth);
    
    let currentY = 20;
    doc.text(titleLines, marginX, currentY);

    // Ajustamos la posición Y según la cantidad de renglones que tomó el título
    const titleHeight = titleLines.length * 7; 
    currentY += titleHeight;

    // Subtítulo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    doc.text("Ficha Técnica - RedFOCASE", marginX, currentY);
    currentY += 8;

   
    // 2. TABLA DE DATOS PRINCIPALES

    const tableData = [
        ["Temática", training.thematic?.name || "-"],
        ["Modalidad", training.mode || "-"],
        ["Capacitador/a", training.trainer || "-"],
        ["Fecha de Inicio", training.startDate || "-"],
        ["Provincia", training.province?.name || "-"]
    ];

    autoTable(doc, {
        startY: currentY,
        margin: { left: marginX, right: marginX, top: 15, bottom: 20 },
        head: [["Campo", "Detalle"]],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [52, 58, 64] },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 45 },
            1: { cellWidth: 'auto' }
        }
    });

    currentY = doc.lastAutoTable.finalY + 12;


    // 3. DESCRIPCIÓN CON MÁRGENES Y SALTO DE PÁGINA

    if (training.description) {
        // Verificar si la cabecera de "Descripción" entra en la página actual
        if (currentY + 15 > 270) { 
            doc.addPage();
            currentY = 20; // Margen superior en la nueva página
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text("Descripción / Programa:", marginX, currentY);
        currentY += 4;

        // Limpiar/parsear HTML básico (convertir <br> y <p> en saltos de línea para que no rompa el layout)
        const tempDiv = document.createElement("div");
        tempDiv.style.width = "170mm";
        tempDiv.style.fontFamily = "helvetica, sans-serif";
        tempDiv.style.fontSize = "10pt";
        tempDiv.style.lineHeight = "1.4";
        tempDiv.style.color = "#212529";
        tempDiv.innerHTML = training.description;

        await doc.html(tempDiv, {
            x: marginX,
            y: currentY,
            width: 170,
            windowWidth: 650,
            // Definición estricta de márgenes superior e inferior en los saltos de página
            margin: [20, 14, 20, 14], 
            autoPaging: 'text',
        });
    }


    // 4. GUARDAR ARCHIVO
    
    const cleanTitle = (training.title || `capacitacion_${training.id}`)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_");

    doc.save(`${cleanTitle}.pdf`);
};