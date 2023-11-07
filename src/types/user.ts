export interface User {
  name: string;
  tier: number;
  gender: string;
  id: string;
}

export interface GameUser extends User {
  gameCount: number;
  win: number;
  lose: number;
  winRate: number;
}
