<template>
    <div class="login">
        <div class="bg_blur" :style="{backgroundImage: `url(${bgImg})`}"></div>
        <div class="login_main">
            <div class="login_header">
                <span class="back" @click="back"><i class="iconfont iconfanhui"></i></span>
                <span class="register" @click="handleRegister">注册</span>
                <div class="header_title">
                    <p>{{headerTitle}}</p>
                    <p>未注册手机验证后即可完成注册</p>
                </div>
            </div>
            <form action="" class="phone_login" v-if="isShow">
                <input type="text" v-model="username" placeholder="请输入手机号">
                <input type="text" v-model="password" placeholder="请输入验证码">
                <button @click.prevent="login">登录</button>
                <span @click="toggleIsShow">账号密码登录</span>
            </form>
            <form action="" class="password_login" v-else>
                <input type="text" v-model="username" placeholder="请输入手机号/账号/邮箱">
                <input type="text" v-model="password" placeholder="请输入密码">
                <button @click.prevent="login">登录</button>
                <span @click="toggleIsShow">手机号登录</span>
            </form>
        </div>
    </div>
</template>
<script>
import bgImg from '@/assets/img/登录.jpg'
import axios from 'axios'
export default {
  data () {
    return {
      bgImg: bgImg,
      isShow: true,
      username: '',
      password: ''
    }
  },
  computed: {
    headerTitle () {
      let title = this.isShow ? ('手机号登录') : ('密码登录')
      return title
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    toggleIsShow () {
      this.isShow = !this.isShow
    },
    login () {
      axios.post('/api/users/login', {
        username: this.username,
        password: this.password
      }).then((res) => {
        this.$router.replace('/profile')
        console.log(123)
      })
    },
    handleRegister () {
      this.$router.push('register')
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
    height: 100vh;
    position: relative;
    .bg_blur{
        height: 100vh;
        background: center top;
    }
    .login_main{
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
            .register{
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 24px;
                color: white;
            }
            .header_title{
                position: absolute;
                top: 100px;
                left: 20px;
                p:nth-child(1){
                    font-size: 30px;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 10px;
                }
                p:nth-child(2){
                    color: white;
                }
            }
        }
        .phone_login{
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
                color: white;
                outline: none;
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
                color: white;
                outline: none;
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
