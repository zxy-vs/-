<template>
  <router-link :to="'/product/' + item.id" class="GlobalShow">
    <img :src="item.picture" alt="" />

    <p class="ellipsis" v-if="item.name">{{ item.name }}</p>
    <p class="price" v-if="item.price">¥{{ item.price }}</p>
    <p v-if="item.title">{{ item.title }}</p>
    <p class="desc" v-if="item.alt">{{ item.alt }}</p>
  </router-link>
</template>

<script>
import { toRefs } from "vue-demi";
export default {
  props: ["item"],
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
};
</script>

<style lang="less" scoped>
.GlobalShow {
  display: block;
  width: 306px;
  height: 406px;
  background: #f0f9f4;
  transition: all 0.5s;
  img {
    width: 306px;
    height: 306px;
  }
  p {
    font-size: 22px;
    padding: 12px 30px 0 30px;
    text-align: center;
    white-space: nowrap;
  }
  .price {
    color: #cf4444;
  }
  .desc {
    color: #999;
    font-size: 18px;
  }
}
</style>