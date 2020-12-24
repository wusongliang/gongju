<template>
  <div id="calculator">
    <div class="LOGO">
      <span class="name">简单的计算器</span>
    </div>
    <div id="shuRu">
      <!--screen输入栏-->
      <div class="screen">
        <input
          type="text"
          id="screenName"
          name="screenName"
          class="screen"
          :value="result"
        />
      </div>
    </div>
    <div id="keys">
      <!-- j -->
      <!--第一排-->
      <input type="button" value="7" class="buttons" @click="jsq('7')" />
      <input type="button" value="8" class="buttons" @click="jsq('8')" />
      <input type="button" value="9" class="buttons" @click="jsq('9')" />
      <input
        type="button"
        id="Back"
        value="Back"
        class="buttons"
        @click="tuiGe()"
      />
      <input
        type="button"
        id="C"
        value="C"
        class="buttons"
        style="margin-right: 0px"
        @click="clearNum()"
      />
      <!--第二排-->
      <input type="button" value="4" class="buttons" @click="jsq('4')" />
      <input type="button" value="5" class="buttons" @click="jsq('5')" />
      <input type="button" value="6" class="buttons" @click="jsq('6')" />
      <input type="button" value="X" class="buttons" @click="jsq('*')" />
      <input
        type="button"
        id="/"
        value="/"
        class="buttons"
        style="margin-right: 0px"
        @click="jsq('/')"
      />
      <!--第三排-->
      <input type="button" id="1" value="1" class="buttons" @click="jsq('1')" />
      <input type="button" id="2" value="2" class="buttons" @click="jsq('2')" />
      <input type="button" id="3" value="3" class="buttons" @click="jsq('3')" />
      <input type="button" value="+" class="buttons" @click="jsq('+')" />
      <input
        type="button"
        value="-"
        class="buttons"
        style="margin-right: 0px"
        @click="jsq('-')"
      />
      <!--第四排-->
      <input type="button" value="0" class="buttons" @click="jsq('0')" />
      <input type="button" value="00" class="buttons" @click="jsq('00')" />
      <input type="button" value="." class="buttons" @click="jsq('.')" />
      <input type="button" value="%" class="buttons" @click="jsq('%')" />
      <input
        type="button"
        id="eva"
        value="="
        class="buttons"
        style="margin-right: 0px"
        @click="eva()"
      />
    </div>
    <div class="footer">
      <span class="aside">欢迎使用JavaScript计算器</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "compute",

  data() {
    return {
      num: 0, // 定义第一个输入的数据
      result: ""
    };
  },

  methods: {
    jsq(num) {
      //获取当前输入
      if (num == "%") {
        this.result = Math.round(num) / 100;
      } else {
        this.result += num;
      }
    },
    eva() {
      //计算输入结果
      this.result = eval(this.result);
    },
    clearNum() {
      //清0
      this.result = "";
      document.getElementById("screenName").focus();
    },
    tuiGe() {
      //退格
      this.result = this.result.substring(0, this.result.length - 1);
    },
  },
};
</script>

<style scoped>
#calculator {
  margin: 0 auto;
  width: 330px;
  height: 400px;
  border: 1px solid lightgray;
  background-color: darkgrey;
  padding: 15px;
}

/*LOGO*/
.LOGO {
  height: 20px;
}
.LOGO .name {
  float: left;
  line-height: 30px;
}
.LOGO .verson {
  float: right;
  line-height: 30px;
}
/*screen*/
#shuRu {
  margin-top: 15px;
}
.screen {
  margin-top: 5px;
  width: 300px;
  height: 40px;
  text-align: right;
  padding-right: 10px;
  font-size: 20px;
}
#keys {
  border: 1px solid lightgray;
  height: 223px;
  margin-top: 25px;
  padding: 8px;
}
#keys .last {
  margin-right: 0px;
}
.footer {
  margin-top: 20px;
  height: 20px;
}
.footer .link {
  float: right;
}

#keys .buttons {
  float: left;
  width: 42px;
  height: 36px;
  text-align: center;
  background-color: lightgray;
  margin: 0 17px 20px 0;
}
</style>