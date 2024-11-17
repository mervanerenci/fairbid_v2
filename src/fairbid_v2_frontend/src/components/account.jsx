import React from 'react'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { truncateMiddle } from '@utils/helpers'
import styles from './account.module.scss'

export function Account() {
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })

  const displayAddress = ensName || (address ? truncateMiddle(address, 6, 4) : '')

  return (
    <div className={`${styles.container} d-flex align-items-center g-10 bg-secondary`}>
      {displayAddress && (
        <>
          <span className="text-bold">{displayAddress}</span>
          <button 
            onClick={() => disconnect()} 
            className="btn btn--outline"
            aria-label="Disconnect wallet"
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  )
}










// import React from 'react'
// import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

// export function Account() {
//   const { address } = useAccount()
//   const { disconnect } = useDisconnect()
//   const { data: ensName } = useEnsName({ address })
//   const { data: ensAvatar } = useEnsAvatar({ name: ensName })

//   return (
//     <>
      
//       {address && <>{ensName ? `${ensName} (${address})` : address}</>}
//       <button onClick={() => disconnect()}>Disconnect</button>
//     </>
//   )
// }
