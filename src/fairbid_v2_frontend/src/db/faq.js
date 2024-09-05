import cover1 from '@assets/faq/cover1.webp';
import cover2 from '@assets/faq/cover2.webp';
import cover3 from '@assets/faq/cover3.webp';

const faq = [
    {
        question: 'Deposit ETH',
        answer: {
            text: `A non-fungible token (NFT) is a unit of data stored on a digital ledger, called a blockchain,
             that certifies a digital asset to be unique and therefore not interchangeable. NFTs can be used to
             represent items such as photos, videos, audio, and other types of digital files.`
        },
        categories: ['start', 'nft'],
        layout: ['text']
    },
    {
        question: 'How do I create an Xchain account?',
        answer: {
            text: `Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Nunc sed augue lacus viverra.
             Eget egestas purus viverra accumsan in nisl. Ullamcorper velit sed ullamcorper morbi. Amet risus nullam 
             eget felis eget nunc lobortis mattis aliquam. Sit amet commodo nulla facilisi nullam vehicula.`,
            list: [
                'Digital Currency (ETH)',
                'Crypto Wallet',
                'Connecting to NftLand',
            ],
            video: {
                id: 'UdE4GGbgSVc',
                cover: cover1,
            }
        },
        categories: ['start', 'account', 'safety'],
        layout: ['text', 'list', 'video']
    },
    {
        question: 'What is a crypto wallet?',
        answer: {
            text: `Praesent egestas ipsum ut enim pretium luctus. Praesent commodo mi orci. Nunc nibh metus, rhoncus a
             euismod vel, consectetur a eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames 
             ac turpis egestas. Nullam ac turpis nec sapien cursus auctor. Lorem ipsum dolor sit amet, consectetur 
             adipiscing elit. Aenean eu erat ligula.`
        },
        categories: ['nft', 'account', 'eth'],
        layout: ['text']
    },
    {
        question: 'How do I convert crypto to my local currency?',
        answer: {
            text: `Donec lobortis feugiat felis, quis placerat diam efficitur non. Quisque id tempor risus, eu egestas 
            dolor. Donec ut posuere sem. Cras porta risus odio, id varius purus eleifend id. Pellentesque habitant morbi 
            tristique senectus et netus et malesuada fames ac turpis egestas. Etiam sed dapibus tortor, vel pulvinar elit. 
            Aliquam iaculis tincidunt magna sed iaculis. Integer blandit sodales ultricies. Nullam vel malesuada purus. 
            Sed eu posuere tortor. Suspendisse posuere faucibus nibh, quis dapibus est eleifend tempor. Morbi sed ligula 
            interdum, pretium urna et, aliquam est. Donec mi justo, sodales a mattis eget, interdum vitae eros.`,
            list: [
                'Connect your wallet',
                'Select the currency you want to convert',
                'Enter the amount you want to convert',
                'Click on the “Convert” button',
            ]
        },
        categories: ['start', 'safety', 'eth'],
        layout: ['text', 'list']
    },
    {
        question: 'How do I purchase Ethereum (ETH)?',
        answer: {
            text: `Suspendisse potenti. Vivamus id diam a urna congue congue et id velit. Morbi elementum sem ac nunc 
            congue, a lobortis lorem fermentum. Nulla at feugiat mauris. Nulla at interdum lacus, ac finibus lectus. 
            Integer ac hendrerit nunc. Ut faucibus nisi vitae massa convallis, in lacinia elit cursus. Ut tellus elit, 
            sodales ut turpis luctus, eleifend congue est. Donec tincidunt semper urna, et euismod mauris sodales vel. 
            Maecenas a magna eu nibh varius convallis. Ut tempus vulputate tellus vel venenatis. Etiam vitae 
            pellentesque diam.`
        },
        categories: ['partners', 'eth'],
        layout: ['text']
    },
    {
        question: 'What currencies can I use on Xchain?',
        answer: {
            text: `Praesent egestas ipsum ut enim pretium luctus. Praesent commodo mi orci. Nunc nibh metus, rhoncus a
             euismod vel, consectetur a eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames 
             ac turpis egestas. Nullam ac turpis nec sapien cursus auctor. Lorem ipsum dolor sit amet, consectetur 
             adipiscing elit. Aenean eu erat ligula.`,
            list: [
                'Ethereum (ETH)',
                'Bitcoin (BTC)',
                'Tether (USDT)',
                'Binance Coin (BNB)',
                'Cardano (ADA)',
            ],
            video: {
                id: 'Wjt6yyNDWmc',
                cover: cover2,
            }
        },
        categories: ['eth', 'partners'],
        layout: ['text', 'list', 'video']
    },
    {
        question: 'How do I log out of my Xchain account or switch crypto wallets?',
        answer: {
            text: `Cras feugiat sodales augue, non suscipit libero volutpat ac. Morbi id venenatis tortor, id imperdiet 
            turpis. Donec hendrerit hendrerit erat eget efficitur. Fusce non enim massa. Pellentesque cursus tellus nec 
            accumsan suscipit. Pellentesque auctor interdum condimentum. Ut hendrerit nunc vitae venenatis tincidunt. 
            Integer quis venenatis nisl, ut pellentesque elit. Morbi dui mauris, faucibus eget sagittis nec, posuere eu nunc.`,
            list: [
                'Click on your profile picture',
                'Click on “Log out”',
                'Click on “Switch wallet”',
                'Select the wallet you want to connect',
            ]
        },
        categories: ['start', 'account', 'devs'],
        layout: ['text', 'list']
    },
    {
        question: 'Why can\'t I see my NFTs in my account?',
        answer: {
            text: `Suspendisse eu arcu imperdiet, mattis odio eget, malesuada dolor. Integer posuere felis ac diam 
            tempor venenatis. Vestibulum lobortis, odio a faucibus auctor, tellus tortor hendrerit mauris, id ultricies 
            ante ante id tellus. Praesent libero sapien, tincidunt sed lacus ut, tempor mattis tellus. Ut ac turpis 
            lobortis, tempor eros in, sodales odio. Sed accumsan, metus vitae aliquet accumsan, augue ipsum viverra orci, 
            nec dictum urna nibh ac lacus. Nullam vitae ipsum ac metus consequat interdum eget ac sem. Mauris bibendum 
            enim sodales tortor euismod, a vulputate massa bibendum.`
        },
        categories: ['nft', 'account', 'eth'],
        layout: ['text']
    },
    {
        question: 'How do I search for NFTs?',
        answer: {
            text: `Praesent egestas ipsum ut enim pretium luctus. Praesent commodo mi orci. Nunc nibh metus, rhoncus a
             euismod vel, consectetur a eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames 
             ac turpis egestas. Nullam ac turpis nec sapien cursus auctor. Lorem ipsum dolor sit amet, consectetur 
             adipiscing elit. Aenean eu erat ligula.`,
        },
        categories: ['nft', 'eth', 'sales'],
        layout: ['text']
    },
    {
        question: 'What are the key terms to know in NFTs?',
        answer: {
            text: `Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Nunc sed augue lacus viverra.
             Eget egestas purus viverra accumsan in nisl. Ullamcorper velit sed ullamcorper morbi. Amet risus nullam 
             eget felis eget nunc lobortis mattis aliquam. Sit amet commodo nulla facilisi nullam vehicula.`,
            list: [
                'Minting',
                'Burn',
                'Royalties',
                'Secondary market',
                'Whitelist',
                'Auction',
                'Reserve price',
            ]
        },
        categories: ['nft', 'devs', 'sales'],
        layout: ['text', 'list']
    },
    {
        question: 'How can I transfer an NFT via Xchain?',
        answer: {
            text: `Suspendisse eu arcu imperdiet, mattis odio eget, malesuada dolor. Integer posuere felis ac diam 
            tempor venenatis. Vestibulum lobortis, odio a faucibus auctor, tellus tortor hendrerit mauris, id ultricies 
            ante ante id tellus. Praesent libero sapien, tincidunt sed lacus ut, tempor mattis tellus. Ut ac turpis 
            lobortis, tempor eros in, sodales odio. Sed accumsan, metus vitae aliquet accumsan, augue ipsum viverra orci, 
            nec dictum urna nibh ac lacus. Nullam vitae ipsum ac metus consequat interdum eget ac sem. Mauris bibendum 
            enim sodales tortor euismod, a vulputate massa bibendum.`,
            list: [
                'Click on “My NFTs”',
                'Click on the NFT you want to transfer',
                'Click on “Transfer”',
                'Enter the wallet address of the recipient',
                'Click on “Transfer”',
            ]
        },
        categories: ['devs', 'eth', 'sales'],
        layout: ['text', 'list']
    },
    {
        question: 'How do I reset my login information?',
        answer: {
            text: `Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Nunc sed augue lacus viverra.
             Eget egestas purus viverra accumsan in nisl. Ullamcorper velit sed ullamcorper morbi. Amet risus nullam 
             eget felis eget nunc lobortis mattis aliquam. Sit amet commodo nulla facilisi nullam vehicula.`,
            video: {
                id: 'Wjt6yyNDWmc',
                cover: cover3,
            }
        },
        categories: ['account', 'start'],
        layout: ['text', 'video']
    }
];

export default faq