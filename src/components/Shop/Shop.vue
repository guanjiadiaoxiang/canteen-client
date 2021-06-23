<template>
  <div class="shop" ref="shop">
    <div class="shop_header" :style="{ backgroundImage: `url(${bgImg})` }">
      <div class="back" @click="back"><i class="iconfont iconfanhui"></i></div>
      <div class="icon">
        <i class="iconfont iconbuoumaotubiao13"></i>
        <i class="iconfont iconcomment-w"></i>
        <i class="iconfont iconshoucang"></i>
      </div>
    </div>
    <div class="shop_content">
      <div
        class="shop_detail"
      >
        <div class="shop_title">{{ title }}</div>
        <img
          :src="logoImg"
          alt=""
          class="shop_img"
        />
        <div class="shop_info">
          <span class="span_sales">月售{{ sales }}</span>
          <div class="score">
            <i class="iconfont iconstar"></i>
            <i class="iconfont iconstar"></i>
            <i class="iconfont iconstar"></i>
            <i class="iconfont iconstar"></i>
            <i class="iconfont iconstar"></i>
            <span class="star">4.5</span>
          </div>
        </div>
      </div>
      <div class="shop_container">
        <div class="menu_wrapper">
          <ul>
            <li
              class="menu_item"
              @click="clickMenuItem(0)"
              :class="{ current: currentIndex == 0 }"
            >
              最近购买
            </li>
            <li
              class="menu_item"
              @click="clickMenuItem(1)"
              :class="{ current: currentIndex == 1 }"
            >
              猜你喜欢
            </li>
            <li
              class="menu_item"
              @click="clickMenuItem(2)"
              :class="{ current: currentIndex == 2 }"
            >
              进店必看
            </li>
            <li
              class="menu_item"
              @click="clickMenuItem(3)"
              :class="{ current: currentIndex == 3 }"
            >
              热销
            </li>
            <li
              class="menu_item"
              @click="clickMenuItem(4)"
              :class="{ current: currentIndex == 4 }"
            >
              新品
            </li>
            <li
              class="menu_item"
              @click="clickMenuItem(5)"
              :class="{ current: currentIndex == 5 }"
            >
              其他
            </li>
          </ul>
        </div>
        <div
          class="foods_wrapper"
          ref="foodsWrapper"
        >
          <ul class="foods_ul" ref="foodsUl">
            <li class="foods_list">
              <div class="foods_title">最近购买</div>
              <ul>
                <li
                  class="food_item"
                  v-for="(food, index) in detail.foods"
                  :key="index"
                >
                  <div class="l">
                    <img :src="food.img_url" />
                  </div>
                  <div class="r">
                    <div class="food_text">
                      <p class="food_name">{{ food.food_name }}</p>
                      <div>
                        <span>单价￥</span>
                        <span>{{ food.price }}</span>
                        <span>销量</span>
                        <span>{{ food.sales }}</span>
                      </div>
                    </div>
                    <CartControl class="cartcontrol" :food="food"/>
                  </div>
                </li>
              </ul>
            </li>
            <li class="foods_list">
              <div class="foods_title">猜你喜欢</div>
              <ul>
                <li
                  class="food_item"
                  v-for="(food, index) in detail.foods"
                  :key="index"
                >
                  <div class="l">
                    <img :src="food.img_url" />
                  </div>
                  <div class="r">
                    <div class="food_text">
                      <p class="food_name">{{ food.food_name }}</p>
                      <div>
                        <span>单价￥</span>
                        <span>{{ food.price }}</span>
                        <span>销量</span>
                        <span>{{ food.sales }}</span>
                      </div>
                    </div>
                    <CartControl class="cartcontrol" :food="food"></CartControl>
                  </div>
                </li>
              </ul>
            </li>
            <li class="foods_list">
              <div class="foods_title">进店必看</div>
              <ul>
                <li
                  class="food_item"
                  v-for="(food, index) in detail.foods"
                  :key="index"
                >
                  <div class="l">
                    <img :src="food.img_url" />
                  </div>
                  <div class="r">
                    <div class="food_text">
                      <p class="food_name">{{ food.food_name }}</p>
                      <div>
                        <span>单价￥</span>
                        <span>{{ food.price }}</span>
                        <span>销量</span>
                        <span>{{ food.sales }}</span>
                      </div>
                    </div>
                    <CartControl class="cartcontrol" :food="food"></CartControl>
                  </div>
                </li>
              </ul>
            </li>
            <li class="foods_list">
              <div class="foods_title">热销</div>
              <ul>
                <li
                  class="food_item"
                  v-for="(food, index) in detail.foods"
                  :key="index"
                >
                  <div class="l">
                    <img :src="food.img_url" />
                  </div>
                  <div class="r">
                    <div class="food_text">
                      <p class="food_name">{{ food.food_name }}</p>
                      <div>
                        <span>单价￥</span>
                        <span>{{ food.price }}</span>
                        <span>销量</span>
                        <span>{{ food.sales }}</span>
                      </div>
                    </div>
                    <CartControl class="cartcontrol" :food="food"></CartControl>
                  </div>
                </li>
              </ul>
            </li>
            <li class="foods_list">
              <div class="foods_title">新品</div>
              <ul>
                <li
                  class="food_item"
                  v-for="(food, index) in detail.foods"
                  :key="index"
                >
                  <div class="l">
                    <img :src="food.img_url" />
                  </div>
                  <div class="r">
                    <div class="food_text">
                      <p class="food_name">{{ food.food_name }}</p>
                      <div>
                        <span>单价￥</span>
                        <span>{{ food.price }}</span>
                        <span>销量</span>
                        <span>{{ food.sales }}</span>
                      </div>
                    </div>
                    <CartControl class="cartcontrol" :food="food"></CartControl>
                  </div>
                </li>
              </ul>
            </li>
            <li class="foods_list">
              <div class="foods_title">其他</div>
              <ul>
                <li
                  class="food_item"
                  v-for="(food, index) in detail.foods"
                  :key="index"
                >
                  <div class="l">
                    <img :src="food.img_url" />
                  </div>
                  <div class="r">
                    <div class="food_text">
                      <p class="food_name">{{ food.food_name }}</p>
                      <div>
                        <span>单价￥</span>
                        <span>{{ food.price }}</span>
                        <span>销量</span>
                        <span>{{ food.sales }}</span>
                      </div>
                    </div>
                    <CartControl class="cartcontrol" :food="food"></CartControl>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <ShopCart :foods="cartFoods"></ShopCart>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import CartControl from '@/components/CartControl/CartControl.vue'
