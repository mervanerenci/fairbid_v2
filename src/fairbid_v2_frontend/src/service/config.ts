import { createPublicClient, http, createClient } from "viem"
import { createConfig } from "wagmi"
import {  sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'



export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  }
})