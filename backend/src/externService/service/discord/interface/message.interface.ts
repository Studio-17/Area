export class Author {
  id: string;
  username: string;
  display_name?: any;
  avatar: string;
  avatar_decoration?: any;
  discriminator: string;
  public_flags: number;
  bot: boolean;
}

export class Attachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  content_type: string;
  width?: number;
  height?: number;
}

export class Mention {
  id: string;
  username: string;
  display_name?: any;
  avatar: string;
  avatar_decoration?: any;
  discriminator: string;
  public_flags: number;
}

export class MessageObject {
  id: string;
  type: number;
  content: string;
  channel_id: string;
  author: Author;
  attachments: Attachment[];
  embeds: any[];
  mentions: Mention[];
  mention_roles: any[];
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  timestamp: Date;
  edited_timestamp?: Date;
  flags: number;
  components: any[];
}

export class ChannelMessages {
  messages: MessageObject[];
}
