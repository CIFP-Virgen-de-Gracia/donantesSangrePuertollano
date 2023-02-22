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