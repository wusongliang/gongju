<template>
  <div id="app">
    <div class="container">
      <div class="box input-file-box">
        选择要压缩的图片
        <input type="file" id="file" multiple @change="getFiles">
      </div>

      <div class="box flex-space">
        存储压缩图片的文件名：
        <input v-model="outFileName" type="text">
      </div>

      <div class="box flex-space">
        图片大小质量（0 ~ 100）：
        <input v-model="quality" type="number">
      </div>

      <div class="text-center">
        <input type="button" @click="compressImages" value="压缩">
      </div>

      <p v-show="info" :style="{ color }">{{ info }}</p>

      <div v-show="files.length">
        <span>已选择{{ files.length }}张图片</span>
        <p v-for="(item, index) in files" :key="index" class="file-name">
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const images = require("images");
const path = require('path');
const fs = require('fs');

export default {
  name: "App",
  data() {
    return {
      outPath: "",
      outFileName: "min-images",
      files: [],
      info: "",
      color: "green",
      quality: 70
    }
  },

  methods: {
    getFiles(e) {
      this.files = e.srcElement.files;
      this.info = "";
      this.color = "red";
    },

    compressImages() {
      if (this.files.length < 1) {
        this.color = "red";
        this.info = "没有选择图片";
        return;
      }

      this.outPath = path.dirname(this.files[0].path) + "\\" + this.outFileName;

      try {
        if (this.color === "green") {
          this.info = "已经压缩成功，请重新选择图片！";
          return;
        }

        fs.mkdir(this.outPath, async () => {
          for (let file of this.files) {
            const fileName = path.basename(file.path);
            // const imageType = path.extname(file.path);
            // const quality = imageType === ".png" ? 50 : 70;
            await images(file.path).save(this.outPath + "\\" + fileName, {
              quality: this.quality       
            });
          }
  
          this.color = "green";
          this.info = "压缩成功, 图片保存在min-images文件";
        });
      } catch {
        this.color = "red";
        this.info = "压缩失败";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 15px;
}
.container {
  max-width: 400px;
  margin: auto;
  padding: 16px;
  border: 1px solid #eee;
}
input,
#file {
  cursor: pointer;
  height: 36px;
  min-width: 60px;
  padding: 0 8px;
}
#file {
  z-index: 1;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
}
.box {
  margin-bottom: 16px;
}
.input-file-box {
  text-align: center;
  border: 1px solid #bbb;
  position: relative;
  height: 40px;
  line-height: 40px;
}
.input-file-box:hover {
  border-color: #666;
}
.file-name {
  background-color: #eee;
  padding: 6px;
}
.flex-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-center {
  text-align: center;
}
</style>
