<template>
  <div class="history_order">
    <div class="order_header">
      <i class="iconfont iconfanhui" @click="$router.back()"></i>
      <span>历史订单</span>
    </div>
    <div class="order_content">
      <ul class="order_list">
        <li v-for="(order, index) in this.historyOrders" :key="index">
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
            <span>{{order.date}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reqOrders } from '@/api/index.js'
import { mapState } from 'vuex'
export default {
  mounted () {
    this.init()
  },
  data () {
    return {
      historyOrders: []
    }
  },
  computed: {
    ...mapState(['username'])
  },
  methods: {
    async init () {
      this.historyOrders = await reqOrders(this.username)
      // console.log(this.historyOrders)
    }
  }
}
</script>

<style lang="scss" scoped>
.history_order {
  width: 100vw;
  .order_header {
    height: 100px;
    background: rgb(61, 61, 155);
    display: flex;
    align-items: center;
    i {
      font-size: 36px;
      color: white;
      margin-left: 20px;
    }
    span {
      font-size: 24px;
      font-weight: normal;
      line-height: 100px;
      width: 100px;
      margin-left: 200px;
      color: white;
    }
  }
  .order_content {
    width: 100%;
    height: 100%;
    overflow: auto;
    border-radius: 10px;
    background: rgb(243, 242, 242);
    margin-top: -15px;
    .order_list {
      width: 100%;
      li {
        width: 100%;
        border-bottom: 10px #f5f5f5 solid;
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
}
</style>
