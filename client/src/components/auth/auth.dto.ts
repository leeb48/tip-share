export interface RegisterUserDto {
  email: string;
  username: string;
  password: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface JWTDecoded {
  userId: number;
  authorities: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  username: string;
}

export interface LoginSuccessDto {
  userId: number;
  username: string;
  authorities: string[];
  isAuthenticated: boolean;
}
