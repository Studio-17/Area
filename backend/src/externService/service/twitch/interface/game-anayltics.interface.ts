export class DateRange {
  started_at: Date;
  ended_at: Date;
}

export class GameData {
  game_id: string;
  URL: string;
  type: string;
  date_range: DateRange;
}

export class Pagination {
  cursor: string;
}

export class GameAnalyticsObject {
  data: GameData[];
  pagination: Pagination;
}
