export const formatErrors = (errors) => {
        const formattedErrors = {};

        Object.keys(errors).forEach((key) => {
            const keys = key.split("."); // Divide "province.name" en ["province", "name"]

            if (keys.length > 1) {
                if (!formattedErrors[keys[0]]) {
                    formattedErrors[keys[0]] = {}; // Crea el objeto si no existe
                }
                formattedErrors[keys[0]][keys[1]] = errors[key]; // Guarda el mensaje dentro del objeto anidado
            } else {
                formattedErrors[key] = errors[key]; // Si no está anidado, lo guarda normal
            }
        });
        return formattedErrors;
    };