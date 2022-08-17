<template>
  <div class="tit">
    <h3>
      新鲜好物
      <small>新鲜出炉 品质靠谱</small>
    </h3>
    <router-link to="/">
      <span>查看全部</span>
      <ArrowRight style="width: 1em; height: 1em; margin-bottom: -3px" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tit {
  width: 1240px;
  margin: auto;
  padding: 40px 0;
  display: flex;
  align-items: flex-end;
  h3 {
    flex: 1;
    font-size: 32px;
    font-weight: 400;
    margin-left: 6px;
    height: 35px;
    line-height: 35px;
    small {
      font-size: 16px;
      color: #999;
      margin-left: 20px;
    }
  }
  a {
    margin-bottom: 2px;
    color: #333;
    span {
      font-size: 16px;
      vertical-align: middle;
      margin-right: 4px;
      color: #999;
    }
  }
}
</style>