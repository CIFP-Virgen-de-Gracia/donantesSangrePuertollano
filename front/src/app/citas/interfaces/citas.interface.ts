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


export interface FetchCitasResponse {
    success: boolean;
    citas: Cita[];
    msg: string;
}


export interface CitaMostrar {
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