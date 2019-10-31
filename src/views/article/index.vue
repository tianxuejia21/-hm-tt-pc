<template>
  <div class='container-article'>
    <!-- 筛选添加布局 -->
    <el-card>
      <div slot="header">
        <!-- 面包屑导航 -->
        <my-bread>内容导航</my-bread>
      </div>

      <!-- 表单 -->
      <el-form label-width="80px"
               size='small'>
        <el-form-item label='状态'>
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label='频道'>
          <el-select v-model="reqParams.chanel_id"
                     placeholder="请选择"
                     clearable>
            <el-option v-for="item in channelOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='日期'>
          <el-date-picker v-model="dataArr"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change='changeDate'
                          value-format='yyyy-MM-dd'>
          </el-date-picker>

        </el-form-item>
        <el-form-item>
          <el-button type='primary'
                     @click='search'>筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果布局 -->
    <el-card style='margin-top:20px'>
      <div slot='header'>
        <span>根据筛选条件共查询到{{total}}条结果</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope='scope'>
            <el-image style="width: 150px; height: 100px"
                      :src="scope.row.cover.images[0]"
                      fit="fill">
              <div slot='error'><img src='../../assets/error.gif'
                     width="150px"
                     height="100px" /></div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题"
                         prop='title'>
        </el-table-column>
        <el-table-column label="状态"
                         prop='status'>
          <template slot-scope='scope'>
            <el-tag type="info"
                    v-if='scope.row.status === 0'>草稿</el-tag>
            <el-tag v-if='scope.row.status === 1'>待审核</el-tag>
            <el-tag type="success"
                    v-if='scope.row.status === 2'>审核成功</el-tag>
            <el-tag type="warning"
                    v-if='scope.row.status === 3'>审核失败</el-tag>
            <el-tag type="danger"
                    v-if='scope.row.status === 4'>已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间"
                         prop='pubdate'>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope='scope'>
            <el-button type="primary"
                       icon="el-icon-edit"
                       circle
                       plain
                       @click='toEdit(scope.row.id)'></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       circle
                       plain
                       @click='del(scope.row.id)'></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <el-pagination background
                     layout="prev, pager, next"
                     :total="total"
                     :page-size='reqParams.per_page'
                     :current-page='reqParams.page'
                     @current-change='pager'>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        chanel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 15

      },
      channelOptions: [
        // { value: 1, label: 'java' },
        // { value: 2, label: '前端' }
      ],
      dataArr: [],
      articles: [],
      total: 0
    }
  },
  created () {
    this.getchannelOptions()
    this.getarticles()
  },
  methods: {
    // 频道渲染
    async getchannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 文章渲染
    async getarticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    // 默认传参
    pager (newpage) {
      this.reqParams.page = newpage
      this.getarticles()
    },
    // 日期
    changeDate (dataArr) {
      if (dataArr) {
        this.reqParams.begin_pubdate = dataArr[0]
        this.reqParams.end_pubdate = dataArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选查询
    search () {
      if (this.reqParams.chanel_id === '') this.reqParams.chanel_id = null
      this.reqParams.page = 1
      this.getarticles()
    },
    // 编辑
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async del (id) {
      await this.$http.delete(`articles/${id}`)
      this.$message.success('删除文章成功')
      this.getarticles()
    }
  }
}
</script>

<style scoped lang='less'></style>
