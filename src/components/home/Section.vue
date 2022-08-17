<template>
  <div
    :class="['section', isShow ? 'show' : '']"
    @mouseenter="show(true)"
    @mouseleave="show(false)"
  >
    <ul>
      <li v-for="item of list" :key="item.id">
        <router-link :to="'/category/sub/' + item.id">
          <img :src="item.picture" alt="" />
          <p>{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["list", "isShow"],
  setup(props, { emit }) {
    const show = (boo) => {
      emit("show", boo);
    };
    return {
      show,
    };
  },
};
</script>

<style lang="less" scoped>
.section {
  opacity: 0;
  z-index: 5;
  width: 1240px;
  height: 0;
  position: absolute;
  top: 110px;
  left: 0;
  background-color: #fff;
  box-shadow: rgba(204, 204, 204, 0.685) 0px 5px 10px 2px;
  margin: auto;
  overflow: hidden;
  transition: all 0.3s 0.3s linear;
  ul {
    margin-left: 65px;
    li {
      float: left;
      a {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        text-align: center;
        width: 100px;
        height: 135px;
        img {
          width: 60px;
          height: 60px;
          margin-bottom: 15px;
        }
        p {
          font-size: 14px;
          width: 100px;
          height: 20px;
        }
      }
      &:hover a {
        color: #27ba9b;
      }
    }
  }
  &:hover {
    opacity: 1;
  }
}
.show {
  opacity: 1;
  height: 135px;
}
</style>