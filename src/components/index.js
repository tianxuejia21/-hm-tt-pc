import Mybread from '@/components/my-bread'

import mychannel from '@/components/my-channel'

import myimage from '@/components/my-image'

export default {
  install (Vue) {
    Vue.component('my-bread', Mybread)
    Vue.component('my-channel', mychannel)
    Vue.component('my-image', myimage)
  }
}
