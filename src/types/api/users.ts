import { Gender, User } from '.';

export interface UserWarning {
  /**
   * seqno
   */
  id: string;
  /**
   * 유저 고유 ID
   */
  user_id: string;
  /**
   * 경고 내용
   */
  warning_desc: string;
}

export interface UserListResponse {
  /**
   * user 목록
   */
  userList: {
    id: User['id'];
    full_name: string;
    play_dt: string;
    join_dt: string;
  }[];
}

export interface UserDetailRequest {
  id: User['id'];
}

export interface UserDetailResponse {
  userInfo: User;
}

export interface UserAddRequest {
  /**
   * 유저 이름
   */
  name: string;
  /**
   * 유저 나이
   */
  age: string;
  /**
   * 성별 정보
   * F: 여자
   * M: 남자
   */
  gender: Gender;
  /**
   * 사는 지역
   */
  address: string;
  /**
   * 가입 날짜
   */
  join_dt: string;
}

export interface UserEditRequest {
  /**
   * 유저 고유 ID
   */
  id: number;
  /**
   * 유저 이름
   */
  name: string;
  /**
   * 유저 나이
   */
  age: string;
  /**
   * 성별 정보
   * F: 여자
   * M: 남자
   */
  gender: Gender;
  /**
   * 사는 지역
   */
  address: string;
  /**
   * 가입 날짜
   */
  join_dt: string;
}
