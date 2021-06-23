<template>
    <div class="footer">
        <router-link tag="li" to="/msite" active-class="myactive">
            <i class="iconfont iconshouye"></i>
            <p>首页</p>
        </router-link>
        <router-link tag="li" to="/order" active-class="myactive">
            <i class="iconfont iconziyuan"></i>
            <p>订单</p>
        </router-link>
        <router-link tag="li" to="/profile" active-class="myactive">
            <i class="iconfont iconwode"></i>
            <p>个人中心</p>
        </router-link>
    </div>
</template>
<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/colors.scss';
.footer{
    width:100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: -1px;
    display:flex;
    background: white;
    z-index: 10;
    border-top: 1px gray solid;
    li{
        text-align: center;
        flex: 1;
        margin-top: 3px;
        &.myactive{
            transform: scale(1.1);
            color: rgb(9, 35, 148);
        }
        i{
            font-size: 20px;
        }
        p{
            font-size: 14px;
            margin-top: 2px;
        }
    }
}
</style>
