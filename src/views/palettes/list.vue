<template>
  <div>
    <NSpace vertical>
      <n-card>
        <NSpace justify="space-between">
          <NButton type="primary" @click="createPalettes">
            <template #icon>
              <icon-park-outline-plus />
            </template>
            新建
          </NButton>
          <n-form :model="model" label-placement="left" inline :show-feedback="false">
            <n-form-item label="名称" path="name">
              <n-input v-model:value="model.name" placeholder="请输入" />
            </n-form-item>
            <n-form-item>
              <NButton type="primary" @click="getPalettesList">
                <template #icon>
                  <icon-park-outline-search />
                </template>
                搜索
              </NButton>
            </n-form-item>
          </n-form>
        </NSpace>
      </n-card>

      <n-card>
        <NSpace vertical>
          <n-data-table :columns="columns" :data="palettesList" :loading="loading" />
          <NSpace justify="end">
            <NPagination v-model:page="pageParams.page" v-model:page-size="pageParams.pageSize"
              :item-count="pageParams.total" show-size-picker :page-sizes="pageParams.pageSizes" />
          </NSpace>
        </NSpace>
      </n-card>
    </NSpace>

    <TableModal ref="tableModalRef" @close="closeModal"/>
  </div>
</template>
<script setup lang="tsx">
import { fetchPalettesList, deletePalettes } from '@/service/api/palettes'
import type { DataTableColumns } from 'naive-ui'
import { NText, NButton, NSpace, NPopconfirm } from 'naive-ui'
import TableModal from './components/TableModal.vue'

const tableModalRef = ref()

const pageParams = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
  pageSizes: [10, 20, 50, 100],
})

const model = reactive({
  name: '',
})

const palettesList = ref<Entity.Palettes[]>([])
const loading = ref(false)
const columns: DataTableColumns<Entity.Palettes> = [
  { title: 'ID', key: 'id' },
  { title: '名称', key: 'name' },
  { title: '描述', key: 'description' },
  { title: '访问量', key: 'visits' },
  { title: '收藏量', key: 'collect' },
  {
    title: '调色板', key: 'palette', render: (row) => {
      return h(NText, { class: 'text-#666' }, row.palette)
    }
  },
  { title: '创建时间', key: 'created_at' },
  { title: '更新时间', key: 'updated_at' },
  {
    title: '操作',
    key: 'action',
    render: (row) => {
      return (
        <NSpace justify="center">
          <NButton
            size="small"
            onClick={() => editPalettes(row)}
          >
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeletePalettes(row)}>
            {{
              default: () => '确认删除',
              trigger: () => <NButton size="small">删除</NButton>,
            }}
          </NPopconfirm>
        </NSpace>
      )
    },
  }
]

const getPalettesList = async () => {
  loading.value = true
  const params = {
    page: pageParams.page,
    pageSize: pageParams.pageSize,
    name: model.name,
  }
  const res = await fetchPalettesList(params)
  pageParams.total = res.data.total
  palettesList.value = res.data.list
  loading.value = false
}

const createPalettes = () => {
  console.log('createPalettes')
  tableModalRef.value.openModal('add')
}

const editPalettes = (row: Entity.Palettes) => {
  console.log('editPalettes', row)
  tableModalRef.value.openModal('edit', row)
}

const handleDeletePalettes = async (row: Entity.Palettes) => {
  const { isSuccess } = await deletePalettes(row.id ? Number(row.id) : 0)
  if (isSuccess) {
    window.$message.success('删除成功')
    getPalettesList()
  }
}

const closeModal = (type: 'close' | 'submit') => {
  if (type === 'submit') {
    getPalettesList()
  }
}

onMounted(() => {
  getPalettesList()
})
</script>
