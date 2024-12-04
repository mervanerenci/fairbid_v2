# Fairbid
FairBid is a decentralized p2p auction marketplace offering transparent, fee-free & cross-chain transactions and multiple auction formats, leveraging the Internet Computer for a seamless, secure, and user-friendly experience.

We provide sellers with the tools and resources they need to showcase their products and reach a global audience through various auction formats and buyers with a transparent, seamless, and secure auction environment. From discovering unique items to placing bids and asking questions to sellers, buyers can navigate the auction process with ease. 

FairBid utilizes Internet Computer blockchain to record every transaction securely, providing transparency and immutability.



## Key Features

key features of Fairbid:

- Cross-chain Gasless Payments: Seller can choose to facilitate payments using ETH with zero transaction fees on the Internet Computer.
- Multiple Auction Types: Supports English, Dutch, and sealed-bid auctions.
- Whitelist Option: Enable controlled access by adding a whitelist.
- Ask to Seller: Directly ask seller questions about the item, on-chain.
- Easy Sharing: Participate quickly by sharing QR codes.
- Scheduled or Instant Auctions: Flexible auction timing options.
- Listing Option:** List auctions on the site for greater visibility.
- Buy Code For Added Security: When an auction ends a random number is generated, only the seller and winner can see the buy
code. This way, users who do not want to be paid with ETH can communicate securely during the shopping process.
- Frictionless Onboarding: Internet Identity for seamless user onboarding.
- Custom Usernames: Create personalized usernames.

Fairbid is designed to simplify the auction organization process, making it more efficient, transparent, and accessible for everyone. Even non-crypto users can benefit from the technology without needing to understand complexities of Web3. Also, Ethereum users can enjoy free transactions when paying for a product or receiving payments on the platform.

### Multiple Auction Formats
FairBid caters to different auction preferences by offering various formats:
- English Auction: Price starts low and increases until the last bidder remains.
- Dutch Auctions: Start with a high price that decreases over time until a bid is made.
- Sealed-Bid Auctions: Participants submit private bids, with the highest bidder winning the auction.

### Seamless ETH Integration
- ETH Deposits and Credits: Deposit ETH into FairBid and use it as FairBid Credits with zero fees.
- Withdrawals: Withdraw funds to Ethereum as ETH or to the Internet Computer as ckETH, ensuring flexible asset management.
- Credit System: Our innovative credit system supports fee-free transactions, enhancing the user experience.

### Advanced Auction Customization
- Scheduled Auctions: Users can schedule auctions in advance, providing better planning and participation.
- Whitelist Management: Sellers can restrict participation to a select group of bidders using customizable whitelists.
- Visibility Control: Auctions can be made public or private, giving sellers control over their audience.
- Custom Usernames: Users can create unique usernames, enhancing their identity and interaction on the platform.

### Ask to Seller
FairBid encourages transparent communication between buyers and sellers through the "Ask to Seller" feature. This feature allows buyers to directly communicate with sellers, facilitating inquiries, clarifications, or negotiations before placing bids.

### Internet Identity
FairBid integrates Internet Identity, a decentralized identity management solution, to ensure secure and seamless user authentication.

- Listing Option: List auctions on the site for greater visibility.
- Buy Code For Added Security: When an auction ends a random number is generated, only the seller and winner can see the buy
code. This way, users who do not want to be paid with ETH can communicate securely during the shopping process.






To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Rust Canister Development Guide](https://internetcomputer.org/docs/current/developer-docs/backend/rust/)
- [ic-cdk](https://docs.rs/ic-cdk)
- [ic-cdk-macros](https://docs.rs/ic-cdk-macros)
- [Candid Introduction](https://internetcomputer.org/docs/current/developer-docs/backend/candid/)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd fairbid_v2/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.



### Note on frontend environment variables
- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
