export interface RegisterUserDto {
  username: string;
  password: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface JWTDecoded {
  authorities: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  username: string;
}

export interface LoginSuccessDto {
  username: string;
  authorities: string[];
  isAuthenticated: boolean;
}
