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

    // ==========================================
    // 1. TÍTULO DINÁMICO
    // ==========================================
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);

    const titleText = training.title || "Detalle de Capacitación";
    const titleLines = doc.splitTextToSize(titleText, maxLineWidth);
    
    let currentY = 20;
    doc.text(titleLines, marginX, currentY);

    const titleHeight = titleLines.length * 7; 
    currentY += titleHeight;

    // Subtítulo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    currentY += 8;

    // ==========================================
    // 2. TABLA DE DATOS PRINCIPALES
    // ==========================================
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

    currentY = doc.lastAutoTable.finalY + 4;

    // ==========================================
    // 3. RENDERIZADO FLUIDO DEL TEXTO HTML SIN DESFASE
    // ==========================================
    if (training.description) {
        if (currentY + 15 > 270) { 
            doc.addPage();
            currentY = 20;
        }

        const container = document.createElement("div");
        container.style.width = "180mm";
        container.style.boxSizing = "border-box";
        container.style.fontFamily = "Helvetica, Arial, sans-serif";
        container.style.fontSize = "10pt";
        container.style.lineHeight = "1.4";
        container.style.color = "#212529";

        // Incluimos el título Y el contenido dentro del mismo HTML
        container.innerHTML = `
            <h4 class="pdf-section-title">Descripción / Programa:</h4>
            <div class="pdf-content">${training.description}</div>
        `;

        const style = document.createElement("style");
        style.innerHTML = `
            * {
                box-sizing: border-box !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .pdf-section-title {
                font-family: Helvetica, Arial, sans-serif !important;
                font-size: 11pt !important;
                font-weight: bold !important;
                color: #000000 !important;
                margin-bottom: 6px !important; /* 👈 ACÁ CONTROLÁS LA DISTANCIA CON EL TEXTO (puedes poner 4px, 6px, 8px) */
                display: block !important;
            }
            .pdf-content p {
                margin-bottom: 8px !important;
                line-height: 1.4 !important;
            }
            strong, b {
                font-weight: bold !important;
                display: inline !important;
            }
            em, i {
                font-style: italic !important;
                display: inline !important;
            }
            u {
                text-decoration: underline !important;
                display: inline !important;
            }
            s, strike {
                text-decoration: line-through !important;
                display: inline !important;
            }
            a {
                color: #0d6efd !important;
                text-decoration: underline !important;
                display: inline !important;
            }
        `;
        container.appendChild(style);

        document.body.appendChild(container);

        try {
            await doc.html(container, {
                x: marginX,
                y: currentY,
                width: 180,
                windowWidth: 700,
                margin: [5, 14, 20, 0], 
                autoPaging: 'text',
            });
        } finally {
            document.body.removeChild(container);
        }
    }

    // ==========================================
    // 4. GUARDAR ARCHIVO
    // ==========================================
    const cleanTitle = (training.title || `capacitacion_${training.id}`)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_");

    doc.save(`${cleanTitle}.pdf`);
};