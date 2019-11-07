<template>
  <div class='my-image'>
    <div class='btn_box'
         @click='open'>
      <img :src="value || btnImage"
           alt="">
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible"
               width="750px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库"
                     name="image">
          <!-- 选项 -->
          <el-radio-group v-model="reqParams.collect"
                          size='small'
                          @change="toggleList">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img_list">
            <div class="img_item"
                 :class="{selected: selectedImageUrl === item.url}"
                 v-for="item in images"
                 :key='item.id'
                 @click="selectedImage(item.url)">
              <img :src="item.url">
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination background
                         layout="prev, pager, next"
                         :total="total"
                         :page-size='reqParams.per_page'
                         :current-page="reqParams.page"
                         @current-change='pager'></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片"
                     name="upload">
          <el-upload class="avatar-uploader"
                     action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                     name='image'
                     :headers='headers'
                     :show-file-list="false"
                     :on-success='uploadSuccess'>
            <img v-if="imageUrl"
                 :src="imageUrl"
                 class="avatar" />
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local'
import defaultImage from '../assets/default.png'
export default {
  props: ['value'],
  data () {
    return {
      reqParams: {
        // false:全部  true：收藏
        collect: false,
        page: 1,
        per_page: 8
      },
      // 对话框显示隐藏
      dialogVisible: false,
      activeName: 'image',
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      // 选中的图片地址
      selectedImageUrl: null,
      // 上传的图片地址
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      // 默认图片
      btnImage: defaultImage
    }
  },
  methods: {
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    // 切换列表
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页
    pager (newpage) {
      this.reqParams.page = newpage
      this.getImages()
    },
    // 列表渲染
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 图片上传成功
    uploadSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('图片上传成功')
    },
    // 确定图片
    confirmImage () {
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) {
          return this.$message.warning('请选择一张图片')
        }
        // this.btnImage = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
        this.dialogVisible = false
      } else {
        if (!this.imageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        // this.btnImage = this.imageUrl
        this.$emit('input', this.imageUrl)
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed black;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
}
.img_list {
  padding-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    position: relative;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
</style>
