<template>
  <div class="order">
    <div class="order_menu">
      <div
        :class="currentMenu === 0 ? 'selected' : ''"
        @click="currentMenu = 0"
      >
        待支付
      </div>
      <div
        :class="currentMenu === 1 ? 'selected' : ''"
        @click="currentMenu = 1"
      >
        待取餐
      </div>
      <div
        :class="currentMenu === 2 ? 'selected' : ''"
        @click="currentMenu = 2"
      >
        待评价
      </div>
    </div>
    <div class="order_container">
      <div class="wait_pay" v-show="currentMenu === 0">
        <ul class="food_list">
          <li class="food_item" v-for="(food, index) in orders" :key="index">
            <div class="l">
              <img :src="food.img_url" />
            </div>
            <div class="r">
              <div class="food_text">
                <p class="food_name">{{ food.food_name }}</p>
                <div>
                  <span>单价</span>
                  <span>￥{{ food.price }}</span>
                </div>
                <div>
                  <span>数量</span>
                  <span>{{ food.count }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="wait_pay_footer">
          <div class="cancel_btn">取消订单</div>
          <div class="pay_btn" @click="pay">
            ￥{{ totalPrice }}&nbsp;&nbsp;&nbsp;结算
          </div>
        </div>
      </div>
      <div class="wait_food" v-show="currentMenu === 1">
        <ul class="order_list">
          <li v-for="(order, index) in this.paidOrders" :key="index">
            <ul class="food_list">
              <li
                class="food_item"
                v-for="(food, index) in order.foods"
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
                    </div>
                    <div>
                      <span>数量</span>
                      <span>{{ food.count }}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="list_footer">
              <span>已支付&nbsp;&nbsp;{{ order.pay }}元</span>
              <button class="confirm" @click="confirmOrder(order)">
                确认取餐
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="wait_appraise" v-show="currentMenu === 2">
        <ul class="food_list">
          <li class="food_item" v-for="(food, index) in appraises" :key="index">
            <div class="l">
              <img :src="food.img_url" />
            </div>
            <div class="r">
              <div class="food_text">
                <p class="food_name">{{ food.food_name }}</p>
                <div>
                  <span>单价￥</span>
                  <span>{{ food.price }}</span>
                </div>
                <div>
                  <span>数量</span>
                  <span>{{ food.count }}</span>
                </div>
                <button class="confirm" @click="write(food)">评价</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer/Footer.vue'
import { mapState } from 'vuex'
import { MessageBox } from 'mint-ui'
import { reqConfirmOrder, reqWriteComment, reqSales } from '@/api/index.js'
export default {
  name: 'Order',
  data () {
    return {
      currentMenu: 0,
      paidOrders: [],
      appraises: [],
      money: 0
    }
  },
  computed: {
    ...mapState(['orders']),
    totalPrice () {
      let price = 0
      this.orders.forEach((item, index) => {
        price += item.price * item.count
      })
      return price
    }
  },
  methods: {
    pay () {
      MessageBox.prompt(' ', '转账金额').then(({ value, acion }) => {
        let paidOrder = {}
        paidOrder.foods = this.orders
        paidOrder.pay = value
        paidOrder.shop_name = this.orders[0].shop_name
        paidOrder.date = new Date()
        paidOrder.username = this.$store.state.username
        // console.log(paidOrder)
        reqConfirmOrder(paidOrder)
        this.paidOrders.push(paidOrder)
        this.$store.commit('clearOrders')
        MessageBox.alert('支付成功' + value + '元')
      })
    },
    confirmOrder (order) {
      MessageBox.confirm(' ', '确认已取餐').then(() => {
        order.foods.forEach((item) => {
          this.appraises.push(item)
          reqSales(item.food_name, item.count)
          // console.log(item.count)
        })
        this.paidOrders.splice(this.paidOrders.indexOf(order), 1)
        // console.log(this.appraises)
      })
    },
    write (food) {
      MessageBox.prompt(' ', '您对商家/菜品满意吗').then((value, action) => {
        let comment = {}
        comment.shop_name = food.shop_name
        comment.food_name = food.food_name
        comment.comment = value.value
        comment.username = this.$store.state.username
        comment.date = new Date()
        this.appraises.splice(this.appraises.indexOf(food), 1)
        // console.log(comment)
        reqWriteComment(comment)
        MessageBox.alert(' ', '评价成功')
      })
    }
  },
  components: {
    Footer
  }
}
</script>

<style lang="scss" scoped>
.order {
  .order_menu {
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: space-evenly;
    background: white;
    border-top: 15px rgb(45, 45, 180) solid;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    div {
      font-size: 18px;
      line-height: 65px;
    }
    .selected {
      font-weight: bold;
      transform: scale(1.2);
      color: rgb(45, 45, 180);
    }
  }
  .order_container {
    width: 100%;
    margin-top: 90px;
    .wait_pay {
      width: 100%;
      height: 700px;
      background: white;
      ul {
        height: 620px;
        overflow: auto;
        .food_item {
          height: 120px;
          background: white;
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
                margin-bottom: 10px;
                text-align: center;
              }
              div {
                text-align: center;
                margin-bottom: 10px;
                span:nth-child(3) {
                  margin-left: 10px;
                }
              }
            }
          }
        }
      }
      .wait_pay_footer {
        height: 100px;
        position: absolute;
        bottom: 0;
        border-top: 1px gray solid;
        width: 100%;
        display: flex;
        overflow: hidden;
        .cancel_btn {
          outline: none;
          width: 120px;
          height: 50px;
          background: rgb(228, 227, 233);
          border: none;
          margin: 0 0 0 160px;
          text-align: center;
          line-height: 50px;
        }
        .pay_btn {
          outline: none;
          width: 100px;
          height: 50px;
          background: rgb(37, 44, 175);
          border: none;
          color: white;
          text-align: center;
          line-height: 50px;
        }
      }
    }
    .wait_food {
      width: 100%;
      background: white;
      .order_list {
        width: 100%;
        li {
          width: 100%;
          background: gray;
          .food_list {
            overflow: auto;
            .food_item {
              height: 150px;
              background: white;
              position: relative;
              border-bottom: 5px #f5f5f5 solid;
              .l {
                position: absolute;
                left: 25px;
                top: 50%;
                transform: translate(0, -50%);
                height: 110px;
                width: 110px;
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
                height: 120px;
                width: 175px;
                .food_text {
                  .food_name {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-align: center;
                  }
                  div {
                    text-align: center;
                    margin-bottom: 5px;
                    span:nth-child(3) {
                      margin-left: 10px;
                    }
                  }
                }
              }
            }
          }
          .list_footer {
            height: 50px;
            background: white;
            line-height: 50px;
            position: relative;
            span {
              margin-left: 20px;
            }
            .confirm {
              width: 80px;
              height: 40px;
              background: rgb(37, 44, 175);
              border-radius: 5px;
              color: white;
              border: none;
              margin-left: 170px;
              font-size: 16px;
            }
          }
        }
      }
    }
    .wait_appraise {
      width: 100%;
      height: 700px;
      background: white;
      ul {
        height: 620px;
        overflow: auto;
        .food_item {
          height: 150px;
          background: white;
          position: relative;
          border-bottom: 5px #f5f5f5 solid;
          .l {
            position: absolute;
            left: 25px;
            top: 50%;
            transform: translate(0, -50%);
            height: 110px;
            width: 110px;
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
            height: 120px;
            width: 175px;
            .food_text {
              .food_name {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 10px;
                text-align: center;
              }
              div {
                text-align: center;
                margin-bottom: 5px;
                span:nth-child(3) {
                  margin-left: 10px;
                }
              }
              .confirm {
                width: 80px;
                height: 30px;
                background: rgb(37, 44, 175);
                border-radius: 5px;
                color: white;
                border: none;
                display: block;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
  }
}
</style>
