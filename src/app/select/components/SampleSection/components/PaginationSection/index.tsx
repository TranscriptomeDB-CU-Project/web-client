import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

import Pagination from '@/components/Pagination'
import Text from '@/components/Text'
import TextField from '@/components/TextField'
import { useAppDispatch, useAppSelector } from '@/store'
import sampleActions from '@/store/sample/actions'

const PaginationSection = () => {
  const count = useAppSelector((state) => state.selectedSample.count)

  const { page, limit, maxPage } = useAppSelector((state) => ({
    page: state.sample.page,
    limit: state.sample.limit,
    maxPage: state.sample.maxPage,
  }))

  const dispatch = useAppDispatch()

  const [value, setValue] = React.useState(String(limit))

  useEffect(() => {
    if (value !== String(limit)) setValue(String(limit))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  const handleLimitChange = () => {
    const val = Number(value)
    if (val < 10) toast.error('Minimum sample per page is 10')
    if (val > 50) toast.error('Maximum sample per page is 50')

    dispatch(sampleActions.setLimit(val))
  }

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Text color="black-300" style={{ fontSize: '14px', flex: 1 }}>
        {count} Selected
      </Text>
      <Text>sample/page</Text>
      <TextField
        inputProps={{ type: 'number', min: 10, max: 50, onBlur: handleLimitChange }}
        value={value}
        onChange={setValue}
      />
      {maxPage > 1 && (
        <Pagination page={page} maxPage={maxPage} onChange={(val: number) => dispatch(sampleActions.setPage(val))} />
      )}
    </div>
  )
}

export default PaginationSection
