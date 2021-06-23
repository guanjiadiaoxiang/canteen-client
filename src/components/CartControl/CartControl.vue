<template>
  <div class="cartcontrol">
    <transition name="move">
      <!-- click.stop阻止事件冒泡 -->
      <div
        class="iconfont iconjianhao"
        v-if="food.count"
        @click="decrementFoodCount(food)"
      ></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{ food.count }}</div>
    <div
      class="iconfont iconadd"
      @click="incrementFoodCount(food)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  methods: {
    incrementFoodCount (food) {
      this.$store.commit('incrementFoodCount', {food})
    },
    decrementFoodCount (food) {
      this.$store.commit('decrementFoodCount', {food})
    }
  }
}
</script>

<style lang="scss">
  .cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    .iconjianhao{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(37, 60, 143);
      &.move-enter-active, &.move-leave-active{
        transition: all .3s;
      }
      &.move-enter, &.move-leave-to{
        opacity: 0;
        transform: translateX(15px) rotate(180deg);
      }
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .iconadd{
      display: inline-block;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: red;
    }
  }
</style>
