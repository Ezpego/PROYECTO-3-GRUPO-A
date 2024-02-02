export async function llamadaServidor(
    urlObjetivo,
    method,
    opciones,
    formDataToSend
) {
    const urlRaiz = import.meta.env.VITE_REACT_APP_URL_RAIZ;
    try {
        const response = await fetch(urlRaiz + urlObjetivo, {
            method: method,
            headers: opciones,
            body: formDataToSend,
        });
        if (!response.ok) {
            const result = await response.json();
            console.log(result);
            throw new Error(`Error: ${result.status} - ${result.message}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Error en la llamada: ", error.message);
        if (error instanceof Error) {
            throw error;
        } else {
            const data = await error.response.json();
            console.error("Error HTTP: ", data);
            throw data;
        }
    }
}
