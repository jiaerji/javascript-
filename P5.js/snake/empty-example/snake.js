function Snake() {//类里面用var定义的属性是私有的,用this定义的属性是公有的
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.eat = (pos) => {
        var d = dist(this.x, this.y, pos.x, pos.y);//判断蛇的位置和food的位置之间的长度
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    this.dir = (x, y) => {
        this.xspeed = x;
        this.yspeed = y;
    }
  
    this.update = () => {
        //蛇的数组的索引是从大到小的
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }//让后面一个块跟着前面移动
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }//当长度大于一时产生一个新块，表示到达了新的位置

        this.x = this.x + this.xspeed*scl;
        this.y = this.y + this.yspeed*scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }
  
    this.show = () => {
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
          rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    this.death = () => {
        for (var i = 0; i < this.tail.length; i++) {
          var pos = this.tail[i];
          var d = dist(this.x, this.y, pos.x, pos.y);
          if (d < 1) {
            alert('game over');
            this.x = 0;
            this.y = 0;
            this.xspeed = 0;
            this.yspeed = 0;
            this.total = 0;
            this.tail = [];
          }
        }
    }
}