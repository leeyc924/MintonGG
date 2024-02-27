export interface AuthLoginRequest {
  id: string;
  password: string;
}

export interface AuthLoginResponse {
  accessToken: string;
}
