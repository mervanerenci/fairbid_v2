import React from 'react'
import { useConnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  // Find the injected connector
  const injectedConnector = connectors.find(
    (connector) => connector.id === 'injected'
  )

  if (!injectedConnector) {
    return <p>No injected wallet found</p>
  }

  return (
    <button onClick={() => connect({ connector: injectedConnector })}>
      Connect Wallet
    </button>
  )
}
