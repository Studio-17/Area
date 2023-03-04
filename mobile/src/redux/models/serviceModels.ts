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
  deezer: require("../../assets/images/services/deezer.png"),
  discord: require("../../assets/images/services/discord.png"),
  dropbox: require("../../assets/images/services/dropbox.png"),
  github: require("../../assets/images/services/github.png"),
  google: require("../../assets/images/services/google.png"),
  miro: require("../../assets/images/services/miro.png"),
  notion: require("../../assets/images/services/notion.png"),
  spotify: require("../../assets/images/services/spotify.png"),
  twitch: require("../../assets/images/services/twitch.png"),
  typeform: require("../../assets/images/services/typeform.png"),
  timer: require("../../assets/images/services/timer.png"),
  loading: require("../../assets/images/services/loading.png"),
  google_event: require("../../assets/images/services/google_event.png"),
  google_forms: require("../../assets/images/services/google_forms.png"),
  google_mail: require("../../assets/images/services/google_mail.png"),
  google_suite: require("../../assets/images/services/google_suite.png"),
};
