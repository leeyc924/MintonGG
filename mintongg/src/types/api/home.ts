import { User } from '.';

export interface NewUserListResponse {
  /**
   * 신규 user 목록
   */
  userList: Record<
    string,
    {
      id: User['id'];
      full_name: string;
      join_dt: string;
    }[]
  >;
}

export interface BestUserListResponse {
  userList: {
    id: User['id'];
    full_name: string;
    play_count: number;
  }[];
}
