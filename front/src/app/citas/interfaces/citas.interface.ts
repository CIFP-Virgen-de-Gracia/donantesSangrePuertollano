export interface CitasReservadasHorasResponse {
    sucess: boolean;
    fecha: string;
    hora: string;
}

export interface HorarioCitasResponse {
    success: boolean;
    horas: string[];
}

export interface SuccessMsgResponse {
    success: boolean;
    msg: string;
}


export interface Cita {
    id: string;
    fecha: string;
    donacion: string;
}

export interface fetchCitaPendienteResponse {
    success: boolean;
    cita: Cita;
    msg: string;
}


export interface fetchCitasPasadasResponse {
    success: boolean;
    citas: Cita[];
    msg: string;
}