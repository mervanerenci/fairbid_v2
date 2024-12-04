# FairBid 

FairBid is a decentralized auction platform built on the Internet Computer Protocol (ICP) that enables users to create and participate in multiple auction formats with fee-free ETH transactions. The platform supports English, Dutch, and Sealed-Bid auctions while providing seamless integration with Internet Identity for secure authentication.

Live version: https://2umgr-waaaa-aaaal-artta-cai.icp0.io/

We provide sellers with the tools and resources they need to showcase their products and reach a global audience through various auction formats and buyers with a transparent, seamless, and secure auction environment. From discovering unique items to placing bids and asking questions to sellers, buyers can navigate the auction process with ease.

## Key Features

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

### Ask to Seller On-chain
FairBid encourages transparent communication between buyers and sellers through the "Ask to Seller" feature. This feature allows buyers to directly communicate with sellers, facilitating inquiries, clarifications, or negotiations before placing bids.

### Internet Identity
FairBid integrates Internet Identity, a decentralized identity management solution, to ensure secure and seamless user authentication.


## Architecture

The project consists of two main canisters:

- Backend Canister (Rust): sultb-kyaaa-aaaal-arsfq-cai

- Frontend Canister (React): 2umgr-waaaa-aaaal-artta-cai

## Installation

### Prerequisites

```
- Node.js >= 16.0.0
- npm >= 7.0.0
- dfx (Internet Computer SDK)
```
### Install

```
# Clone the repository
git clone <repository-url>

cd fairbid_v2

# Install dependencies
npm install

# Start local replica
dfx start --background

# Deploy the project
dfx deploy
```

## Usage

### Creating an Auction

- Sign in with Internet Identity

- Choose auction format (English, Dutch, or Sealed-Bid)

- Set auction parameters (starting price, duration, etc.)

- Upload item details and images

- Share the generated QR code or link with potential buyers

### Participating in Auctions

- Browse available auctions

- Place bids according to auction format:

- English: Place incrementally higher bids

- Dutch: Accept current decreasing price

- Sealed-Bid: Submit private bid

## Documentation

The project structure follows a standard React application layout:
```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── contexts/       # Context providers
├── db/            # Mock database
├── layout/        # Page layouts
├── pages/         # Application pages
├── styles/        # Global styles
└── ui/            # UI components
```
## Testing

```

# Run all tests
npm test

# Run frontend tests
npm test --workspace fairbid_v2_frontend
```
## Roadmap

- [ ] Integration with additional blockchain networks
- [ ] Advanced auction analytics
- [ ] Social features and community tools
- [ ] Multi-language support
- [ ]  UX improvement, more detailed profile dashboard
- [ ] Implement NFT marketplace integration
- [ ] Expand cross-chain payment support
- [ ] Develop more comprehensive documentation

## License

This project is licensed under the GPU 3.0 License - see the LICENSE file for details.

## Acknowledgements

- Internet Computer Protocol
- Internet Identity
- Ethereum Network
- React Framework Community
