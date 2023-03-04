export class Author {
  id: string;
  username: string;
  display_name?: any;
  avatar?: any;
  avatar_decoration?: any;
  discriminator: string;
  public_flags: number;
  bot: boolean;
}

export class MessageCreatedObject {
  id: string;
  type: number;
  content: string;
  channel_id: string;
  author: Author;
  attachments: any[];
  embeds: any[];
  mentions: any[];
  mention_roles: any[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  timestamp: Date;
  edited_timestamp?: any;
  flags: number;
  components: any[];
  referenced_message?: any;
}
