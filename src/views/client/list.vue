<template>
  <div>
    <NSpace vertical>
      <n-card>
        <n-form :model="model" label-placement="left" inline :show-feedback="false">
          <n-form-item label="用户名称" path="name">
            <n-input v-model:value="model.name" placeholder="请输入" />
          </n-form-item>

          <n-form-item label="OpenID" path="openid">
            <n-input v-model:value="model.openid" placeholder="请输入" />
          </n-form-item>

          <n-form-item>
            <NButton type="primary" @click="getClientList">
              <template #icon>
                <icon-park-outline-search />
              </template>
              搜索
            </NButton>
          </n-form-item>
        </n-form>

      </n-card>
      <n-card>
        <NSpace vertical>
          <n-data-table :columns="columns" :data="clientList" :loading="loading" />

          <NSpace justify="end">
            <NPagination v-model:page="pageParams.page" v-model:page-size="pageParams.pageSize"
              :item-count="pageParams.total" show-size-picker :page-sizes="pageParams.pageSizes" />
          </NSpace>
        </NSpace>
      </n-card>
    </NSpace>
  </div>
</template>
<script setup lang="tsx">
import { fetchClientList } from '@/service/api/client'
import type { DataTableColumns } from 'naive-ui'
import { NImage, NText } from 'naive-ui'

const loading = ref(false)

const model = reactive({
  name: '',
  openid: '',
})

const pageParams = reactive({
  page: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  total: 0,
})

const clientList = ref<Entity.Client[]>([])

const columns: DataTableColumns<Entity.Client> = [
  {
    title: '用户名称',
    key: 'name',
  },
  {
    title: '邮箱',
    key: 'email',
    render: (row) => {
      return h(NText, { class: 'text-#666' }, row.email ? row.email : '-')
    },
  },
  {
    title: '头像',
    key: 'avatar',
    render: (row) => {
      return h(NImage, { src: row.avatar, width: 40 })
    },
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: 'OpenID',
    key: 'openid',
  },
  {
    title: '创建时间',
    key: 'created_at',
  },
  {
    title: '更新时间',
    key: 'updated_at',
  },
]

const getClientList = async () => {
  loading.value = true
  const params = {  
    page: pageParams.page,
    pageSize: pageParams.pageSize,
    name: model.name,
    openid: model.openid,
  }
  const { isSuccess, data } = await fetchClientList(params)
  if (isSuccess && data) {
    clientList.value = data.list
    pageParams.total = data.total
  }
  loading.value = false
}

onMounted(() => {
  getClientList()
})
</script>
