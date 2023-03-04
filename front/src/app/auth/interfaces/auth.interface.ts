export interface UserLogin {
    email: string;
    passwd: string;
}

export interface UserRegsitro {
    email: string;
    nombre: string;
    passwd: string;
}

export interface NombreCompleto {
    nombre: string;
    ap1: string;
    ap2: string;
}

export interface Auth {
    success: boolean;
    data: {
        id: number;
        nombre: string;
        token: string;
    }
    msg: string;
}

export interface registroResponse {
    success: boolean;
    msg: string;
}

export interface solicitarRecPasswdResponse {
    success: boolean;
    id: number;
    msg: string;
}

export interface recPasswdResponse {
    success: boolean;
    msg: string;
}