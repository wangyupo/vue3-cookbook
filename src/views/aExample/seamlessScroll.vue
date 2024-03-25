<template>
  <div>
    <RhTitle title="纵向" divider class="mb-3" />
    <RhSeamlessScroll class="border border-black overflow-hidden" :data="listVertical" :options="optionsVertical">
      <div class="h-[60px]" v-for="item in listVertical" :key="item">{{ item }}</div>
    </RhSeamlessScroll>
    <RhTitle title="横向" divider class="my-3" />
    <RhSeamlessScroll class="border border-black overflow-hidden" :data="listVertical" :options="optionsHorizontal">
      <div class="h-[60px] leading-[60px]" v-for="item in listHorizontal" :key="item">{{ item }}</div>
    </RhSeamlessScroll>
  </div>
</template>

<script setup>
import RhSeamlessScroll from "@/components/RhSeamlessScroll.vue";
import { ref } from "vue";

const listVertical = ref([
  "1、突然！阿里云重大宣布：史上最大规模降价！",
  "2、2023最新爆笑喜剧片，半个好莱坞的人来打酱油，导演好大的面子",
  "3、“对标Model Y”，“最美比亚迪”，宋L被过度期待了",
  "4、苹果版“余额宝”来了！年利率4.15%，10倍高收益！半月前刚推出“花呗”",
  "5、文心一言满月：完成4次迭代，大模型推理成本降为原来十分之一",
]);
const optionsVertical = ref({
  step: 1,
  direction: "vertical",
});
const listHorizontal = ref([
  "1、预计10万左右，五菱宝骏悦也，能悦不能“野” 。",
  "2、针对北大路演事件！《惊天救援》片方作出回应。",
  "3、大范围降雨将重启 暴雨袭击6省。",
  "4、全面实现不动产统一登记，房地产税真的要来了。",
]);
const optionsHorizontal = ref({
  step: 1,
  direction: "horizontal",
  hoverStop: false,
});
</script>

<style lang="scss" scoped></style>
