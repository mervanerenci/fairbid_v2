import React from 'react'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })

  return (
    <>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <>{ensName ? `${ensName} (${address})` : address}</>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </>
  )
}
