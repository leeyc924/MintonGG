function factorial(n: number) {
  if (n === 0) {
    return 1;
  }

  return n * factorial(n - 1);
}

function combination(n: number, k: number) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

function algorithm() {
  /**
   * 시나리오
   * 1. 가장 처음 시작하는 유저 4명 선택
   * 2. 제외 대상 (유저 컨디션 고려) 선택 후, 가중치를 두어 다음 4명의 유저 랜덤 선별 4명이 안된다면 1.의 유저 중 선별
   * 선별 우선순위
   * a. 전판경기를 하지않았으며 가장적게 경기한 유저
   * b. 경기력이 많을수록 후순위
   * c. 관리자의 직접적인 선별
   * 가중치 기준 ??
   */
}

export default algorithm;
