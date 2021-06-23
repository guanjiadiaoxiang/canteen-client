<template>
  <div class="food">
    <div class="food_cover" @click="cancel"></div>
    <div
      class="food_content"
    ></div>
  </div>
</template>

<script>
export default {
  mounted () {
  },
  data () {
    return {
    }
  },
  methods: {
    cancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.food {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  .food_cover {
    width: 100%;
    height: 100%;
    background: rgb(26, 24, 24);
    opacity: 0.5;
  }
  .food_content {
    position: absolute;
    top: 50%;
    left: 50%;
    background: white;
    width: 250px;
    height: 400px;
    transform: translate(-50%, -50%);
  }
}
</style>
