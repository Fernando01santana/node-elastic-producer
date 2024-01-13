import { AuthRequest, AuthResponse } from '../dto/auth.dto';

export default interface AuthInterface {
  generateToken(data: AuthRequest): Promise<AuthResponse>;
}