import ShopCart from '@/components/ShopCart/ShopCart.vue'
import {mapState} from 'vuex'
export default {
  name: 'Shop',
  activated () {
    this.$store.dispatch('getShopDetail', { name: this.shopName })
    setTimeout(() => {
      this.shopDetail = this.$store.state.detail
      this.title = this.detail.shop.shop_name
      this.bgImg = this.detail.shop.bg_img
      this.logoImg = this.detail.shop.logo_img
      this.sales = this.detail.shop.sales
    }, 1000)
    setTimeout(() => {
      this.initTops()
      if (!this.foodScroll) {
      /* eslint-disable no-new */
        this.foodScroll = new BScroll('.foods_wrapper', {
          probeType: 2,
          click: true
        })
      } else {
        this.foodScroll.refresh()
      }
      this.foodScroll.on('scroll', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
      this.foodScroll.on('scrollEnd', ({ x, y }) => {
        this.scrollY = Math.abs(y)
      })
    }, 3000)
    // console.log(this.tops)
  },
  props: ['shopName'],
  data () {
    return {
      shopDetail: {},
      title: '',
      bgImg: '',
      logoImg: '',
      sales: 0,
      scrollY: 0,
      tops: []
    }
  },
  computed: {
    ...mapState(['detail', 'cartFoods']),
    currentIndex () {
      const { scrollY, tops } = this
      const index = tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1]
      })
      return index
    }
  },
  methods: {
    back () {
      this.$router.push('/msite')
      this.$store.commit('clearCart')
    },
    initTops () {
      const tops = []
      let top = 0
      tops.push(top)
      const lis = this.$refs.foodsUl.children
      Array.prototype.slice.call(lis).forEach((li) => {
        top += li.offsetHeight
        tops.push(top)
      })
      this.tops = tops
    },
    clickMenuItem (index) {
      this.scrollY = this.tops[index]
      this.foodScroll.scrollTo(0, -this.scrollY)
      console.log(this.scrollY)
    }
  },
  components: {
    CartControl,
    ShopCart
  }
}
</script>
<style lang="scss" scoped>
.shop {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background: #f5f5f5;
  .shop_header {
    height: 120px;
    background: center;
    position: relative;
    .back {
      position: absolute;
      top: 20px;
      left: 5px;
      i {
        color: white;
        font-size: 36px;
      }
    }
    .icon {
      color: white;
      position: absolute;
      top: 20px;
      right: 10px;
      i {
        font-size: 24px;
        font-weight: bolder;
        margin-left: 12px;
      }
    }
  }
  .shop_content {
    margin-top: -5px;
    .shop_detail {
      background-color: white;
      height: 120px;
      border-radius: 10px 10px 0 0;
      border-bottom: 1px gray solid;
      position: relative;
      .shop_title {
        font-size: 24px;
        font-weight: bold;
        padding-top: 15px;
        margin-left: 20px;
      }
      .shop_img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        position: absolute;
        top: -30px;
        left: 250px;
        border: 1px gray solid;
      }
      .shop_info {
        margin: 40px 20px 0;
        position: relative;
        .score {
          position: absolute;
          top: 0;
          right: 0;
          i {
            font-size: 16px;
            color: yellow;
          }
        }
      }
    }
    .shop_container {
      display: flex;
      .menu_wrapper {
        width: 80px;
        .menu_item {
          width: 100%;
          height: 50px;
          margin-bottom: 3px;
          line-height: 50px;
          text-align: center;
        }
        .current {
          background: white;
        }
      }
      .foods_wrapper {
        flex: 1;
        height: calc(100vh - 238px);
        overflow: scroll;
        .foods_list {
          background-color: white;
          border-bottom: 1px gray solid;
          border-radius: 10px;
          .foods_title {
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-bottom: 1px gray solid;
          }
          .food_item {
            height: 120px;
            background: white;
            border-radius: 10px;
            position: relative;
            border-bottom: 5px #f5f5f5 solid;
            .l {
              position: absolute;
              left: 10px;
              top: 50%;
              transform: translate(0, -50%);
              height: 90px;
              width: 90px;
              img {
                height: 100%;
                width: 100%;
                border-radius: 10px;
              }
            }
            .r {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translate(0, -50%);
              height: 100px;
              width: 175px;
              .food_text {
                .food_name {
                  font-size: 20px;
                  font-weight: bold;
                  margin-top: 10px;
                  margin-bottom: 10px;
                  text-align: center;
                }
                div {
                  text-align: center;
                  span:nth-child(3) {
                    margin-left: 10px;
                  }
                }
              }
              .cartcontrol {
                margin-left: 80px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
