export interface UserLogin {
    email: string;
    passwd: string;
}

export interface Auth {
    success: boolean;
    data: {
        id: number;
        token: string;
    }
    msg: string;
}