// services/reportesService.js

// 🔴 CORRECCIÓN: Se elimina el prefijo "/api" ya que el backend lo sirve directamente desde la raíz.
const API_BASE_URL = "https://proyecto-concesionaria-1.onrender.com"; 

/**
 * Función genérica para manejar la respuesta de la API.
 * @param {Response} response - Objeto de respuesta Fetch.
 * @returns {Promise<Object>} - El JSON de la respuesta o lanza un error descriptivo.
 */
const handleResponse = async (response) => {
    const responseClone = response.clone();
    let data;
    try {
        data = await response.json();
    } catch (e) {
        const textError = await responseClone.text();
        const firstLine = textError.substring(0, 100);
        throw new Error(`El servidor no devolvió JSON. El mensaje de error fue: ${firstLine}... (Código HTTP: ${response.status})`);
    }

    if (!response.ok) {
        const errorMessage = data.error || `Error ${response.status}: Ha ocurrido un problema en el servidor.`;
        throw new Error(errorMessage);
    }
    
    return data;
};

/**
 * REPORTE 1: Vehículos con más alquileres.
 * GET /reporte/?tipo=vehiculos_mas_alquilados
 */
export const getReporteVehiculosMasAlquileres = async () => {
    const response = await fetch(`${API_BASE_URL}/reporte/?tipo=vehiculos_mas_alquilados`);
    const data = await handleResponse(response);
    return data.reporte; 
};

/**
 * REPORTE 2: Facturación mensual.
 * GET /reporte/?tipo=facturacion_mensual
 */
export const getReporteFacturacionMensual = async () => {
    const response = await fetch(`${API_BASE_URL}/reporte/?tipo=facturacion_mensual`);
    const data = await handleResponse(response);
    return data.reporte_facturacion;
};

/**
 * REPORTE 3: Alquileres por período de fechas.
 * GET /reporte/?tipo=alquileres_periodo&fecha_inicio=AAAA-MM-DD&fecha_fin=AAAA-MM-DD
 */
export const getReporteAlquileresPorPeriodo = async (fechaInicio, fechaFin) => {
    if (!fechaInicio || !fechaFin) {
        throw new Error("Debe especificar una fecha de inicio y una fecha de fin.");
    }

    const url = `${API_BASE_URL}/reporte/?tipo=alquileres_periodo&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
    const response = await fetch(url);
    const data = await handleResponse(response);
    return data.alquileres;
};