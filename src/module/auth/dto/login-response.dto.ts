export class LoginResponseDto {
  accessToken: string;
  user: {
    email: string;
    id: string;
    role: string;
    name: string;
  };
}
