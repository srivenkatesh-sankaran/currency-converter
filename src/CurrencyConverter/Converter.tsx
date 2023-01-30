import React, { FC, useState } from 'react'

import {
  ConverterItem,
  ConverterSelect,
  ConverterSourceValue,
  ConverterTargetValue,
  ConverterWrapper,
  SourceLabel,
  Text
} from '../styles'
import { CurrencyType } from '../types'

type Props = {
  currencies: CurrencyType[]
}

const Converter: FC<Props> = ({ currencies }) => {
  const [source, setSource] = React.useState<string>('1')
  const [selectedCodeIndex, setSelectedCodeIndex] = useState<number>(0)
  const [target, setTarget] = React.useState<number>(currencies?.[0]?.rate)

  React.useEffect(() => {
    setTarget(Number(source) / currencies?.[selectedCodeIndex]?.rate ?? 0)
  }, [selectedCodeIndex, currencies, source])

  const handleOnInputChange = (e: { target: { value: string } }) => {
    // Sanitizing input values to whole numbers and decimals only.
    if (/^\d{0,9}(\.\d{0,4})?$/.test(e?.target?.value))
      setSource(e?.target?.value)
  }

  return (
    <ConverterWrapper>
      <Text>
        Enter the amount and select the currency you want to convert to from the
        list
      </Text>
      <ConverterItem>
        <SourceLabel> CZK </SourceLabel>
        <ConverterSourceValue
          tabIndex={0}
          type="text"
          value={source}
          onChange={handleOnInputChange}
        />
      </ConverterItem>

      <ConverterItem>
        <ConverterSelect
          tabIndex={0}
          value={selectedCodeIndex}
          onChange={(e) => setSelectedCodeIndex(Number(e?.target?.value))}
        >
          {currencies.map((currency: CurrencyType, index: number) => (
            <option key={currency.code} value={index}>
              {currency.code}
            </option>
          ))}
        </ConverterSelect>
        <ConverterTargetValue>{target.toFixed(4)}</ConverterTargetValue>
      </ConverterItem>
    </ConverterWrapper>
  )
}

export default Converter
