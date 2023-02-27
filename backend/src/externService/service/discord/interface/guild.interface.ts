export class GuildObject {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: any;
  features: string[];
  permissions_new: string;
}

export class UserGuilds {
  guilds: GuildObject[];
}
