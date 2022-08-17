import { storeToRefs } from "pinia";
import { storeToRefs } from "pinia";
import { storeToRefs } from "pinia";
<template>
  <div class="loginCom">
    <nav>
      <a href="javascript:;" :class="show ? 'active' : ''" @click="show = true"
        >账户登录</a
      >
      <a
        href="javascript:;"
        :class="!show ? 'active' : ''"
        @click="show = false"
        >扫码登录</a
      >
    </nav>
    <main>
      <div class="q-box" v-show="!show">
        <img src="@/assets/rwm.jpg" alt="" />
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
      <div v-show="show">
        <div class="toggle">
          <a href="javascript:;" v-show="shows" @click="shows = false">
            <el-icon><Message /></el-icon> 使用短信登录
          </a>
          <a href="javascript:;" v-show="!shows" @click="shows = true">
            <el-icon><Message /></el-icon> 使用帐号登录
          </a>
        </div>
        <div class="from" v-show="shows">
          <el-form
            style="max-width: 300px"
            :model="ruleFrom"
            status-icon
            :rules="rules"
          >
            <el-form-item prop="usename">
              <el-input
                v-model="ruleFrom.usename"
                class="w-50 m-2"
                prefix-icon="UserFilled"
                placeholder="请输入用户名"
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
              <div class="btn" @click="login(ruleFrom)">登录</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="from" v-show="!shows">
          <el-form
            style="max-width: 300px"
            :model="ruleFroms"
            status-icon
            :rules="ruless"
          >
            <el-form-item prop="usename">
              <el-input
                v-model="ruleFroms.usename"
                class="w-50 m-2"
                placeholder="请输入手机号"
                prefix-icon="UserFilled"
              />
            </el-form-item>
            <el-form-item prop="yzm">
              <el-input
                v-model="ruleFroms.yzm"
                class="w-50 m-2"
                placeholder="请输入验证码"
                prefix-icon="Message"
              >
                <template #append
                  ><el-button type="info">发送验证码</el-button></template
                ></el-input
              >
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked2" label="  "></el-checkbox
              >我已同意<a href="javascript:;">《隐私条款》</a>和<a
                href="javascript:;"
                >《服务条款》</a
              >
            </el-form-item>
            <el-form-item>
              <div class="btn" @click="login(ruleFroms)">登录</div>
            </el-form-item>
          </el-form>
        </div>
        <div class="foot">
          <a
            href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=101941968&response_type=token&scope=all&redirect_uri=http%3A%2F%2Ferabbit.itheima.net%2F%23%2Flogin%2Fcallback"
            class="qq"
          ></a>
          <div class="url">
            <a href="javascript:;">忘记密码</a>
            <a href="javascript:;">免费注册</a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useTxtStore} from "@/store/useStore";
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const router = useRouter();
    const usetxtStore = useTxtStore();
    const {usetxt} = storeToRefs(usetxtStore)
    const loginCom = reactive({
      show: true,
      shows: true,
      ruleFrom: {
        usename: "",
        password: "",
      },
      ruleFroms: {
        usename: "",
        yzm: "",
      },
      checked2: false,
    });
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("未输入帐号"));
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
      usename: [{ validator: validatePass, trigger: "blur" }],
      password: [{ validator: validatePass1, trigger: "blur" }],
    });
    const test3 = /\S{6,12}/;
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("未输入帐号"));
      } else if (!test3.test(value)) {
        callback(new Error("请输入6-12位的帐号"));
      } else {
        callback();
      }
    };
    const test4 = /\d{6}/;
    const validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("未输入验证码"));
      } else if (!test4.test(value)) {
        callback(new Error("请输入6位的数字验证码"));
      } else {
        callback();
      }
    };
    const ruless = reactive({
      usename: [{ validator: validatePass2, trigger: "blur" }],
      yzm: [{ validator: validatePass3, trigger: "blur" }],
    });
    const login = async (arr) => {
      if (loginCom.checked2) {
        if (arr.usename && (test.test(arr.password) || test4.test(arr.yzm))) {
          if (arr.password) {
            await axios
              .post("/api/login", {
                account: arr.usename,
                password: arr.password,
              })
              .then((res) => {
                localStorage.setItem("token", res.result.token);
                 usetxt.value = res.result
                router.replace("/");
              })
              .catch(() => {
                ElMessage({
                  showClose: true,
                  message: "未输入正确的帐号密码或者验证码",
                  type: "error",
                });
              });
          } else {
          }
        } else {
          ElMessage({
            showClose: true,
            message: "未输入正确的帐号密码或者验证码",
            type: "error",
          });
        }
      } else {
        ElMessage({
          showClose: true,
          message: "请勾选私有协议和服务协议",
          type: "error",
        });
      }
    };
    return {
      ...toRefs(loginCom),
      rules,
      ruless,
      login,
    };
  },
};
</script>

<style lang="less" scoped>
.loginCom {
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
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    padding: 0 40px;
    text-align: right;
    align-items: center;
    a {
      flex: 1;
      line-height: 1;
      display: inline-block;
      font-size: 18px;
      position: relative;
      &:nth-of-type(1) {
        border-right: 1px solid #f5f5f5;
        text-align: left;
      }
      &.active {
        color: #27ba9b;
        font-weight: 700;
      }
    }
  }
  main {
    .q-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        a {
          color: #27ba9b;
          font-size: 16px;
        }
      }
    }
    .toggle {
      padding: 15px 40px 15px 238px;
      font-size: 14px;
      a {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #27ba9b;
        line-height: 1;
        i {
          margin-right: 2px;
        }
      }
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
    .foot {
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .qq {
        display: block;
        width: 63px;
        height: 24px;
        background: url("~@/assets/qq.png");
      }
      .url {
        a {
          font-size: 14px;
          color: #999;
          margin-left: 10px;
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