export class SoundTrackObject {
  title: string;
  id: string;
  image_url: string;
  description: string;
}

export class Pagination {
  cursor: string;
}

export class SoundTrackPlaylistObject {
  data: SoundTrackObject[];
  pagination: Pagination;
}
