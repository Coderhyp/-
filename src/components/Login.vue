<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/img/avator.png" alt="">
      </div>
      <!--      表单-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    placeholder="请输入用户名"
                    prefix-icon="icon-smile"
          >
          </el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input
              placeholder="请输入密码"
              prefix-icon="icon-shocked"
              v-model="loginForm.password"
              type="password">
          </el-input>
        </el-form-item>
        <!--        按钮-->
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="primary" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //表单验证规则对象
      loginFormRules: {
        //  验证用户名是否合法
        username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
            ],
        //  验证密码是否合法
        password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
          ]
      }
    }
  },
  methods:{
    //点击重置按钮 重置表单
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields();
    },
    login(){
      this.$refs.loginFormRef.validate(async valid=>{
        if(!valid) return ;
        const { data : res}=await this.$http.post('login',this.loginForm);
        if (res.meta.status !==200)return this.$message.error('登陆失败')
          this.$message.success('登陆成功');
        //将登录成功之后的toke 保存到sessionStorage中,因为sessionStorage是会话期存储机制,,localStorage是持久化存储机制
        //   项目中除了登陆之外的API接口,必须在登录之后才能访问     token只应在当前网站打开期间生效
        window.sessionStorage.setItem('token',res.data.token)
        //路由跳转
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang='less' scoped>
.login_container {
  height: 100%;
  background-color: rgb(64, 136, 165);
}

.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 10px;
}

.login_box:hover {
  box-shadow: 0 10px 5px 0 rgba(0, 0, 0, .25);
  transition: all 0.5s ease-in-out;
}

.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid rgba(123, 96, 96, 0.5);
  box-shadow: 0 0 10px white;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}

.btn {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.login_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 5px;
  width: 100%;
  padding: 0 10px;
}

</style>