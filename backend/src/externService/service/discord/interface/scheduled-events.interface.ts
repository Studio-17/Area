export class Creator {
  id: string;
  username: string;
  display_name?: any;
  avatar: string;
  avatar_decoration?: any;
  discriminator: string;
  public_flags: number;
}

export class ScheduledEventObject {
  id: string;
  guild_id: string;
  channel_id: string;
  creator_id: string;
  name: string;
  description: string;
  image?: any;
  scheduled_start_time: Date;
  scheduled_end_time?: any;
  privacy_level: number;
  status: number;
  entity_type: number;
  entity_id?: any;
  entity_metadata?: any;
  sku_ids: any[];
  creator: Creator;
}

export class GuildScheduledEvents {
  scheduled_events: ScheduledEventObject[];
}

export class ScheduledEventResponseObject {
  id: string;
  guild_id: string;
  channel_id: string;
  creator_id: string;
  name: string;
  description: string;
  image?: any;
  scheduled_start_time: Date;
  scheduled_end_time: Date;
  privacy_level: number;
  status: number;
  entity_type: number;
  entity_id?: any;
  entity_metadata?: any;
  sku_ids: any[];
}
