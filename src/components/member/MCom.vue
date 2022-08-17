<template>
  <div class="member">
    <div class="xma">
      <div class="um">
        <h4>我的账户</h4>
        <div class="links">
          <router-link to="/" class="active">个人中心</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.member {
  display: flex;
  padding-top: 20px;
  width: 1240px;
  margin: 0 auto;
  position: relative;
  .xma {
    width: 220px;
    margin-right: 20px;
    border-radius: 2px;
    .um {
      background-color: #fff;
      h4 {
        font-size: 18px;
        font-weight: 400;
        padding: 20px 52px 5px;
        border-top: 1px solid #f6f6f6;
      }
      .links {
        padding: 0 52px 10px;
        a {
          display: block;
          line-height: 1;
          padding: 15px 0;
          font-size: 14px;
          color: #666;
          position: relative;
          &:hover {
            color: #27ba9b;
          }
          &.active {
            color: #27ba9b;
            &::before {
              content: "";
              // display: none;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              position: absolute;
              top: 19px;
              left: -16px;
              background-color: #27ba9b;
            }
          }
        }
      }
    }
  }
}
</style>