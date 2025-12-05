import { ref, computed, watch } from 'vue'

/**
 * 分页请求参数
 */
interface PaginationParams {
  page: number
  pageSize: number
}

/**
 * 分页响应数据
 */
interface PaginationResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * 分页配置
 */
interface UsePaginationOptions<T, P extends object = object> {
  /** 初始页码 */
  defaultPage?: number
  /** 初始每页条数 */
  defaultPageSize?: number
  /** 默认额外参数 */
  defaultParams?: P
  /** 获取数据的异步函数 */
  fetchData: (params: PaginationParams & P) => Promise<PaginationResult<T>>
  /** 是否立即执行 */
  immediate?: boolean
}

/**
 * 分页 Hook
 * @param options 分页配置
 */
export function usePagination<T, P extends object = object>(options: UsePaginationOptions<T, P>) {
  const {
    defaultPage = 1,
    defaultPageSize = 10,
    defaultParams = {} as P,
    fetchData,
    immediate = true,
  } = options

  // 状态
  const loading = ref(false)
  const list = ref<T[]>([]) as { value: T[] }
  const total = ref(0)
  const page = ref(defaultPage)
  const pageSize = ref(defaultPageSize)
  const params = ref<P>(defaultParams) as { value: P }

  // 计算总页数
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  // 是否有上一页
  const hasPrevPage = computed(() => page.value > 1)

  // 是否有下一页
  const hasNextPage = computed(() => page.value < totalPages.value)

  /**
   * 获取数据
   */
  const getData = async () => {
    loading.value = true
    try {
      const result = await fetchData({
        page: page.value,
        pageSize: pageSize.value,
        ...params.value,
      })
      list.value = result.list
      total.value = result.total
    } catch (error) {
      console.error('分页数据获取失败:', error)
    } finally {
      loading.value = false
    }
  }

  /**
   * 刷新当前页
   */
  const refresh = () => {
    return getData()
  }

  /**
   * 重置并刷新
   */
  const reset = () => {
    page.value = defaultPage
    pageSize.value = defaultPageSize
    params.value = defaultParams
    return getData()
  }

  /**
   * 跳转到指定页
   */
  const goToPage = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalPages.value) {
      return
    }
    page.value = targetPage
  }

  /**
   * 上一页
   */
  const prevPage = () => {
    if (hasPrevPage.value) {
      page.value--
    }
  }

  /**
   * 下一页
   */
  const nextPage = () => {
    if (hasNextPage.value) {
      page.value++
    }
  }

  /**
   * 更新每页条数
   */
  const changePageSize = (size: number) => {
    pageSize.value = size
    page.value = 1
  }

  /**
   * 更新查询参数
   */
  const setParams = (newParams: Partial<P>) => {
    params.value = { ...params.value, ...newParams }
    page.value = 1
  }

  // 监听分页变化自动获取数据
  watch([page, pageSize], () => {
    getData()
  })

  // 立即执行
  if (immediate) {
    getData()
  }

  return {
    // 状态
    loading,
    list,
    total,
    page,
    pageSize,
    params,
    totalPages,
    hasPrevPage,
    hasNextPage,
    // 方法
    getData,
    refresh,
    reset,
    goToPage,
    prevPage,
    nextPage,
    changePageSize,
    setParams,
  }
}
