<template>
  <div id="app">
    <nav class="nav">
      <span
        v-for="(item, index) in categories"
        :key="index"
        class="nav-item"
        :class="{ 'nav-item-active': active === index }"
        @click="tab(index)"
      >
        {{ item.name }}
      </span>
    </nav>

    <template v-for="(item, index) in categories">
      <component v-if="active === index" :is="item.slug" :key="item.slug" />
    </template>
  </div>
</template>

<script>
import * as components from "./components";

export default {
  name: "App",

  components: {
    ...components
  },

  data() {
    return {
      active: 0,
      categories: [
        {
          slug: "compressImages",
          name: "压缩图片",
        },
        {
          slug: "compute",
          name: "计算器",
        },
      ],
    };
  },

  methods: {
    tab(index) {
      this.active = index;
    },
  },
};
</script>

<style>
@import "./assets/css/app.css";

.nav {
  background-color: #aaa;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 4px;
}
.nav-item {
  padding: 6px;
  display: inline-block;
  cursor: pointer;
}
.nav-item:hover,
.nav-item-active {
  font-weight: bold;
}
</style>
