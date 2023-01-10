import Food from "./Food";
class Snake {
  food: Food;
  snakeElement: HTMLElement;
  head: HTMLElement;
  bodies: HTMLCollection;
  stage: HTMLElement;
  constructor() {
    this.food = new Food();
    this.snakeElement = document.getElementById("snake")!;
    this.stage = document.getElementById("stage")!;
    this.head = document.querySelector("#snake>div")!;
    this.bodies = this.snakeElement.getElementsByTagName("div")!;
  }
  //得到蛇头的坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  //设置蛇头的坐标
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    if (this.X < 0 || this.X > this.stage.offsetWidth - 10) {
      throw new Error("蛇撞墙了");
    }
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      if (value < this.X) {
        value = this.X + 10;
      } else if (value > this.X) {
        value = this.X - 10;
      }
    }
    this.bodyMove();
    this.head.style.left = value + "px";
    this.checkBody();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (this.Y < 0 || this.Y > this.stage.offsetHeight - 10) {
      throw new Error("蛇撞墙了");
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value < this.Y) {
        value = this.Y + 10;
      } else if (value > this.Y) {
        value = this.Y - 10;
      }
    }
    this.bodyMove();
    this.head.style.top = value + "px";
    this.checkBody();
  }
  addBody() {
    this.snakeElement.insertAdjacentHTML("beforeend", "<div></div>");
  }
  bodyMove() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }
  checkBody() {
    //遍历蛇的身体
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("撞到自己了！");
      }
    }
  }
}
export default Snake;
