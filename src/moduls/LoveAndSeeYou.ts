// 引入爱
import love from "./love";
//这是可视化操作界面(给别人用的,不过程序员可以也在控制台里玩)
export default function LoveAndSeeYou() {
  let hateMeStr = prompt("你讨厌我吗?请回答yes或者no") as string;
  let hateMe = false as boolean;
  if (hateMeStr == "yes") {
    hateMe = true;
  } else if (hateMeStr == "no") {
    hateMe = false;
  }
  let myhasmsg: string = "";
  let youhasmsg: string = "";
  if (hateMe) {
    myhasmsg = "对不起,打扰你了";
    youhasmsg = "对不起,打扰你了";
  } else {
    myhasmsg = "我有的";
    youhasmsg = "你有的";
  }
  let myhas = document.getElementById("myHas") as HTMLInputElement;
  let youlikes = document.getElementById("youLikes") as HTMLInputElement;
  let button = document.getElementById("button") as HTMLElement;
  let myhas2 = document.getElementById("myhas") as HTMLElement;
  let youhas = document.getElementById("youhas") as HTMLElement;
  let youname = document.getElementById("youname") as HTMLInputElement;
  button.addEventListener("click", () => {
    if (hateMe) {
      alert("别人都讨厌你了,就别再喜欢了");
      return;
    }
    let myhasArr = myhas.value.split("，");
    let youlikesArr = youlikes.value.split("，");

    function removeSpace(arr: Array<string>) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "") {
          arr.splice(i, 1);
        }
      }
    }
    //将你实例化
    let myLove = new love(hateMe, myhasArr, youlikesArr, 3000, youname.value);
    //喜欢上了你
    myLove.love("you");

    myhasmsg = myLove.myHas.join("，");
    youhasmsg = myLove.youHas.join("，");
    if (myhasArr[0] == "") {
      alert("什么都没有,你拿什么喜欢?");
      return;
    }
    if (youlikesArr[0] == "") {
      myhasmsg = "既然你没有喜欢的东西,那么我会把我的一切都给你";
      youhasmsg = `我的全部,${youhasmsg}`;
    }
    if (myhasmsg == "") {
      myhasmsg = "我什么都没有了,全部给你了";
    }
    myhasmsg = `我有的:${myhasmsg}` + "," + `此外我还剩下${myLove.myMoney}块钱`;
    youhasmsg = `她有的:${youhasmsg}`;
    myhas2.innerText = myhasmsg;
    youhas.innerText = youhasmsg;
    removeSpace(myLove.youHas);
    let showYouHas = myLove.youHas.join("和");
    console.log(myLove.youHas);

    alert(`${myLove.you}说:谢谢你,我收到了你的${showYouHas},你是个好人`);
  });
  myhas2.innerText = myhasmsg;
  youhas.innerText = youhasmsg;
}
