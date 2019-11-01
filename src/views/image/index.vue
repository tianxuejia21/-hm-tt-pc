<template>
  <div class='container-image'>
    <el-card>
      <div slot='header'>
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 按钮 -->
      <div>
        <!-- 按钮单选框 -->
        <el-radio-group v-model="reqParams.collect"
                        size='small'
                        @change="toggleList">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 绿色按钮 -->
        <el-button style='float:right'
                   type="success"
                   size='small'
                   @click='dialogVisible=true'>添加素材</el-button>
        <!-- 素材列表 -->
        <div class="img_list">
          <div class="img_item"
               v-for="item in images"
               :key='item.id'>
            <img :src="item.url">
            <div class="footer"
                 v-if="!reqParams.collect">
              <span @click='toggleStatus(item)'
                    class="el-icon-star-off"
                    :class="{red:item.is_collected}"></span>
              <span @click='deleteItem(item.id)'
                    class="el-icon-delete"></span>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination background
                       layout="prev, pager, next"
                       :total="total"
                       :page-size='reqParams.per_page'
                       :current-page="reqParams.page"
                       @current-change='pager'></el-pagination>
      </div>
      <!-- 添加素材 -->
      <el-dialog title="添加素材"
                 :visible.sync="dialogVisible"
                 width="300px">
        <el-upload class="avatar-uploader"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false">
          <img v-if="imageUrl"
               :src="imageUrl"
               class="avatar" />
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        // false:全部  true：收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 对话框显示隐藏
      dialogVisible: false,
      // 上传成功后的图片地址
      imageUrl: null

    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 列表渲染
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 分页
    pager (newpage) {
      this.reqParams.page = this.newpage
      this.getImages()
    },
    // 切换列表
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 添加收藏与取消收藏
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      item.is_collected = data.collect
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },
    // 删除
    deleteItem (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {

      })
    }
  }

}
</script>

<style scoped lang='less'>
.img_list {
  padding-top: 20px;
  .img_item {
    width: 180px;
    height: 180px;
    position: relative;
    margin-right: 33px;
    margin-bottom: 20px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
