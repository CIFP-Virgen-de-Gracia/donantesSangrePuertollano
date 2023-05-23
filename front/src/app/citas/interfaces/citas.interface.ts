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
    cancelada: boolean;
}


export interface CitaAdmin {
    id: string;
    fecha: string;
    donacion: string;
    cancelada: boolean;
    asistida: number;
    user : {
        id: string;
        nombre: string;
    }
}


export interface FetchCitasResponse {
    success: boolean;
    citas: Cita[];
    msg: string;
}


export interface FetchCitasAdminResponse {
    success: boolean;
    citas: CitaAdmin[];
    msg: string;
}


export interface CitaMostrar {
    id: string;
    dia: string;
    hora: string;
    donacion: string;
    cancelada: boolean;
} 


export interface CitaAdminMostrar {
    id: string;
    dia: string;
    hora: string;
    donacion: string;
    cancelada: boolean;
    asistida: number;
    user: {
        id: string;
        nombre: string;
    }
}


export interface CitaAdminPendienteMostrar {
    id: string;
    dia: string;
    hora: string;
    donacion: string;
    cancelada: boolean;
}


export interface CancelarCitaResponse {
    success: boolean;
    msg: string;
}


export interface getHoraCitaResponse {
    success: boolean;
    horas: string[];
}