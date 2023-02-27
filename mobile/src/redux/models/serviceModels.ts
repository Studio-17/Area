export type Service = {
  name: string;
  description: string;
  color: string;
};

export type ServiceInfo = {
  name: string;
  type: "external" | "internal";
  isConnected: boolean;
  description: string;
  color: string;
};

interface Images {
  [key: string]: any;
}

export const images: Images = {
  deezer: require("../../assets/services/deezer.png"),
  discord: require("../../assets/services/discord.png"),
  dropbox: require("../../assets/services/dropbox.png"),
  github: require("../../assets/services/github.png"),
  google: require("../../assets/services/google.png"),
  miro: require("../../assets/services/miro.png"),
  notion: require("../../assets/services/notion.png"),
  spotify: require("../../assets/services/spotify.png"),
  twitch: require("../../assets/services/twitch.png"),
  typeform: require("../../assets/services/typeform.png"),
  loading: require("../../assets/services/loading.png"),
};
