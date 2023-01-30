import { QueryClient, QueryClientProvider } from 'react-query'
import CurrencyConverter from './CurrencyConverter/CurrencyConverter'
import { Base } from './styles'

export default function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Base>
        <CurrencyConverter />
      </Base>
    </QueryClientProvider>
  )
}
