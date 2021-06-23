<template>
    <div class="login">
        <div class="login_main" :style="{backgroundImage: `url(${bgImg})`}">
            <div class="login_header">
                <span class="back" @click="back"><i class="iconfont iconfanhui"></i></span>
                <span class="phone_text">手机号注册</span>
            </div>
            <form action="" class="password_login" autocomplete="off">
                <input type="text" v-model="username" placeholder="请输入手机号/账号/邮箱" onblur autocomplete="off">
                <input type="text" v-model="password" placeholder="请输入密码" onblur autocomplete="off">
                <button @touchstart="handleToRegister">注册</button>
            </form>
        </div>

    </div>
</template>
<script>
import bgImg from '@/assets/img/注册.jpg'
import axios from 'axios'
export default {
  data () {
    return {
      bgImg: bgImg,
      username: '',
      password: ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    handleToRegister () {
      axios.post('/api/users/register', {
        username: this.username,
        password: this.password
      }).then((res) => {
        this.$router.push('/login')
        alert(res.data.msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
    height: 100vh;
    position: relative;
    .login_main{
        height: 100vh;
        .login_header{
            .back{
                position: absolute;
                top: 10px;
                left: 10px;
                i{
                    font-size: 36px;
                    color: white;
                }
            }
            .phone_text{
                position: absolute;
                top: 15px;
                left: 125px;
                font-size: 24px;
                color: white;
            }
        }
        .password_login{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            height: 200px;
            input{
                border: none;
                border-bottom: 1px white solid;
                background: transparent;
                width: 100%;
                height: 40px;
                margin-bottom: 30px;
                outline: none;
                color: white;
                font-size: 18px;
            }
            button{
                display: block;
                width: 100%;
                height: 50px;
                background: white;
                color: black;
                opacity: 0.5;
                border-radius: 10px;
                font-size: 24px;
                margin-bottom: 20px;
                outline: none;
            }
            span{
                margin-left: 5px;
                color: white;
                opacity: 0.5;
            }
        }
    }
}
</style>
