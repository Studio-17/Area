export class UserObject {
  id: string;
  username: string;
  display_name?: any;
  avatar: string;
  avatar_decoration?: any;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner?: any;
  banner_color: string;
  accent_color: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  email: string;
  verified: boolean;
}
