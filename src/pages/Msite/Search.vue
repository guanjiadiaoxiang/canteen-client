<template>
  <div class="search">
    <div class="search_header">
      <div class="back" @click="$router.back()">
        <i class="iconfont iconfanhui"></i>
      </div>
      <div class="input">
        <span class="icon">
          <i class="iconfont iconbuoumaotubiao13"></i>
        </span>
        <input type="text" v-model="keywords" />
        <span class="cancel" @click="search">搜索</span>
      </div>
    </div>
    <div class="list_content">
      <ul class="list_container">
        <li
          class="list_wrapper"
          v-for="(food, index) in searchFoods"
          :key="index"
        >
          <div class="item">
            <div class="l">
              <img class="food_img" :src="food.img_url" />
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
                <p class="shop_name">{{ food.shop_name }}</p>
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
import { reqSearch } from '@/api/index.js'
import CartControl from '@/components/CartControl/CartControl.vue'
export default {
  name: 'Search',
  activated () {},
  data () {
    return {
      searchFoods: [],
      keywords: ''
    }
  },
  methods: {
    async search () {
      this.searchFoods = await reqSearch(this.keywords)
      // console.log(this.searchFoods)
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
.search {
  width: 100%;
}
.search_header {
  position: relative;
  .back {
    width: 100%;
    height: 60px;
    background: linear-gradient(rgb(134, 193, 235), white);
    position: relative;
    i {
      font-size: 36px;
      color: white;
      position: absolute;
      left: 15px;
      top: 10px;
    }
  }
  .input {
    display: flex;
    align-items: center;
    background: white;
    height: 60px;
    .icon {
      width: 40px;
      height: 40px;
      background: #f5f5f5;
      border-radius: 10px 0 0 10px;
      margin-left: 10px;
      i {
        font-size: 16px;
        line-height: 40px;
        margin-left: 10px;
      }
    }
    input {
      width: 270px;
      height: 40px;
      border-radius: 0 10px 10px 0;
      background: #f5f5f5;
      border: none;
      margin-right: 10px;
      outline: none;
    }
    .cancel {
      font-size: 18px;
      line-height: 40px;
    }
  }
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
      &::-webkit-scrollbar {
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
        .goto_shop {
          position: absolute;
          top: 5px;
          left: 5px;
          span {
            font-size: 18px;
          }
          i {
            font-size: 16px;
          }
        }
        .cartcontrol {
          position: absolute;
          bottom: 5px;
          left: 5px;
        }
      }
    }
  }
}
</style>
