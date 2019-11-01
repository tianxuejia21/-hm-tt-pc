import Mybread from '@/components/my-bread'

import mychannel from '@/components/my-channel'

export default {
  install (Vue) {
    Vue.component('my-bread', Mybread)
    Vue.component('my-channel', mychannel)
  }
}
