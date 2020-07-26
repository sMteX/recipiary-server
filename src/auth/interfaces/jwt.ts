export interface JwtPayload {
    username: string;
}
export interface LoginResult {
    accessToken: string;
    expiresIn: number;
}
