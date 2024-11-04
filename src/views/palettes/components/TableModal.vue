<script setup lang="ts">
import { useBoolean } from '@/hooks'
import { createPalettes, updatePalettes } from '@/service/api/palettes'

interface Props {
  modalName?: string
}

const {
  modalName = '',
} = defineProps<Props>()

const emit = defineEmits<{
  open: []
  close: [type: CloseType]
}>()

const { bool: modalVisible, setTrue: showModal, setFalse: hiddenModal } = useBoolean(false)

const { bool: submitLoading, setTrue: startLoading, setFalse: endLoading } = useBoolean(false)

const formDefault: Entity.Palettes = {
  id: 0,
  name: '',
  palette: '',
  description: '',
}
const formModel = ref<Entity.Palettes>({ ...formDefault })

type ModalType = 'add' | 'view' | 'edit'

type CloseType = 'close' | 'submit'

const modalType = shallowRef<ModalType>('add')
const modalTitle = computed(() => {
  const titleMap: Record<ModalType, string> = {
    add: '添加',
    view: '查看',
    edit: '编辑',
  }
  return `${titleMap[modalType.value]}${modalName}`
})

async function openModal(type: ModalType = 'add', data: any) {
  emit('open')
  modalType.value = type
  showModal()
  const handlers = {
    async add() {
      formModel.value = { ...formDefault }
    },
    async view() {
      if (!data)
        return
      formModel.value = { ...data }
    },
    async edit() {
      if (!data)
        return
      formModel.value = { ...data }
    },
  }
  await handlers[type]()
}

function closeModal(type: CloseType) {
  hiddenModal()
  endLoading()
  emit('close', type)
}

defineExpose({
  openModal,
})

const formRef = ref()
async function submitModal() {
  const handlers = {
    async add() {
      delete formModel.value.id
      const { data } = await createPalettes(formModel.value)
      return data
    },
    async edit() {
      const { data } = await updatePalettes(formModel.value)
      return data
    },
    async view() {
      return true
    },
  }
  await formRef.value?.validate()
  startLoading()
  await handlers[modalType.value]() && closeModal('submit')
}

const rules = {
  name: {
    required: true,
    message: '请输入名称',
    trigger: 'blur',
  },
  palette: {
    required: true,
    message: '请输入调色板',
    trigger: 'blur',
  },
}
</script>

<template>
  <n-modal
    v-model:show="modalVisible"
    :mask-closable="false"
    preset="card"
    :title="modalTitle"
    class="w-700px"
    :segmented="{
      content: true,
      action: true,
    }"
  >
    <n-form ref="formRef" :rules="rules" label-placement="left" :model="formModel" :label-width="100" :disabled="modalType === 'view'">
      <n-grid :cols="2" :x-gap="18">
        <n-form-item-grid-item :span="2" label="名称" path="name">
          <n-input v-model:value="formModel.name" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="2" label="调色板" path="palette">
          <n-input v-model:value="formModel.palette" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="2" label="描述" path="description">
          <n-input v-model:value="formModel.description" type="textarea" />
        </n-form-item-grid-item>
      </n-grid>
    </n-form>
    <template #action>
      <n-space justify="center">
        <n-button @click="closeModal('close')">
          取消
        </n-button>
        <n-button type="primary" :loading="submitLoading" @click="submitModal">
          提交
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
