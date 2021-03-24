export interface RegisterUserDto {
  username: string;
  password: string;
}

export interface LoginUserDto {
  username: string;
  password: string;
  rememberMe: boolean;
}
