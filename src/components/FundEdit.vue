<template>
  <div id="FundEdit">
    <Modal
      :title="editor.title"
      @cancel="handleCancel"
      @ok="handleOk"
      v-model:visible="visible"
    >
      <Form>
        <FormItem label="持仓成本">
          <Input
            @blur="getHoldCount"
            type="text"
            v-model:value="editor.cost"
          />
        </FormItem>
        <FormItem label="持有金额">
          <Input
            @blur="getHoldCount"
            type="text"
            v-model:value="editor.holdAmount"
          />
        </FormItem>
        <FormItem label="持有份额">
          <Input
            @blur="getCost"
            type="text"
            v-model:value="editor.holdCount"
          />
        </FormItem>
        <FormItem label="每日定投">
          <Input
            type="text"
            v-model:value="editor.investmentPlan"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { Form, Input, Modal } from 'ant-design-vue'
import { reactive, toRefs, watchEffect } from 'vue'
import { math } from '../methods'
const { div } = math
export default {
  name: 'FundEdit',
  props: {
    currentEditItem: Object
  },
  setup (props, ctx) {
    const state = reactive({
      visible: false,
      editor: {}
    })
    const handleCancel = () => {
      state.visible = false
      ctx.emit('cancel')
    }
    watchEffect(() => {
      if (!props.currentEditItem) return handleCancel()
      const { cost, holdAmount, holdCount, name: title } = props.currentEditItem
      state.editor = { cost, holdAmount, holdCount, title }
      state.visible = true
      console.log(state.visible)
    })

    const getHoldCount = () => {
      const { cost, holdAmount } = state.editor
      const holdCount = div(holdAmount, cost)
      state.editor.holdCount = holdCount.toFixed(2)
    }

    const getCost = () => {
      const { holdCount, holdAmount } = state.editor
      const cost = div(holdAmount, holdCount)
      state.editor.cost = cost.toFixed(4)
    }
    const handleOk = () => {
      console.log('handleOk')
    }
    const FormItem = Form.Item
    return {
      Form,
      FormItem,
      Input,
      Modal,
      getHoldCount,
      getCost,
      handleOk,
      ...toRefs(state),
      handleCancel
    }
  }
}
</script>
