// Fechas de referencia
const fechaCero = new Date(2025, 3, 25); // 25/04/2025 (mes 3 porque enero=0, actualizado según última ecografía)
const fechaNacimiento = new Date(2026, 0, 30); // 30/01/2026
const semanasTotales = 40;

// Hitos del desarrollo del bebé por semana
const hitosDesarrollo = {
    1: "¡Comienza la aventura! El óvulo es fecundado y comienza a dividirse.",
    2: "El óvulo fecundado se implanta en el útero. El bebé es del tamaño de una semilla de amapola.",
    3: "Se forma el disco embrionario. El corazón primitivo comienza a latir.",
    4: "El embrión mide 1-2 mm (grano de arena). Se forman los primeros órganos y el sistema nervioso.",
    5: "El bebé mide 4-5 mm (semilla de sésamo). El corazón late regularmente y se forman los brazos y piernas.",
    6: "El bebé mide 6-7 mm (grano de arroz). Se desarrollan los ojos, oídos y nariz.",
    7: "El bebé mide 10-12 mm (arándano). Los brazos y piernas se alargan y aparecen los dedos.",
    8: "El bebé mide 14-16 mm (poroto). Todos los órganos principales están formados.",
    9: "El bebé mide 22-24 mm (uva chica). Los genitales comienzan a diferenciarse.",
    10: "El bebé mide 31-35 mm (nuez pelada). Los huesos se endurecen y el bebé puede moverse.",
    11: "El bebé mide 41-44 mm (ciruela chica). Los órganos genitales se definen completamente.",
    12: "El bebé mide 53-60 mm (limón chico). Los riñones comienzan a funcionar.",
    13: "El bebé mide 65-78 mm (durazno chico). Los huesos del cráneo se fusionan.",
    14: "El bebé mide 85-90 mm (mandarina chica). El bebé puede hacer movimientos de succión.",
    15: "El bebé mide 100-105 mm (manzana chica). El bebé puede hacer movimientos de respiración.",
    16: "El bebé mide 110-120 mm (palta chica). Los ojos pueden moverse y el bebé responde a la luz.",
    17: "El bebé mide 120-130 mm (pera mediana). El bebé puede oír sonidos del exterior.",
    18: "El bebé mide 140 mm (morrón mediano). El bebé puede hacer movimientos de deglución.",
    19: "El bebé mide 150 mm (tomate grande). Se forma el vérnix caseoso (grasa protectora).",
    20: "¡Mitad del embarazo! El bebé mide 160 mm (banana chica). Puedes sentir sus movimientos.",
    21: "El bebé mide 190 mm (zanahoria grande). El bebé puede distinguir sabores del líquido amniótico.",
    22: "El bebé mide 210 mm (choclo grande). Los párpados se abren y cierran.",
    23: "El bebé mide 220 mm (pepino grande). El bebé puede hacer movimientos de respiración rítmica.",
    24: "El bebé mide 230 mm (berenjena mediana). Los pulmones producen surfactante.",
    25: "El bebé mide 240 mm (morrón alargado). El bebé responde a sonidos y voces familiares.",
    26: "El bebé mide 350 mm (lechuga criolla). Los ojos se abren completamente.",
    27: "El bebé mide 360 mm (termo de litro). El bebé puede soñar (fase REM).",
    28: "El bebé mide 370 mm (zapallo anco chico). El bebé puede distinguir entre luz y oscuridad.",
    29: "El bebé mide 380 mm (melón). Los huesos se endurecen más, excepto el cráneo.",
    30: "El bebé mide 390 mm (repollo grande). El bebé puede hacer movimientos de respiración coordinados.",
    31: "El bebé mide 410 mm (coco). Los pulmones están casi completamente desarrollados.",
    32: "El bebé mide 420 mm (ananá). El bebé puede distinguir diferentes sabores.",
    33: "El bebé mide 430 mm (pelota de vóley). El sistema inmunológico se fortalece.",
    34: "El bebé mide 450 mm (zapallo grande). Los pulmones están completamente desarrollados.",
    35: "El bebé mide 460 mm (pelota de básquet chica). El bebé gana peso rápidamente.",
    36: "El bebé mide 470 mm (pelota de fútbol). El bebé se posiciona para el nacimiento.",
    37: "El bebé mide 480 mm (pelota de handball). El bebé se considera a término temprano.",
    38: "El bebé mide 490 mm (pelota de rugby chica). El bebé está completamente desarrollado.",
    39: "El bebé mide 500 mm (sandía grande). El bebé está listo para nacer en cualquier momento.",
    40: "¡Semana del nacimiento! El bebé está completamente desarrollado y listo para conocer el mundo."
};

