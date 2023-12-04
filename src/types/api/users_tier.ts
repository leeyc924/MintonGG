import { User } from '.';

/**
 * 유저 티어 정보
 * 0: 알수 없음
 * 1 ~ 5: 1~5 티어
 */
export type Tier = 0 | 1 | 2 | 3 | 4 | 5;

export interface UserTier {
  /**
   * seqno
   */
  id: number;
  /**
   * 유저 티어 정보
   * 0: 알수 없음
   * 1 ~ 5: 1~5 티어
   */
  tier: Tier;
  /**
   * 수정 날짜
   */
  mod_dt: string;
  /**
   * user 고유 id
   */
  user_id: string;
}

export interface UserTierListResponse {
  /**
   * user tier 목록
   */
  userList: {
    id: UserTier['id'];
    name: User['name'];
    age: User['age'];
    address: User['address'];
    gender: User['gender'];
    tier: UserTier['tier'];
  }[];
}
