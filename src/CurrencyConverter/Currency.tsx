import React, { FC } from 'react'

import { CurrencyItem } from '../styles'
import { CurrencyType } from '../types'

type Props = {
  currency: CurrencyType
}

const Currency: FC<Props> = ({ currency }) => {
  return (
    <CurrencyItem>
      <span>{currency.country} </span>
      <span>({currency.code}) </span>
      <span>
        1 {currency.name} = {currency.rate.toFixed(4)} czech korunas
      </span>
    </CurrencyItem>
  )
}

export default Currency
