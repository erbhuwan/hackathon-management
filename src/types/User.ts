export default interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  lastOnlineAt: string;
  isAccountLocked?: boolean;
  isCredentialsExpired?: boolean;
  isEnabled: boolean;
  isOnline: boolean;
  lastLoggedInAt: string;
  timeZone: string;
  createdAt: string;
  updatedAt: string;
}