function calcularTiempoCompleto(fechaInicio, fechaFin) {
    const diferencia = fechaFin - fechaInicio;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    
    // Calcular meses
    let meses = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 + 
                (fechaFin.getMonth() - fechaInicio.getMonth());
    
    // Ajustar días
    let diasAjustados = fechaFin.getDate() - fechaInicio.getDate();
    if (diasAjustados < 0) {
        meses--;
        const mesAnterior = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), 0);
        diasAjustados += mesAnterior.getDate();
    }
    
    // Calcular semanas restantes después de los meses
    const diasRestantes = dias - (meses * 30); // Aproximación
    const semanas = Math.floor(diasRestantes / 7);
    const diasFinales = diasRestantes % 7;
    
    return { meses: Math.max(0, meses), semanas: Math.max(0, semanas), dias: Math.max(0, diasFinales) };
}

function formatearTiempo(tiempo) {
    let resultado = '';
    if (tiempo.meses > 0) {
        resultado += `${tiempo.meses} mes${tiempo.meses !== 1 ? 'es' : ''}`;
    }
    if (tiempo.semanas > 0) {
        if (resultado) resultado += ', ';
        resultado += `${tiempo.semanas} semana${tiempo.semanas !== 1 ? 's' : ''}`;
    }
    if (tiempo.dias > 0) {
        if (resultado) resultado += ' y ';
        resultado += `${tiempo.dias} día${tiempo.dias !== 1 ? 's' : ''}`;
    }
    return resultado;
}

function obtenerHitoDesarrollo(semana) {
    if (semana <= 0) return "¡El embarazo está por comenzar!";
    if (semana > 40) return "¡El bebé ya debería haber nacido!";
    return hitosDesarrollo[semana] || "Información no disponible para esta semana.";
}

function actualizarContadores() {
    const hoy = new Date();

    // 1. Tiempo juntos (transcurrido)
    const msTranscurridos = hoy - fechaCero;
    const diasTranscurridos = Math.floor(msTranscurridos / (1000 * 60 * 60 * 24));
    const semanasTranscurridas = Math.floor(diasTranscurridos / 7);
    const diasRestantesSemana = diasTranscurridos % 7;
    
    document.querySelector('#transcurrido .valor').textContent = `${semanasTranscurridas} semanas y ${diasRestantesSemana} días`;
    
    // Calcular tiempo completo transcurrido
    const tiempoTranscurrido = calcularTiempoCompleto(fechaCero, hoy);
    document.querySelector('#transcurrido .valor-secundario').textContent = formatearTiempo(tiempoTranscurrido);

    // 2. Tiempo que falta para conocernos
    const semanasRestantes = Math.max(0, semanasTotales - semanasTranscurridas - (diasRestantesSemana > 0 ? 1 : 0));
    document.querySelector('#restante .valor').textContent = `${semanasRestantes} semanas`;
    
    // Calcular tiempo completo restante
    const fechaEstimada = new Date(fechaCero);
    fechaEstimada.setDate(fechaCero.getDate() + (semanasTotales * 7));
    const tiempoRestante = calcularTiempoCompleto(hoy, fechaEstimada);
    document.querySelector('#restante .valor-secundario').textContent = formatearTiempo(tiempoRestante);

    // 3. Desarrollo del bebé
    const semanaActual = Math.max(0, semanasTranscurridas);
    document.querySelector('#desarrollo-bebe .semana-actual').textContent = `Semana ${semanaActual} de embarazo`;
    document.querySelector('#desarrollo-bebe .hito-desarrollo').textContent = obtenerHitoDesarrollo(semanaActual);
}

document.addEventListener('DOMContentLoaded', actualizarContadores); 