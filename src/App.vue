<template>
  <router-view />
</template>
<style lang="less">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
ul {
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
}
p {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: #333;
  outline: none;
}
.icon {
  font-family: "icon" !important;
  font-style: normal;
}
.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
}
h3 {
  margin: 0;
  padding: 0;
}
.slot {
  .sku {
    padding-left: 10px;
    padding-top: 20px;
    dl {
      margin: 0;
      display: flex;
      padding-bottom: 10px;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        flex: 1;
        color: #666;
        line-height: 40px;
        margin: 0;
        img {
          width: 50px;
          height: 50px;
          margin-bottom: 5px;
          border: 1px solid #e4e4e4;
          margin-right: 10px;
          cursor: pointer;
          &.select {
            border-color: #27ba9b;
          }
        }
        span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          border: 1px solid #e4e4e4;
          margin-right: 10px;
          cursor: pointer;
          &.select {
            border-color: #27ba9b;
          }
        }
      }
    }
  }
  button {
    display: inline-block;
    outline: none;
    margin-left: 60px;
    border: 1px solid #27ba9b;
    border-radius: 3px;
    background: #27ba9b;
    color: #fff;
    width: 60px;
    height: 32px;
    font-size: 14px;
  }
}
</style>
