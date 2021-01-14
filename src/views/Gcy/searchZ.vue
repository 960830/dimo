<template>
    <div>
        <div class="hearer-box">
            <hedtop />
            <search />
        </div>
        <ul class="item-box">
            <li>
                <div class="item-img">
                    <img src="" alt="">
                </div>
                <div class="item-tet">

                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import hedtop from '@/components/head.vue'
    import search from '@/components/search.vue'
    export default {
        // 组件参数 接收来自父组件的数据
        props: [],
        // 局部注册的组件
        components: { hedtop, search },
        // 组件状态值
        data() {
            return {

            };
        },
        // 侦听器
        watch: {},
        // 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
        created() {

        },
        //  el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
        //  如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
        mounted() {

        },
        // 组件方法
        methods: {

        },
        // 计算属性
        computed: {

        }
    };
</script>

<style lang="scss" scoped>
    .hearer-box {
        width: 100%;
        height: 126px;
        background: #fff;
    }
    .item-box {
        width: 100%;
        height: 210px;
        
    }
     li {
        width: 100%;
        display: flex;
    }
    .item-img {
        width: 270px;
        height: 210px;
        background: pink;
    }
    .item-tet {
        width: 460px;
        height: 210px;
        background: green;
    }
</style>