//定义食物类
class Food {
  element: HTMLElement;
  stage: HTMLElement;
  constructor() {
    this.element = document.getElementById("food")!;
    this.ChangePosition();
    this.stage = document.getElementById("stage")!;
  }
  get X() {
    return this.element.offsetLeft;
  }
  get Y() {
    return this.element.offsetTop;
  }
  ChangePosition() {
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;
    if (
      left <= this.stage.offsetWidth - 10 &&
      top <= this.stage.offsetHeight - 10
    ) {
      this.element.style.left = left + "px";
      this.element.style.top = top + "px";
    }
  }
}
export default Food;
