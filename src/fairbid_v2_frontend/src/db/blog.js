// utils
import dayjs from 'dayjs';

// assets
import img1 from '@assets/blog/1.webp';
import img2 from '@assets/blog/2.webp';
import img3 from '@assets/blog/3.webp';
import img4 from '@assets/blog/4.webp';
import img5 from '@assets/blog/5.webp';
import img6 from '@assets/blog/6.webp';
import img7 from '@assets/blog/7.webp';
import img8 from '@assets/blog/8.webp';
import img9 from '@assets/blog/9.webp';
import img10 from '@assets/blog/10.webp';
import img11 from '@assets/blog/11.webp';

const lorem = `Tincidunt tortor aliquam nulla facilisi cras fermentum. Tincidunt augue interdum velit euismod.
         Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Scelerisque in dictum
         non consectetur.`;

const blog = [
    {
        id: 'post-1',
        date: dayjs(),
        read: 3,
        comments: 2,
        shared: 1,
        title: 'Mint your own Tezos collections on Xchain',
        preview: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        img: img1,
        isPinned: true,
        categories: ['internet', 'crypto'],
    },
    {
        id: 'post-2',
        date: dayjs(),
        read: 10,
        comments: 5,
        shared: 4,
        title: 'Top 10 NFT projects that shocked the Internet with their uniqueness',
        preview: lorem,
        img: img2,
        isPinned: false,
        categories: ['internet', 'nft'],
    },
    {
        id: 'post-3',
        date: dayjs(),
        read: 5,
        comments: 3,
        shared: 2,
        title: 'The rise of the non fungible token internet having trouble',
        preview: lorem,
        img: img3,
        isPinned: false,
        categories: ['internet', 'token'],
    },
    {
        id: 'post-4',
        date: dayjs().subtract(1, 'days'),
        read: 2,
        comments: 1,
        shared: 1,
        title: 'Features of NFT games that have gained popularity in 2022',
        preview: lorem,
        img: img4,
        isPinned: false,
        categories: ['blockchain', 'nft'],
    },
    {
        id: 'post-5',
        date: dayjs().subtract(2, 'days'),
        read: 15,
        comments: 24,
        shared: 12,
        title: 'Guide to creating & selling digital art NFTs',
        preview: lorem,
        img: img5,
        isPinned: false,
        categories: ['crypto', 'nft'],
    },
    {
        id: 'post-6',
        date: dayjs().subtract(3, 'days'),
        read: 3,
        comments: 2,
        shared: 8,
        title: 'NFT art exists in the digital world collector',
        preview: lorem,
        img: img6,
        isPinned: false,
        categories: ['crypto', 'nft'],
    },
    {
        id: 'post-7',
        date: dayjs().subtract(4, 'days'),
        read: 5,
        comments: 10,
        shared: 4,
        title: 'Sell like a pro: 5 tips for selling NFTs',
        preview: lorem,
        img: img7,
        isPinned: false,
        categories: ['blockchain', 'crypto'],
    },
    {
        id: 'post-8',
        date: dayjs().subtract(5, 'days'),
        read: 2,
        comments: 1,
        shared: 1,
        title: 'How to create a digital art NFT: a step-by-step guide',
        preview: lorem,
        img: img8,
        isPinned: false,
        categories: ['internet', 'nft'],
    },
    {
        id: 'post-9',
        date: dayjs().subtract(6, 'days'),
        read: 15,
        comments: 24,
        shared: 12,
        title: 'Xchain Top sellers: the most popular NFTs of the week',
        preview: lorem,
        img: img9,
        isPinned: false,
        categories: ['internet', 'nft'],
    },
    {
        id: 'post-10',
        date: dayjs().subtract(7, 'days'),
        read: 3,
        comments: 2,
        shared: 8,
        title: 'Blockchain technology and NFTs: what is the connection?',
        preview: lorem,
        img: img10,
        isPinned: false,
        categories: ['blockchain', 'nft'],
    },
    {
        id: 'post-11',
        date: dayjs().subtract(8, 'days'),
        read: 5,
        comments: 10,
        shared: 4,
        title: 'What\'s the difference between NFTs and cryptocurrencies?',
        preview: lorem,
        img: img11,
        isPinned: false,
        categories: ['crypto', 'nft'],
    }
];

export default blog