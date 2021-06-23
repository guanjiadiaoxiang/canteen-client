<template>
  <div class="msite">
    <div class="msite_header">
      <div class="header_title">
        <span>淮师二食堂欢迎你</span>
        <i class="iconfont icontongzhi"></i>
      </div>
      <div ref="searchBox" class="search_box">
        <input type="text" @click="gotoSearch" :class="{fixed_input: isFixed}"/>
        <i class="search_btn iconfont iconbuoumaotubiao13" @click="gotoSearch"></i>
      </div>
    </div>
    <div class="msite_content">
      <div class="msite_nav">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(shops, index) in shopsArr"
              :key="index"
            >
              <div
                class="link_to_shop"
                v-for="(shop, index) in shops"
                :key="index"
                @click="gotoShop(shop.shop_name)"
              >
                <img :src="shop.logo_img" alt="" />
                <span>{{ shop.shop_name }}</span>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="msite_menu" :class="{menu_fixed: isFixed}">
        <li to="/msite/todaylist" @click="toggleIsShow" :class="{selected: todayList}">今日推荐</li>
        <li tag="li" to="/msite/hotlist" @click="toggleIsShow" :class="{selected: !todayList}">热销爆款</li>
      </div>
      <TodayList @click="toggleIsShow" v-if="todayList" :foods="foods"></TodayList>
      <HotList @click="toggleIsShow" v-else :foods="foods"></HotList>
    </div>
    <Cart/>
    <Footer></Footer>
    <router-view name="search"></router-view>
    <router-view name="food"></router-view>
  </div>
</template>

<script>
import Footer from '@/components/Footer/Footer.vue'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import TodayList from '@/components/TodayList/TodayList.vue'
import HotList from '@/components/HotList/HotList.vue'
import Cart from '@/components/Cart/Cart.vue'
export default {
  name: 'Msite',
  activated () {
    this.$store.dispatch('getShops')
    this.$store.dispatch('getBestFoods')
    setTimeout(() => {
      this.shops = this.$store.state.shops
      this.foods = this.$store.state.bestFoods
      // console.log(this.foods)
    }, 1000)
    setTimeout(() => {
      /* eslint-disable no-new */
      new Swiper('.swiper-container', {
        loop: false,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination'
        }
      })
    }, 3000)

    window.onscroll = this.handleScroll
  },
  data () {
    return {
      title: '淮师二食堂',
      shops: [],
      foods: [],
      isFixed: false,
      scrollY: 0,
      todayList: true
    }
  },
  computed: {
    shopsArr () {
      let shops = this.shops
      const arr = []
      let minArr = []
      // shops = Array.from(shops)
      shops.forEach((c) => {
        minArr.push(c)
        if (minArr.length === 10) {
          arr.push(minArr)
          minArr = []
        }
      })
      return arr
    }
  },
  methods: {
    gotoSearch () {
      this.$router.push('/search')
    },
    gotoShop (name) {
      this.$router.push('/shop/' + name)
    },
    handleScroll () {
      if (document.documentElement.scrollTop >= 400) {
        this.isFixed = true
      } else {
        this.isFixed = ''
      }
    },
    toggleIsShow () {
      this.todayList = !this.todayList
    }
  },
  beforeDestroy () {
    window.onscroll = null
  },
  components: {
    Footer,
    TodayList,
    HotList,
    Cart
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/colors.scss";
.msite_header{
  height: 150px;
  background: rgb(37, 60, 143);
  .header_title{
    padding-top: 15px;
    margin-left: 15px;
    margin-bottom: 25px;
    span{
      font-weight: bold;
      margin-right: 175px;
      font-size: 18px;
      color: white;
    }
    i{
      font-size: 24px;
      color: white;

    }
  }
  .search_box {
    height: 70px;
    position: relative;
    outline: none;
    input{
      display: block;
      width: 96%;
      height: 35px;
      border-radius: 10px;
      background: white;
      outline: none;
      border: none;
      margin: 0 auto;
    }
    i{
      position: absolute;
      right: 12px;
      top: 3px;
      font-size: 24px;
    }
  }
}
.msite_content{
  margin-top: -5px;
}

.msite_nav {
  height: 210px;
  background: white;
  border-radius: 10px;
  .swiper-container {
    height: 100%;
    .swiper-wrapper {
      height: 85%;
      .swiper-slide {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        align-items: center;
        .link_to_shop {
          width: 65px;
          height: 65px;
          text-align: center;
          img{
            display: block;
            margin-bottom: 1px;
            border-radius: 5px;
            width: 65px;
            height: 65px;
          }
          span{
            font-size: 16px;
          }
        }
      }
    }
    .swiper-pagination {
      position: relative;
      top: 8px;
    }
  }
}
.msite_menu {
  margin-top: 10px;
  height: 45px;
  display: flex;
  justify-content: space-evenly;
  background: white;
  border-radius: 10px;
  li {
    line-height: 45px;
    width: 150px;
    text-align: center;
  }
  .selected{
    font-size: 20px;
    font-weight: bold;
  }
}
.menu_fixed{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  margin-top: 0;
  width: 100vw;
  height: 60px;
  border-bottom: 1px gray solid;
}
</style>
