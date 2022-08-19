<template>
  <div class="resiger">
    <header>
      <div class="head-content">
        <router-link to="/" class="logo"> </router-link>
        <h3 class="head-tit">欢迎注册</h3>
        <router-link to="/" class="entry"> 进入网站首页 </router-link>
      </div>
    </header>
    <main>
      <section>
        <nav>账户注册</nav>
        <div class="from" v-show="shows">
          <el-form
            style="max-width: 300px"
            :model="ruleFrom"
            ref="ruleFormRef"
            status-icon
            :rules="rules"
          >
            <el-form-item prop="account">
              <el-input
                v-model="ruleFrom.account"
                class="w-50 m-2"
                prefix-icon="UserFilled"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item prop="mobile">
              <el-input
                v-model="ruleFrom.mobile"
                class="w-50 m-2"
                prefix-icon="UserFilled"
                placeholder="请输入手机号"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="ruleFrom.password"
                class="w-50 m-2"
                placeholder="请输入密码"
                prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked2" label="  "></el-checkbox
              >我已同意<a href="javascript:;">《隐私条款》</a>和<a
                href="javascript:;"
                >《服务条款》</a
              >
            </el-form-item>
            <el-form-item>
              <div class="btn" @click="submitForm(ruleFormRef)">登录</div>
            </el-form-item>
          </el-form>
        </div>
      </section>
    </main>
    <footer>
      <div class="container">
        <p>
          <a
            href="javascript:;"
            v-for="(item, index) of flist"
            :key="index"
            :class="index == 0 ? 'non' : ''"
          >
            {{ item }}
          </a>
        </p>
        <p>CopyRight © 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
export default {
  setup() {
    const ruleFormRef = ref();
    const resiger = reactive({
      flist: [
        "关于我们",
        "帮助中心",
        "售后服务",
        "配送与验收",
        "商务合作",
        "搜索推荐",
        "友情链接",
      ],
      ruleFrom: {
        account: "",
        code:'123456',
        mobile: "",
        password: "",
        type:undefined,
        cityCode:'110100',
        provinceCode:'110000',
      },
      checked2: false,
      shows: true,
    });
    const test1 =
      /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("未输入手机号"));
      } else if (!test1.test(value)) {
        callback(new Error("请输入11位的手机号"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("未输入用户名"));
      } else {
        callback();
      }
    };
    const test = /\S{6,12}/;
    const validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("未输入密码"));
      } else if (!test.test(value)) {
        callback(new Error("请输入6-12位的密码"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      account: [{ validator: validatePass2, trigger: "blur" }],
      mobile: [{ validator: validatePass, trigger: "blur" }],
      password: [{ validator: validatePass1, trigger: "blur" }],
    });
    const submitForm = async (formEl) => {
      if (resiger.checked2) {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
          if (valid) {
            console.log(111);
            axios
              .post("/api/register", resiger.ruleFrom)
              .then((res) => {
                console.log(res);
              });
            //  axios.post('/regiser/other',{mobile:resiger.ruleFrom.tel,password:resiger.ruleFrom.password}).then(res=>{
            //     console.log(res);
            // })
          } else {
            ElMessage({
              showClose: true,
              message: "未输入正确的帐号密码或者验证码",
              type: "error",
            });
          }
        });
      } else {
        ElMessage({
          showClose: true,
          message: "请勾选私有协议和服务协议",
          type: "error",
        });
      }
    };
    return {
      ...toRefs(resiger),
      rules,
      submitForm,
      ruleFormRef,
    };
  },
};
</script>

<style lang="less" scoped>
.resiger {
  header {
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    .head-content {
      display: flex;
      align-items: center;
      width: 1240px;
      margin: 0 auto;
      a {
        display: inline-block;
      }
      .logo {
        width: 200px;
        height: 132px;
        background: url("../assets/logo.png") no-repeat 0 15px;
        background-size: contain;
      }
      .head-tit {
        flex: 1;
        margin: 16px 0 0 20px;
        font-size: 24px;
        font-weight: 400;
        color: #666;
      }
      .entry {
        width: 120px;
        font-size: 16px;
      }
    }
  }
  main {
    height: 488px;
    background: url("../assets/bg.png");
    position: relative;
    section {
      width: 380px;
      background: #fff;
      min-height: 400px;
      position: absolute;
      left: 50%;
      top: 54px;
      transform: translate3d(100px, 0, 0);
      box-shadow: 0 0 10px rgb(0 0 0 / 15%);
      nav {
        height: 55px;
        line-height: 55px;
        border-bottom: 1px solid #f5f5f5;
        padding: 0 40px;
        text-align: center;
      }
      .from {
        width: 300px;
        margin: 0 auto;
        a {
          color: #069;
        }
        .btn {
          width: 100%;
          height: 40px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          background: #27ba9b;
          cursor: pointer;
        }
      }
    }
  }
  footer {
    padding: 30px 0 50px;
    background: #fff;
    .container {
      width: 1240px;
      margin: 0 auto;
      p {
        text-align: center;
        color: #999;
        padding-top: 20px;
        a {
          line-height: 1;
          padding: 0 10px;
          color: #999;
          display: inline-block;
          border-left: 1px solid #ccc;
        }
        .non {
          border: 0;
        }
      }
    }
  }
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #fff;
  border-color: #27ba9b;
}
/deep/ .el-checkbox__inner::after {
  border: 1px solid #27ba9b;
  border-left: 0;
  border-top: 0;
  height: 7px;
  left: 4px;
  position: absolute;
  top: 1px;
  transform: rotate(45deg) scaleY(0);
  width: 3px;
  transition: transform 0.15s ease-in 50ms;
}
</style>