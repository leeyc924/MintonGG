import { User } from '.';

/**
 * 0 구로 누리
 * 1 영등포
 * 2 미성
 */
export type Place = 0 | 1 | 2;
/**
 * 경기한 시간
 * 1 ~ 4 부
 */
export type Part = 1 | 2 | 3 | 4;

export interface Game {
  /**
   * 경기 일자 (월)
   */
  playMonth: string;
  /**
   * 경기 일자 (일)
   */
  playDay: string;
  /**
   * 경기 일자
   */
  playDt: string;
  /**
   * 경기 시간
   */
  playPart: Part;
  /**
   * 참여 유저 목록
   */
  userIdList: string[];
  /**
   * 게임 장소
   */
  place: Place;
  /**
   * TODO) ttl 3개월 db에 기능있는지 확인
   * */
  ttl?: string;
}

export interface GameListRequest {
  playDt: string;
}

export interface GameListResponse {
  gameList: {
    play_dt: string;
    id: User['id'];
    full_name: string;
  }[];
}

export interface GameDetailRequest {
  playDt: string;
}

export interface GameDetailResponse {
  userList: {
    id: User['id'];
    full_name: string;
  }[];
  gameList: {
    playDt: string;
    playPart: number;
    userList: {
      id: User['id'];
      full_name: string;
    }[];
  }[];
}

export interface GameAddRequest {
  play_dt: string;
  userids: User['id'][];
}

export interface GameRemoveRequest {
  play_dt: string;
  userids: User['id'][];
}
