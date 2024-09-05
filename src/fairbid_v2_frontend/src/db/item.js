// utils
import dayjs from 'dayjs';

// assets
import img1 from '@assets/item/1.webp';
import img2 from '@assets/item/2.webp';
import img3 from '@assets/item/3.webp';
import img4 from '@assets/item/4.webp';
import img5 from '@assets/item/5.webp';
import img6 from '@assets/item/6.webp';
import img7 from '@assets/item/7.webp';
import img8 from '@assets/item/8.webp';
import img9 from '@assets/item/9.webp';
import img10 from '@assets/item/10.webp';
import img11 from '@assets/item/11.webp';
import img12 from '@assets/item/12.webp';
import img13 from '@assets/item/13.webp';
import img14 from '@assets/item/14.webp';
import img15 from '@assets/item/15.webp';
import img16 from '@assets/item/16.webp';
import img17 from '@assets/item/17.webp';

const item = {
    bids: [
        {
            id: 'bid-1',
            price: 0.09,
            user: {
                name: 'Helen Freeman',
                avatar: img1,
                isVerified: true
            },
            date: dayjs().subtract(10, 'minutes'),
            active: true
        },
        {
            id: 'bid-2',
            price: 2.00,
            user: {
                name: 'Tammy Roberts',
                avatar: img2,
                isVerified: true
            },
            date: dayjs().subtract(10, 'minutes'),
            active: true
        },
        {
            id: 'bid-3',
            price: 0.47,
            user: {
                name: 'Jean Weber',
                avatar: img3,
                isVerified: false
            },
            date: dayjs().subtract(12, 'minutes'),
            active: true
        },
        {
            id: 'bid-4',
            price: 0.21,
            user: {
                name: 'Maria Wilson',
                avatar: img4,
                isVerified: true
            },
            date: dayjs().subtract(32, 'minutes'),
            active: true
        },
        {
            id: 'bid-5',
            price: 0.38,
            user: {
                name: 'Shannon Ramirez',
                avatar: img5,
                isVerified: false
            },
            date: dayjs().subtract(1, 'hours'),
            active: true
        },
        {
            id: 'bid-6',
            price: 1.10,
            user: {
                name: 'Diana Day',
                avatar: img6,
                isVerified: true
            },
            date: dayjs().subtract(1, 'hours'),
            active: true
        },
        {
            id: 'bid-7',
            price: 4.94,
            user: {
                name: 'Ray Blues',
                avatar: img7,
                isVerified: true
            },
            date: dayjs().subtract(4, 'hours'),
            active: false
        },
        {
            id: 'bid-8',
            price: 0.59,
            user: {
                name: 'Jolly Molly',
                avatar: img8,
                isVerified: false
            },
            date: dayjs().subtract(12, 'hours'),
            active: false
        },
        {
            id: 'bid-9',
            price: 1.15,
            user: {
                name: 'Stacy Night',
                avatar: img9,
                isVerified: false
            },
            date: dayjs().subtract(14, 'hours'),
            active: false
        },
        {
            id: 'bid-10',
            price: 2.40,
            user: {
                name: 'Bjorn Nord',
                avatar: img10,
                isVerified: true
            },
            date: dayjs().subtract(14, 'hours'),
            active: false
        },
        {
            id: 'bid-11',
            price: 14.01,
            user: {
                name: 'Black Orchid',
                avatar: img11,
                isVerified: true
            },
            date: dayjs().subtract(1, 'days'),
            active: false
        },
        {
            id: 'bid-12',
            price: 0.024,
            user: {
                name: 'Anna Purple',
                avatar: img12,
                isVerified: true
            },
            date: dayjs().subtract(1, 'days'),
            active: false
        },
        {
            id: 'bid-13',
            price: 0.47,
            user: {
                name: 'Hazel Minnie',
                avatar: img13,
                isVerified: false
            },
            date: dayjs().subtract(4, 'days'),
            active: false
        },
        {
            id: 'bid-14',
            price: 1.19,
            user: {
                name: 'Tommy Lee',
                avatar: img14,
                isVerified: true
            },
            date: dayjs().subtract(7, 'days'),
            active: false
        },
        {
            id: 'bid-15',
            price: 2.12,
            user: {
                name: 'Derek Falcon',
                avatar: img15,
                isVerified: true
            },
            date: dayjs().subtract(10, 'days'),
            active: false
        },
        {
            id: 'bid-16',
            price: 0.15,
            user: {
                name: 'Liara Kelly',
                avatar: img16,
                isVerified: false
            },
            date: dayjs().subtract(14, 'days'),
            active: false
        },
        {
            id: 'bid-17',
            price: 5.31,
            user: {
                name: 'Tia Smith',
                avatar: img17,
                isVerified: true
            },
            date: dayjs().subtract(25, 'days'),
            active: false
        },
    ],
    details: {
        owner: '0x1435fabhf…b3ec',
        background: 'Colorful',
        blockchain: 'Ethereum',
        category: 'Abstract'
    },
    likes: 4561
};

export default item