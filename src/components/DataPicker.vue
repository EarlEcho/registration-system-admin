<template>
    <div class="">
        <el-date-picker
            v-model="innerData"
            type="datetimerange"
            @change="change"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
    </div>
</template>

<script>

    import functions from '@/functions/common.js'

    export default {
        name: '',
        components: {},
        props: ['start', 'end'],
        data() {
            return {
                innerData: '',
                startTime: '',
                endTime: ''
            }
        },
        methods: {
            change(val) {
                let dataArr = [];

                functions.foreach(val, function (key, value) {
                    dataArr.push((Date.parse(value) - 8 * 60 * 60 * 1000))
                });

                this.$emit('update', dataArr);
            }
        },
        mounted: function () {
            if (this.start != '') {
                const timeArr = [];
                timeArr[0] = new Date(parseInt(this.start));
                timeArr[1] = new Date(parseInt(this.end));
                this.innerData = timeArr;
                this.change(timeArr);
            }
        }
    }
</script>
<style lang="less">

</style>
