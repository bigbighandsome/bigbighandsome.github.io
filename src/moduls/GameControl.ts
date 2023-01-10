import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import e from "express";
class GameContor {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  dir: string;
  canPlay: boolean = true;
  up: HTMLElement;
  down: HTMLElement;
  left: HTMLElement;
  right: HTMLElement;
  //   clickNumber: number = 0; //1上，2下，3左，4右
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2);
    this.dir = "";
    this.up = document.getElementById("up")!;
    this.down = document.getElementById("down")!;
    this.left = document.getElementById("left")!;
    this.right = document.getElementById("right")!;
    this.init();
  }
  //初始化游戏
  init() {
    document.addEventListener("keydown", this.keyDownHandler.bind(this));
    document.addEventListener("click", this.mouseDownHandler.bind(this));
    this.Run();
  }
  /**
     * 
     *  ArrowUp
        ArrowDown
        ArrowLeft
        ArrowRight
    */
  keyDownHandler(e: KeyboardEvent) {
    if (
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Up" ||
      e.key === "Down" ||
      e.key === "Left" ||
      e.key === "Right"
    ) {
      this.dir = e.key;
    }
  }
  mouseDownHandler(e: MouseEvent) {
    let event = e.target!;
    if (event === this.up) {
      this.dir = "ArrowUp";
    } else if (event === this.down) {
      this.dir = "ArrowDown";
    } else if (event === this.left) {
      this.dir = "ArrowLeft";
    } else if (event === this.right) {
      this.dir = "ArrowRight";
    }
  }
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.ChangePosition();
      this.snake.addBody();
      this.scorePanel.ChangeScore();
    }
  }
  Run() {
    let X = this.snake.X;
    let Y = this.snake.Y;
    this.checkEat(X, Y);
    //0右侧，90下侧，180左侧，270上侧
    switch (this.dir) {
      case "ArrowUp":
        "Up";
        Y -= 10;
        this.snake.head.style.transform = "rotate(270deg)";
        break;
      case "ArrowDown":
        "Down";
        "2";
        Y += 10;
        this.snake.head.style.transform = "rotate(90deg)";
        break;
      case "ArrowLeft":
        "Left";
        "3";
        X -= 10;
        this.snake.head.style.transform = "rotate(180deg)";
        break;
      case "ArrowRight":
        "Right";
        "4";
        X += 10;
        this.snake.head.style.transform = "rotate(0deg)";
        break;
    }
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      this.canPlay = false;
      alert(`${e.message} GAME OVER!`);
      window.location.reload();
    }
    this.canPlay &&
      setTimeout(this.Run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }
}
export default GameContor;
