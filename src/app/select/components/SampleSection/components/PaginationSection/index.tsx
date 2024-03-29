import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

import { useSample } from '@/app/select/context/SampleContext'
import Pagination from '@/components/Pagination'
import Text from '@/components/Text'
import TextField from '@/components/TextField'

const PaginationSection = () => {
  const {
    sample: { page, setPage, maxPage, limit, setLimit },
    select: { count },
  } = useSample()

  const [value, setValue] = React.useState(String(limit))

  useEffect(() => {
    if (value !== String(limit)) setValue(String(limit))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  const handleLimitChange = () => {
    const val = Number(value)
    if (val < 10) toast.error('Minimum sample per page is 10')
    if (val > 50) toast.error('Maximum sample per page is 50')

    setLimit(val)
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
      {maxPage > 1 && <Pagination page={page} maxPage={maxPage} onChange={setPage} />}
    </div>
  )
}

export default PaginationSection
