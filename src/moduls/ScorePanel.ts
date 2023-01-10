//定义记分牌类
class ScorePanel {
  score: number = 0;
  level: number = 1;
  //设置难度
  upScore: number; //到达多少分的时候升一级
  maxLevel: number; //最大等级
  scoreElement: HTMLElement;
  levelElement: HTMLElement;
  //设置maxLevel的默认值为9
  constructor(maxLevel: number = 9, upScore: number = 10) {
    this.scoreElement = document.getElementById("score")!;
    this.levelElement = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }
  ChangeScore() {
    this.scoreElement.innerHTML = `SCORE:${++this.score}`;
    if (this.score % this.upScore == 0 && this.score != 0) {
      this.ChangeLevel();
    }
  }
  ChangeLevel() {
    if (this.level < this.maxLevel) {
      this.levelElement.innerHTML = `LEVEL:${++this.level}`;
    } else {
      this.levelElement.innerHTML = `LEVEL:MAX`;
    }
  }
}
export default ScorePanel;
