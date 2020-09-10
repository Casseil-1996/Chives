<template>
  <div id="List">
    {{fundList}}
    <Button @click="getFundList">11111</Button>
  </div>
</template>

<script>
import { mapActions, useStore } from 'vuex'
import { Button } from 'ant-design-vue'
import { toRefs } from 'vue'
export default {
  name: 'List',
  setup () {
    const store = useStore()
    const state = {
      fundList: store.getters.fundList
    }
    return {
      ...toRefs(state),
      Button
    }
  },
  methods: {
    ...mapActions(['getFundList']),
  }
}
</script>
