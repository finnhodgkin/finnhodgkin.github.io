var game = {
  borderSize:40,
  playerColor:"",
  borderColor:"",
  playerSize:360,
  round:9,
  speed:700,
  difficulty:50,
  element:".circle",
  text:".text",
  numberOfColors:4,
  colors:[],
  win:false,
  genColor:function(){
    return "rgb(" + this.random(256) + ", " + this.random(256) + ", " +  this.random(256) + ")";
  },
  random:function(max, min){
    if(!min)min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  randomiseColors:function(){
    this.colors = [];
    for(i = 0; i < this.numberOfColors; i++){
      this.colors.push(this.genColor());
    }
  },
  randomColor:function(){
    var color = this.colors[this.random(this.colors.length - 1)];
    if(color !== this.borderColor){
      return color;
    }else{
      return this.randomColor();
    }
  },
  randomBorder:function(){
    this.borderColor = this.randomColor();
    var shadow = "0px 0px 0px " + this.borderSize + "px " + this.borderColor;
    $(this.element).css("box-shadow", shadow);
    this.textColor();
  },
  randomPlayer:function(){
    this.playerColor = this.randomColor();
    $("#wrap, " + this.element).css("background-color",this.playerColor);
    $(this.text).css("color",this.playerColor);
  },
  textColor:function(){
    var avg = this.playerColor.replace(/[^0-9 +]/gi, "");
    avg = avg.split(" ");
    avg = Math.floor(0.2126 * avg[0] + 0.71 * avg[1] + 0.0722 * avg[2]);
    if(avg > 150){
      $(this.text).css("text-shadow","2px 2px rgb(10, 10, 10), -2px -2px rgb(10, 10, 10), 2px -2px rgb(10, 10, 10), -2px 2px rgb(10, 10, 10)");
    }else{
      $(this.text).css("text-shadow","1px 1px white, -1px -1px white, 1px -1px white, -1px 1px white");
    }
  },
  increaseSize:function(){
      if(this.round < 9){
        this.round++;
        this.playerSize += this.borderSize;
        $(this.element).width(this.playerSize + "px");
        $(this.element).height(this.playerSize + "px");
        $(this.text).html(this.round);
        this.speed += this.difficulty;
        this.randomiseColors();
        this.randomPlayer();
        this.randomBorder();
      }else{
        this.round = 9;
        this.randomiseColors();
        this.randomPlayer();
        this.randomBorder();
      }
  },
  decreaseSize:function(){
      this.playerSize -= this.borderSize;
      $(this.element).width(this.playerSize + "px");
      $(this.element).height(this.playerSize + "px");
      this.round--;
      $(this.text).html(this.round)
      this.speed -= this.difficulty;
      this.randomiseColors();
      this.randomPlayer();
      this.randomBorder();
      if(this.round === 0){
        this.win = true;
        $(game.text).html("win");
        $(game.element).hide();
      }
  },
  timer:function(){
    a = this;
    setTimeout(function(){
      a.randomBorder();
      if(!a.win){
        a.timer();
      }
    }, a.speed);
  },
  init:function(){
    if(this.win){
      this.win = false;
      while(this.round != 9){
        this.increaseSize();
        $(game.element).show();
      }
      this.timer();
    }else{
      this.randomiseColors();
      this.randomBorder();
      this.randomPlayer();
      this.timer();
    }
  }
}

function press(){
  if(!game.win){
    if(game.playerColor === game.borderColor){
        game.decreaseSize();
    }else{
      game.increaseSize();
    }
  }else{
    game.init();
  }
}

$( document ).ready(function() {
  game.init();
});
