<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleIsShow">
          <div class="logo-wrapper">
            <div class="logo">
              <i class="iconfont icongouwuchekong"></i>
            </div>
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="isShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
            <span class="submit" @click="submitOrder">提交订单</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="food">{{ food.food_name }}</span>
                <div class="price">
                  <span>￥{{ food.price }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import CartControl from '../CartControl/CartControl.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    ...mapState(['cartFoods']),
    totalPrice () {
      let price = 0
      this.cartFoods.forEach((item, index) => {
        price += item.price
      })
      return price
    }
  },
  methods: {
    toggleIsShow () {
      this.isShow = !this.isShow
    },
    clearCart () {
      MessageBox.confirm('确定清空购物车吗？').then(
        (action) => {
          this.$store.commit('clearCart')
        },
        (action) => {
          // 取消todo
        }
      )
    },
    submitOrder () {
      let foods = this.cartFoods
      foods.forEach((food) => {
        this.$store.state.orders.push(food)
      })
      MessageBox.confirm('确定提交订单吗？').then(
        (action) => {
          this.$store.commit('clearCart')
          this.$router.push('/order')
        },
        (action) => {}
      )
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="scss" scoped>
.shopcart {
  position: fixed;
  left: 0;
  top: 650px;
  z-index: 10;
  .content {
    .content-left {
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 70px;
        height: 70px;
        box-sizing: border-box;
        border-radius: 50%;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: rgb(37, 60, 143);
          line-height: 70px;
          i {
            line-height: 44px;
            font-size: 36px;
            color: #fff;
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #ffffff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100vw;
    transform: translateY(-100%);
    &.move-enter-active,
    &.move-leave-active {
      transition: transform 0.3s;
    }
    &.move-enter,
    &.move-leave-to {
      transform: translateY(0);
    }
    .list-header {
      width: 100vw;
      height: 40px;
      line-height: 40px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 16px;
        color: rgb(7, 17, 27);
        margin-left: 20px;
      }
      .empty {
        float: left;
        font-size: 16px;
        color: rgb(37, 60, 143);
        margin-left: 100px;
      }
      .submit{
          float: right;
          font-size: 16px;
          border-radius: 10px;
          font-weight: bold;
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: hidden;
      background: #fff;
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700px;
          color: rgb(240, 20, 20);
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  opacity: 1;
  background: rgba(7, 17, 27, 0.6);
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
