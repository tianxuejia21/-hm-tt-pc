<template>
  <el-select :value="value"
             placeholder="请选择"
             clearable
             @change="fn">
    <el-option v-for="item in channelOptions"
               :key="item.id"
               :label="item.name"
               :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getchannel()
  },
  methods: {
    // 值改变函数
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    },
    async getchannel () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
