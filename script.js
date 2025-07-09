// Fechas de referencia
const fechaCero = new Date(2025, 4, 11); // 11/05/2025 (mes 4 porque enero=0)
const fechaNacimiento = new Date(2026, 0, 30); // 30/01/2026
const semanasTotales = 40;

function actualizarContadores() {
    const hoy = new Date();

    // 1. Semanas y días transcurridos
    const msTranscurridos = hoy - fechaCero;
    const diasTranscurridos = Math.floor(msTranscurridos / (1000 * 60 * 60 * 24));
    const semanasTranscurridas = Math.floor(diasTranscurridos / 7);
    const diasRestantesSemana = diasTranscurridos % 7;
    document.querySelector('#transcurrido .valor').textContent = `${semanasTranscurridas} semanas y ${diasRestantesSemana} días`;

    // 2. Semanas restantes
    const semanasRestantes = Math.max(0, semanasTotales - semanasTranscurridas - (diasRestantesSemana > 0 ? 1 : 0));
    document.querySelector('#restante .valor').textContent = `${semanasRestantes} semanas`;

    // 3. Días y meses faltantes para el nacimiento
    let msFaltantes = fechaNacimiento - hoy;
    msFaltantes = Math.max(0, msFaltantes);
    const diasFaltantes = Math.floor(msFaltantes / (1000 * 60 * 60 * 24));
    // Calcular meses y días restantes
    let meses = (fechaNacimiento.getFullYear() - hoy.getFullYear()) * 12 + (fechaNacimiento.getMonth() - hoy.getMonth());
    let dias = fechaNacimiento.getDate() - hoy.getDate();
    if (dias < 0) {
        meses--;
        // Obtener días del mes anterior
        const mesAnterior = new Date(fechaNacimiento.getFullYear(), fechaNacimiento.getMonth(), 0);
        dias += mesAnterior.getDate();
    }
    meses = Math.max(0, meses);
    dias = Math.max(0, dias);
    document.querySelector('#falta-nacimiento .valor').textContent = `${meses} meses y ${dias} días (${diasFaltantes} días)`;
}

document.addEventListener('DOMContentLoaded', actualizarContadores); 