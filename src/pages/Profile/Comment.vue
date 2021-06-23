<template>
  <div class="history_order">
    <div class="order_header">
      <i class="iconfont iconfanhui" @click="$router.back()"></i>
      <h2>我的评价</h2>
    </div>
    <div class="order_content">
      <ul class="food_list">
        <li class="food_item" v-for="(food, index) in comments" :key="index">
          <div class="comment_header">
            <p class="food_name">{{ food.food_name }}</p>

            <button class="confirm" @click="write(food)">删除</button>
          </div>
          <span>{{food.date}}</span>
          <div class="comment_content">{{ food.comment }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reqComments } from '@/api/index.js'
import { mapState } from 'vuex'
export default {
  activated () {
    this.init()
  },
  data () {
    return {
      comments: []
    }
  },
  computed: {
    ...mapState(['username'])
  },
  methods: {
    async init () {
      this.comments = await reqComments(this.username)
      console.log(this.historyOrders)
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
    h2 {
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
    margin-top: -10px;
    ul {
      overflow: auto;
      .food_item {
        background: white;
        border-bottom: 5px #f5f5f5 solid;
        .comment_header {
          height: 60px;
          display: flex;
          align-items: center;
          position: relative;
          .food_name {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            position: absolute;
            left: 20px;
          }
          .confirm {
            width: 60px;
            height: 40px;
            background: rgb(37, 44, 175);
            border-radius: 5px;
            color: white;
            border: none;
            display: block;
            position: absolute;
            right: 20px;
            font-size: 16px;
          }
        }
        .comment_content {
          width: 100%;
          height: 80px;
          border-top: 1px rgb(214, 206, 206) solid;
          font-size: 20px;
          background: white;
        }
      }
    }
  }
}
</style>
