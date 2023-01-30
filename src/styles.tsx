import styled, { css } from 'styled-components'

const baseText = css`
  margin: 20px;
  text-align: center;
  font-weight: 600;
`

export const Base = styled.div`
  font-family: sans-serif;
`

export const CurrencyConverterWrapper = styled.div`
  padding: 50px;
`

export const ConverterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`

export const ConverterItem = styled.div`
  display: flex;
  align-items: center;
  border: solid 1px #000;
  margin-bottom: 20px;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  width: 60%;
`

export const SourceLabel = styled.span`
  padding: 10px;
  margin-right: 35px;
`
const converterValueStyles = css`
  width: 90%;
  font-size: 18px;
  flex-grow: 1;
  color: #000;
  padding: 5px;
`

export const ConverterSourceValue = styled.input`
  ${converterValueStyles}
`
export const ConverterTargetValue = styled.div`
  ${converterValueStyles}
`

export const ConverterSelect = styled.select`
  border: none;
  font-size: 16px;
  margin-right: 12px;
  height: 100%;
  padding: 5px;
  cursor: pointer;
`

export const CurrencyList = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  border: solid 1px #000;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.5);
`

export const CurrencyItem = styled.div`
  padding: 10px;
  border: solid 0.5px #ddd;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 1fr;
`

export const Text = styled.div`
  ${baseText}
`

export const ShowMore = styled.div`
  ${baseText}
  cursor: pointer;
  color: darkblue;
`
