import React, { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import Currency from './Currency'
import Converter from './Converter'
import {
  CurrencyConverterWrapper,
  CurrencyList,
  ShowMore,
  Text
} from '../styles'
import { CurrencyType } from '../types'

const CurrencyConverter: FC<{}> = () => {
  /**
   * The API provided did not have CORS enabled. I used a proxy to get over.
   * This isn't recommended on a production application. But for the scope of this, I guess its fine.
   */

  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt'
  )}`
  const [currencies, setCurrencies] = useState<CurrencyType[] | []>([])
  const [bound, setBound] = useState<number>(5)
  const [date, setDate] = useState<string>('')

  const { data, error } = useQuery(
    ['currencies'],
    () => {
      return fetch(url)
        .then((response) => {
          if (response.ok) return response.json()
          throw new Error('Network response was not ok.')
        })
        .then((responseData) => responseData.contents)
    },
    {
      retry: 1,
      retryDelay: 3000
    }
  )

  useEffect(() => {
    const currencyList: CurrencyType[] = []
    const currencyValuesByLine = data?.split('\n')
    const dateValue = currencyValuesByLine?.[0]
      ?.substr(0, currencyValuesByLine?.[0]?.indexOf('#'))
      ?.trim()

    currencyValuesByLine?.forEach((currencyLine: string, index: number) => {
      const currencyValues = currencyLine.split('|')

      // Skipping first 2 lines since they're metadata.
      if (index > 1 && currencyValues.length === 5) {
        const currencyObj: CurrencyType = {
          country: currencyValues[0],
          name: currencyValues[1],
          amount: Number(currencyValues[2]),
          code: currencyValues[3],
          rate: Number(currencyValues[4])
        }

        // converting all amounts to 1 unit for convenience.
        if (currencyObj.amount > 1) {
          currencyObj.rate = currencyObj.rate / currencyObj.amount
          currencyObj.amount = 1
        }

        currencyList.push(currencyObj)
      }
    })

    setDate(dateValue ?? '')
    setCurrencies(currencyList)
  }, [data])

  if (error || !data)
    return <div>Something went wrong. Please try refreshing!</div>

  return (
    <>
      {currencies.length > 0 && (
        <CurrencyConverterWrapper>
          <Converter currencies={currencies} />
          <Text>Currency Conversion values as of {date}</Text>

          <CurrencyList>
            {currencies
              ?.slice(0, bound)
              ?.map((currency: CurrencyType, index: number) => (
                <Currency key={index} currency={currency} />
              ))}
          </CurrencyList>

          {bound < currencies.length && (
            <ShowMore
              onClick={() => setBound(Math.min(bound + 5, currencies.length))}
            >
              show (+{Math.min(currencies.length - bound, 5)}) more...
            </ShowMore>
          )}
        </CurrencyConverterWrapper>
      )}
    </>
  )
}

export default CurrencyConverter
