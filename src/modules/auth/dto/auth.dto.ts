export class AuthRequest {
  username: string;
  password: string;
}

export class AuthResponse {
  access_token: string;
  expiresIn: string;
  success: boolean;
}
