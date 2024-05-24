//定义一个love类,代表我喜欢你
export default class love {
  public hateMe: boolean; //是不是讨厌我了
  public youHas: Array<string> = []; //你有的东西
  public myHas: Array<string>; //我有的东西
  public youLikes: Array<string>; //你喜欢的东西
  public myMoney: number; //我的钱
  public you: string; //你的名字

  //写一个构造函数，请在我喜欢上你的时候传进来你的信息
  constructor(
    hateMe: boolean,
    myHas: Array<string>,
    youLikes: Array<string>,
    myMoney: number,
    you: string
  ) {
    this.hateMe = hateMe;
    this.myHas = myHas;
    this.youLikes = youLikes;
    this.myMoney = myMoney;
    this.you = you;
  }
  //定义一个love函数,这个函数的参数是you,代表你
  love(you: string) {
    //定义一个关于你的接口
    interface youInerface {
      name: string;
      Has: Array<string>;
      Likes: Array<string>;
    }
    let myHas = new Set(this.myHas); //为了方便把我的东西给你, 我定义了一个set, 把我有的东西都放进去了;
    //定义一个我喜欢的对象,这个对象里都是你的信息
    let myLove: youInerface = {
      //我喜欢的那个人的名字是你
      name: you,
      Has: this.youHas,
      Likes: this.youLikes,
    };
    //如果你讨厌我,那么对不起,打扰你了
    if (this.hateMe) return;
    //如果你不讨厌我,那就执行下面的代码

    //如果你没有喜欢的东西,那么我会把我的一切都给你
    if (myLove.Likes[0] == "") {
      for (const element of this.myHas) {
        myLove.Has.push(element);
        myHas.delete(element);
        this.myHas = [...myHas];
      }
    }
    let that = this;
    // 定义一个寻找函数,用来判断我有没有你喜欢的东西
    function finded() {
      for (let i = 0; i < that.youLikes.length; i++) {
        for (let j = 0; j < that.myHas.length; j++) {
          if (that.myHas[j] == that.youLikes[j]) {
            return true;
          }
        }
      }
    }
    //如果你有喜欢的东西,我给它们取了个名字youLike,方便送给你
    myLove.Likes.forEach((youLike) => {
      // 在我有的东西里面寻找你喜欢的
      // 如果找到了
      if (finded()) {
        //如果找到了
        myLove.Has.push(youLike); //那就把这个东西给你
        myHas.delete(youLike); //从我这里把你喜欢的拿走
        this.myHas = [...myHas]; //把myHas变成数组,为了方便寻找你喜欢的东西
      }
      //如果没有找到
      else {
        //那我会去上班,挣钱给你买你喜欢的东西
        let workTime: number = 0;
        this.myMoney = 0;
        //努力工作30天,即使是周末也要努力赚钱,为了早日能让买到你喜欢的东西
        while (workTime < 30) {
          workTime += 1;
          this.myMoney += 100;
          let price: number = Math.floor(
            //我猜你喜欢的东西应该在100-3000块钱之前...对不起,不能给你更好的,我只有3000块钱的工资
            Math.random() * (3000 - 100 + 1) + 100
          );
          if (
            //如果我的钱能够买你喜欢的东西
            this.myMoney >= price
          ) {
            this.myMoney -= price; //先付钱,再买东西,喜欢你也要保持理智
            this.myHas.push(youLike); //买到了你喜欢的东西
          }
          myLove.Has.push(youLike); //然后把它交给你
          myHas.delete(youLike);
          this.myHas = [...myHas];
          this.youHas = [...new Set(myLove.Has)];
        }
      }
      // 把放在篮子里的东西拿给你,抱歉了,让你久等了
      this.youHas = [...new Set(myLove.Has)];
      //每次都要把我的东西存到篮子里,方便送给你
      this.myHas = [...myHas];
      myHas = new Set(this.myHas);
    });
  }
}
