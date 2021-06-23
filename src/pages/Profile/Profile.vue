<template>
    <div class="profile">
        <div class="profile_header">
          <div class="info">
            <img src="@/assets/img/头像.jpg" alt="" class="header_img">
            <span>{{username}}</span>
          </div>
          <div class="set">
            <i class="iconfont iconzujian-icon-32"></i>
            <i class="iconfont icontongzhi"></i>
            <i class="iconfont icontuichu" @click="logout"></i>
          </div>
          <div class="line"></div>
        </div>
        <div class="profile_content">
          <div class="menu_title">我的功能</div>
          <div class="menu">
            <div class="rating" @click="handleComment"><i class="iconfont iconcomment-w"></i><span>我的评价</span></div>
            <div class="history" @click="handleHistory"><i class="iconfont iconlishijilu-copy"></i><span>历史订单</span></div>
            <div class="collection"><i class="iconfont iconshoucang"></i><span>我的收藏</span></div>
          </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer/Footer.vue'
import axios from 'axios'
export default {
  name: 'Profile',
  activated () {
    this.username = localStorage.getItem('name')
  },
  data () {
    return {
      username: '',
      status: -1
    }
  },
  computed: {
    getUserName () {
      let username = localStorage.getItem('name')
      return username
    }
  },
  methods: {
    goto () {
      this.$router.push('/login')
    },
    logout () {
      axios.get('/api/users/logout').then((res) => {
        alert(res.data.msg)
        // localStorage.removeItem('name')
        this.$router.push('/login')
      })
    },
    handleHistory () {
      this.$router.push('/history')
    },
    handleComment () {
      this.$router.push('/comment')
    }
  },
  components: {
    Footer
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api/users/getUser').then((res) => {
      let status = res.data.status
      // console.log(res.data)
      if (status === 0) {
        next(vm => {
          localStorage.setItem('name', res.data.data.username)
        })
      } else {
        next('/login')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.profile{
  width: 100vw;
}
.profile_header{
  height: 170px;
  background: linear-gradient(lightblue, transparent);
  width: 100vw;
  margin-bottom: 50px;
  .info{
    position: absolute;
    top: 35px;
    left: 20px;
    width: 90%;
    height: 150px;
    display: flex;
    align-items: center;
    img{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-right: 30px;
    }
    span{
      font-size: 24px;
      font-weight: bold;
    }
  }
  .line{
    width: 0;
    height: 1px;
    background: rgb(140, 231, 231);
    position: absolute;
    top: 150px;
    left: 150px;
  }
  .set{
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 24px;
    width: 90%;
    display: flex;
    align-items: center;
    i{
      font-size: 24px;
    }
    i:nth-child(1){
      margin-right: 250px;
    }
    i:nth-child(2){
      margin-right: 25px;
    }
  }
}
.profile_content{

  border-radius: 10px;
  height: 145px;
  background: white;

  .menu_title{
    font-weight: bold;
    padding-top: 15px;
    margin-left: 5px;
    font-size: 18px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px gray solid;
  }
  .menu{
    display: flex;
    justify-content: space-evenly;
    div{
      text-align: center;
      i{
        font-size: 24px;
      }
      span{
        display: block;
        margin-top: 15px;
      }
    }
  }
}
</style>
