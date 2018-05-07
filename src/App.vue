<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import functions from '@/functions/common.js'

    export default {
        name: 'App',
        components: {},
        props: [],
        data() {
            return {
                userInfos: {
                    id: 1,
                    username: 'Echo'
                },
            }
        }
    }
</script>

<style lang="less">
    @import 'assets/css/common.css';
    @import 'assets/css/ionicons.min.css';

    #app {
        position: absolute;
        width: 100%;
        min-height: 100%;
        background-color: #f5f5f5;
    }

    .module-content-w {
        width: 85%;
        margin: 20px auto;
        padding: 30px;
        background-color: white;
        border-radius: 10px;

    }

    .menu-content-w {
        padding: 30px;
        background-color: white;
        margin: 20px;
        position: absolute;
        border-radius: 10px;
        left: 200px;
        top: 40px;

        height: 90vh;
        box-sizing: border-box;
    }
    .pagination-block-w{
        text-align: center;
        margin: 25px 0;
    }
</style>
