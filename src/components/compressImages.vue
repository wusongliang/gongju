<template>
  <div class="container">
    <p class="mb-3">支持png, jpg格式</p>

    <div class="box box-input-file">
      选择要压缩的图片
      <input type="file" class="input-file" multiple @change="getFiles" />
    </div>

    <div class="box flex-space">
      存储压缩图片的文件名：
      <input v-model="outFileName" type="text" />
    </div>

    <div class="box flex-space">
      图片大小质量（0 ~ 100）：
      <input v-model="quality" type="number" />
    </div>

    <div class="text-center mb-3">
      <input type="button" @click="compressImages" value="压缩" />
    </div>

    <p v-show="info" :style="{ color }" class="mb-3">{{ info }}</p>

    <div v-show="files.length">
      <p class="mb-3">已选择{{ files.length }}张图片</p>
      <p v-for="(item, index) in files" :key="index" class="file-name mb-3">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
const images = require("images");
const path = require("path");
const fs = require("fs");

export default {
  name: "compressImages",
  data() {
    return {
      outPath: "",
      outFileName: "min-images",
      files: [],
      info: "",
      color: "green",
      quality: 70,
      errorFile: ""
    };
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

      if (this.color === "green") {
        this.info = "已经压缩成功，请重新选择图片！";
        return;
      }

      fs.mkdir(this.outPath, async () => {
        try {
          for (let file of this.files) {
            const fileName = path.basename(file.path);
            // const imageType = path.extname(file.path);
            // const quality = imageType === ".png" ? 50 : 70;
            this.errorFile = fileName;
            await images(file.path).save(this.outPath + "\\" + fileName, {
              quality: this.quality,
            });
          }
          
          this.color = "green";
          this.info = "压缩成功, 图片保存在min-images文件";
        } catch {
          this.color = "red";
          this.info = this.errorFile + "文件压缩失败，后面文件已终止";
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  background-color: #aaa;
}
.box {
  margin-bottom: 16px;
}
.box-input-file {
  text-align: center;
  border: 1px solid #bbb;
  position: relative;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.box-input-file:hover {
  border-color: #666;
}
.mb-3 {
  margin-bottom: 12px;
}
input {
  cursor: pointer;
  height: 36px;
  min-width: 60px;
  padding: 0 8px;
}
.input-file {
  z-index: 1;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
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
</style>