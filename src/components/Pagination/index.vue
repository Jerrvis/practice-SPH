<template>
  <div class="pagination">
    <button :disabled="pageNo == 1"
    @click="prevPage">上一页</button>
    <button v-for="(page, index) in pageList" :key="index" 
    :disabled="page == -1"
    :class="{active: page == pageNo}"
    @click="changePage(page)"
    >
      {{ page > 0 ? page : "..." }}
    </button>
    <button :disabled="pageNo == totalPage" 
    @click="nextPage">下一页</button>

    <button style="margin-left: 30px">共 60 条</button>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues", "changePage"],
  setup(props) {
    let pageNo = ref(parseInt(props.pageNo));

    let totalPage = computed(() => {
      return Math.ceil(props.total / props.pageSize);
    });

    let pageList = computed(() => {
      // list 为显示的页码列表， -1表示... 省略
      let list = [];
      let totalpage = Math.ceil(props.total / props.pageSize);
      let i = 1;
      if (totalpage > 7) {
        if (pageNo.value >= 5) {
          list.push(1);
          list.push(-1);
          if (pageNo.value < totalpage - 3) {
            // 正常页码
            for (i = pageNo.value - 2; i <= pageNo.value + 2; i++) {
              list.push(i);
            }
            list.push(-1);
            list.push(totalpage);
          } else {
            for (i = Math.min(totalpage - 4, pageNo.value - 2); i <= totalpage; i++) {
              list.push(i);
            }
          }
        } else {
          // 页码靠左
          for (i; i <= 5 || i <= pageNo.value + 2; i++) {
            list.push(i);
          }
          list.push(-1);
          list.push(totalpage);
        }
      } else {
        for (i = 1; i <= totalpage; i++) {
          list.push(i);
        }
      }

      return list;
    });

    // 修改页码
    let changePage = function(page){
      pageNo.value = page;
      console.log(page)
      props.changePage(page);
    }

    // 下一页
    let nextPage = function(){
      pageNo.value++;
      props.changePage(pageNo.value);
    }

    // 上一页
    let prevPage = function(){
      pageNo.value--;
      props.changePage(pageNo.value);
    }

    return {
      totalPage,
      pageList,
      pageNo,
      changePage,
      nextPage,
      prevPage
    };

  },
};
</script>

<style lang='less' scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>