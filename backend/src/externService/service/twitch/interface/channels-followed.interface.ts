export class ChannelData {
  broadcaster_id: string;
  broadcaster_login: string;
  broadcaster_name: string;
  followed_at: Date;
}

export class Pagination {
  cursor: string;
}

export class ChannelsFollowedObject {
  total: number;
  data: ChannelData[];
  pagination: Pagination;
}
