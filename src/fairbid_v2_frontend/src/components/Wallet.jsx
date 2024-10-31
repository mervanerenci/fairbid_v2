import React from 'react'
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"


const Wallet = () => {
  const { address } = useAccount()

  const { connect } = useConnect({
    connector: injected
  })

  const { disconnect } = useDisconnect()

  if (address)
    return (
      <main>
        Connected to: {address}
        <br />
        <button onClick={() => disconnect()}>Disconnect</button>
      </main>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}

export default Wallet
