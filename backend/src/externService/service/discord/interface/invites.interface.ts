export class Guild {
  id: string;
  name: string;
  splash: string;
  banner?: any;
  description?: any;
  icon: string;
  features: string[];
  verification_level: number;
  vanity_url_code?: any;
  premium_subscription_count: number;
  nsfw: boolean;
  nsfw_level: number;
}

export class Channel {
  id: string;
  name: string;
  type: number;
}

export class Inviter {
  id: string;
  username: string;
  display_name?: any;
  avatar: string;
  avatar_decoration?: any;
  discriminator: string;
  public_flags: number;
}

export class InviteObject {
  code: string;
  type: number;
  expires_at: Date;
  guild: Guild;
  channel: Channel;
  inviter: Inviter;
  uses: number;
  max_uses: number;
  max_age: number;
  temporary: boolean;
  created_at: Date;
}

export class GuildInvites {
  invites: InviteObject[];
}
