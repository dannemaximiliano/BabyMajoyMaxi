// Fechas de referencia
const fechaCero = new Date(2025, 4, 11); // 11/05/2025 (mes 4 porque enero=0)
const fechaNacimiento = new Date(2026, 0, 30); // 30/01/2026
const semanasTotales = 40;

// Hitos del desarrollo del bebé por semana
const hitosDesarrollo = {
    1: "¡Comienza la aventura! El óvulo es fecundado y comienza a dividirse.",
    2: "El óvulo fecundado se implanta en el útero. El bebé es del tamaño de una semilla de amapola.",
    3: "Se forma el disco embrionario. El corazón primitivo comienza a latir.",
    4: "El embrión mide 1-2 mm. Se forman los primeros órganos y el sistema nervioso.",
    5: "El bebé mide 2-3 mm. El corazón late regularmente y se forman los brazos y piernas.",
    6: "El bebé mide 4-5 mm. Se desarrollan los ojos, oídos y nariz.",
    7: "El bebé mide 7-9 mm. Los brazos y piernas se alargan y aparecen los dedos.",
    8: "El bebé mide 11-14 mm. Todos los órganos principales están formados.",
    9: "El bebé mide 16-18 mm. Los genitales comienzan a diferenciarse.",
    10: "El bebé mide 22-24 mm. Los huesos se endurecen y el bebé puede moverse.",
    11: "El bebé mide 28-30 mm. Los órganos genitales se definen completamente.",
    12: "El bebé mide 35-40 mm. Los riñones comienzan a funcionar.",
    13: "El bebé mide 45-50 mm. Los huesos del cráneo se fusionan.",
    14: "El bebé mide 55-60 mm. El bebé puede hacer movimientos de succión.",
    15: "El bebé mide 65-70 mm. El bebé puede hacer movimientos de respiración.",
    16: "El bebé mide 75-80 mm. Los ojos pueden moverse y el bebé responde a la luz.",
    17: "El bebé mide 85-90 mm. El bebé puede oír sonidos del exterior.",
    18: "El bebé mide 95-100 mm. El bebé puede hacer movimientos de deglución.",
    19: "El bebé mide 105-110 mm. Se forma el vérnix caseoso (grasa protectora).",
    20: "¡Mitad del embarazo! El bebé mide 115-120 mm. Puedes sentir sus movimientos.",
    21: "El bebé mide 125-130 mm. El bebé puede distinguir sabores del líquido amniótico.",
    22: "El bebé mide 135-140 mm. Los párpados se abren y cierran.",
    23: "El bebé mide 145-150 mm. El bebé puede hacer movimientos de respiración rítmica.",
    24: "El bebé mide 155-160 mm. Los pulmones producen surfactante.",
    25: "El bebé mide 165-170 mm. El bebé responde a sonidos y voces familiares.",
    26: "El bebé mide 175-180 mm. Los ojos se abren completamente.",
    27: "El bebé mide 185-190 mm. El bebé puede soñar (fase REM).",
    28: "El bebé mide 195-200 mm. El bebé puede distinguir entre luz y oscuridad.",
    29: "El bebé mide 205-210 mm. Los huesos se endurecen más, excepto el cráneo.",
    30: "El bebé mide 215-220 mm. El bebé puede hacer movimientos de respiración coordinados.",
    31: "El bebé mide 225-230 mm. Los pulmones están casi completamente desarrollados.",
    32: "El bebé mide 235-240 mm. El bebé puede distinguir diferentes sabores.",
    33: "El bebé mide 245-250 mm. El sistema inmunológico se fortalece.",
    34: "El bebé mide 255-260 mm. Los pulmones están completamente desarrollados.",
    35: "El bebé mide 265-270 mm. El bebé gana peso rápidamente.",
    36: "El bebé mide 275-280 mm. El bebé se posiciona para el nacimiento.",
    37: "El bebé mide 285-290 mm. El bebé se considera a término temprano.",
    38: "El bebé mide 295-300 mm. El bebé está completamente desarrollado.",
    39: "El bebé mide 305-310 mm. El bebé está listo para nacer en cualquier momento.",
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