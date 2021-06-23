<template>
  <div class="hotlist">
    <div class="list_header"></div>
    <div class="list_content">
      <ul class="list_container">
        <li class="list_wrapper" v-for="(food, index) in foods" :key="index">
          <div class="item">
            <div class="l">
              <img class="food_img" :src="food.img_url">
            </div>
            <div class="r">
              <div class="food_text">
                <p class="food_name">{{food.food_name}}</p>
                <div>
                  <span>单价￥</span>
                  <span>{{food.price}}</span>
                  <span>销量</span>
                  <span>{{food.sales}}</span>
                </div>
                <p class="shop_name">{{food.shop_name}}</p>
              </div>
            </div>
          </div>
          <div class="item_side">
            <div class="goto_shop" @click="handleShop(food.shop_name)">
                <span>进入店铺</span>
                <i class="iconfont icontiaozhuan"></i>
            </div>
            <CartControl class="cartcontrol" :food="food"></CartControl>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CartControl from '@/components/CartControl/CartControl.vue'

export default {
  mounted () {
  },
  props: {
    foods: Array
  },
  methods: {
    handleFood () {
      this.$router.push('/msite/food')
    },
    handleShop (name) {
      this.$router.push('/shop/' + name)
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/colors.scss";
.hotlist {
  margin-top: 10px;
  border-radius: 10px;
}
.list_content {
  width: 100%;
  ul {
    li {
      height: 150px;
      background: white;
      border-radius: 10px;
      position: relative;
      margin-bottom: 10px;
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      &::-webkit-scrollbar{
          display: none;
      }
      .item {
        width: 100%;
        height: 100%;
        display: inline-block;
        .l {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translate(0, -50%);
          .food_img {
            height: 120px;
            width: 120px;
            border-radius: 10px;
          }
        }
        .r {
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translate(0, -50%);
          .food_text {
            .food_name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            div {
              margin-bottom: 20px;
              span:nth-child(2) {
                margin-right: 20px;
              }
            }
            .shop_name {
              font-size: 20px;
              color: gray;
            }
          }
        }
      }
      .item_side {
        width: 100px;
        height: 100%;
        display: inline-block;
        border-left: 1px gray solid;
        position: relative;
        .goto_shop{
            position: absolute;
            top: 5px;
            left: 5px;
            span{
                font-size: 18px;
            }
            i{
                font-size: 16px;
            }
        }
        .cartcontrol{
            position: absolute;
            bottom: 5px;
            left: 5px;
        }
      }
    }
  }
}
</style>
