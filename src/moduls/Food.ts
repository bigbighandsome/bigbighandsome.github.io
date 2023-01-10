//定义食物类
class Food {
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById("food")!;
    this.ChangePosition();
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
    if (left <= 280 && top <= 280) {
      this.element.style.left = left + "px";
      this.element.style.top = top + "px";
    }
  }
}
export default Food;
