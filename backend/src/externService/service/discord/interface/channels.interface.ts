export class PermissionOverwrite {
  id: string;
  type: string;
  allow: number;
  deny: number;
  allow_new: string;
  deny_new: string;
}

export class ChannelObject {
  id: string;
  type: number;
  name: string;
  position: number;
  flags: number;
  parent_id: string;
  guild_id: string;
  permission_overwrites: PermissionOverwrite[];
  last_message_id: string;
  topic: string;
  last_pin_timestamp?: Date;
  rate_limit_per_user?: number;
  nsfw?: boolean;
  bitrate?: number;
  user_limit?: number;
  rtc_region?: any;
  default_thread_rate_limit_per_user?: number;
}

export class GuildChannels {
  channels: ChannelObject[];
}
