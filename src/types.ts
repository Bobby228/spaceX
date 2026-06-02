export type Launch = {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_utc: string;

  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
  };

  links: {
    mission_patch: string;
    article_link: string | null;
    video_link: string | null;
  };

  details: string | null;
  launch_success: boolean | null;
};

export type State = {
  launches: Launch[];
  isOpen: boolean;
  selectedLaunch: Launch | null;
  error: string | null;
};

export type Action =
  | {
  type: 'set_launches';
  payload: Launch[];
}
  | {
  type: 'open_modal';
  payload: Launch;
}
  | {
  type: 'close_modal';
}
  | {
  type: 'set_error';
  payload: string
};