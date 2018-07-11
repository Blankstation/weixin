//index.js
//获取应用实例
const app = getApp()
let timer;
let numAi = 0;
Page({
  data: {
    btnState:false,
    winNum:0,
    gameResult:'',
    imageAiSrc: '',
    imageUserSrc: '/pages/images/wenhao.png',
    srcs: [
      '/pages/images/bu.png',
      '/pages/images/jiandao.png',
      '/pages/images/shitou.png'
    ]
  },
  onLoad: function () {
    //生命周期函数，监听页面加载
    let oldWinNumber = wx.getStorageSync('winNum');
    if (oldWinNumber != null && oldWinNumber != '') {
      this.setData({ winNum: oldWinNumber });
    }
    this.timerGo();
  },

   // timerGo: function () {
  //   let thisPage = this;
  //   timer = setInterval(function () {
  //     if (numAi >= 3) {
  //       numAi = 0;
  //     }
  //     thisPage.setData({ imageAiSrc: thisPage.data.srcs[numAi] });
  //     numAi++;
  //   }, 300);

  // }

  

  changeForChoose(e){
    //console.log(e);
    if (this.data.btnState){
      return;
    }
    this.setData({ imageUserSrc: this.data.srcs[e.currentTarget.id]});
    clearInterval(timer);
    let ai=this.data.imageAiSrc;
    let user = this.data.imageUserSrc;
    let num=this.data.winNum;
    let str="你输了";
    if (user == '/pages/images/bu.png' && ai =='/pages/images/shitou.png'){
      num++;
      str="你赢了";
      wx.setStorageSync('winNum', num );
    }
    if (user == '/pages/images/jiandao.png' && ai == '/pages/images/bu.png') {
      num++;
      str = "你赢了";
      wx.setStorageSync('winNum', num);
    }
    if (user == '/pages/images/shitou.png' && ai == '/pages/images/jiandao.png') {
      num++;
      str = "你赢了";
      wx.setStorageSync('winNum', num);
    }

    if(user == ai){
      str = "平局";
    }

    this.setData({
      winNum: num,
      gameResult: str,
      btnState:true
    });
  }, 
  
  
  timerGo() {
    timer = setInterval(this.move, 300);
  },

  move() {
   
    numAi = parseInt(Math.floor(Math.random() * 3));
    this.setData({ imageAiSrc: this.data.srcs[numAi] });
    numAi++;
  },
  again() {
    
    this.timerGo();
    this.setData({
      btnState: false,
      gameResult: '',
      imageUserSrc: '/pages/images/wenhao.png'
    });
  }
  
 
})
