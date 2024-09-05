import dayjs from 'dayjs';

import img1 from '@assets/products/1.webp';
import img2 from '@assets/products/2.webp';
import img3 from '@assets/products/3.webp';
import img4 from '@assets/products/4.webp';
import img5 from '@assets/products/5.webp';
import img6 from '@assets/products/6.webp';
import img7 from '@assets/products/7.webp';
import img8 from '@assets/products/8.webp';
import img9 from '@assets/products/9.webp';
import img10 from '@assets/products/10.webp';
import img11 from '@assets/products/11.webp';
import img12 from '@assets/products/12.webp';
import img13 from '@assets/author/1.webp';
import img14 from '@assets/author/2.webp';
import img15 from '@assets/author/3.webp';
import img16 from '@assets/author/4.webp';
import img17 from '@assets/author/5.webp';
import img18 from '@assets/author/6.webp';
import img19 from '@assets/author/7.webp';
import img20 from '@assets/author/8.webp';
import img21 from '@assets/author/9.webp';
import img22 from '@assets/author/10.webp';
import img23 from '@assets/author/11.webp';
import img24 from '@assets/author/12.webp';

import avatar1 from '@assets/products/avatar1.webp';
import avatar2 from '@assets/products/avatar2.webp';
import avatar3 from '@assets/products/avatar3.webp';
import avatar4 from '@assets/products/avatar4.webp';
import avatar5 from '@assets/products/avatar5.webp';
import avatar6 from '@assets/products/avatar6.webp';
import avatar7 from '@assets/products/avatar7.webp';
import avatar8 from '@assets/products/avatar8.webp';
import avatar9 from '@assets/products/avatar9.webp';
import avatar10 from '@assets/products/avatar10.webp';
import avatar11 from '@assets/products/avatar11.webp';
import avatar12 from '@assets/products/avatar12.webp';
import avatar13 from '@assets/products/avatar13.webp';
import avatar14 from '@assets/products/avatar14.webp';
import avatar15 from '@assets/products/avatar15.webp';
import avatar16 from '@assets/products/avatar16.webp';
import avatar17 from '@assets/products/avatar17.webp';
import avatar18 from '@assets/products/avatar18.webp';
import avatar19 from '@assets/products/avatar19.webp';
import avatar20 from '@assets/products/avatar20.webp';
import avatar21 from '@assets/products/avatar21.webp';
import avatar22 from '@assets/products/avatar22.webp';
import avatar23 from '@assets/products/avatar23.webp';
import avatar24 from '@assets/products/avatar24.webp';

const all_items = [
    {
        id: 'item-1',
        author: {
            nickname: 'narandro',
            avatar: avatar1,
            isVerified: true,
        },
        image: img1,
        title: 'Colorful 3D object',
        price: 0.08,
        qty: 1,
        available: 1,
        likes: 220,
        hot: dayjs().add(1, 'days'),
        categories: ['art', 'domain', 'collectibles'],
        statuses: ['offer', 'auction'],
        type: 'video',
    },
    {
        id: 'item-2',
        author: {
            nickname: 'navekita',
            avatar: avatar2,
            isVerified: true,
        },
        image: img2,
        title: 'Infinite figure',
        price: 1.1,
        qty: 1,
        available: 1,
        likes: 34,
        hot: dayjs().add({days: 1, hours: 12}),
        categories: ['music', 'sports', 'collectibles'],
        statuses: ['new'],
        type: 'img',
    },
    {
        id: 'item-3',
        author: {
            nickname: 'gayoren',
            avatar: avatar3,
            isVerified: false,
        },
        image: img3,
        title: 'Pixel art',
        price: 0.114,
        qty: 1,
        available: 1,
        likes: 1124,
        hot: dayjs().add(12, 'days'),
        categories: ['photo'],
        statuses: ['new', 'now'],
        type: 'img',
    },
    {
        id: 'item-4',
        author: {
            nickname: 'emarwi',
            avatar: avatar4,
            isVerified: true,
        },
        image: img4,
        title: 'The image of a man',
        price: 19.9,
        qty: 2,
        available: 1,
        likes: 2358,
        hot: dayjs().add(26, 'days'),
        categories: ['photo', 'utility'],
        statuses: ['offer', 'auction'],
        type: '3d',
    },
    {
        id: 'item-5',
        author: {
            nickname: 'zikez',
            avatar: avatar5,
            isVerified: false,
        },
        image: img5,
        title: 'Bananaaa',
        price: 1.88,
        qty: 3,
        available: 1,
        likes: 168,
        hot: dayjs().add({days: 20, hours: 10}),
        categories: ['trading', 'virtual', 'art'],
        statuses: ['offer', 'auction'],
        type: 'img',
    },
    {
        id: 'item-6',
        author: {
            nickname: 'yokoooo',
            avatar: avatar6,
            isVerified: true,
        },
        image: img6,
        title: 'Pixel art',
        price: 1.489,
        qty: 1,
        available: 1,
        likes: 380,
        hot: dayjs().add({days: 7, hours: 3}),
        categories: ['domain', 'sports', 'art'],
        statuses: ['new', 'now'],
        type: '3d',
    },
    {
        id: 'item-7',
        author: {
            nickname: 'judadz',
            avatar: avatar7,
            isVerified: true,
        },
        image: img7,
        title: 'Colorful 3D object',
        price: 0.08,
        qty: 1,
        available: 1,
        likes: 220,
        hot: dayjs().add({days: 28, hours: 12, minutes: 30}),
        categories: ['art', 'domain', 'collectibles'],
        statuses: ['offer', 'auction', 'new'],
        type: 'video',
    },
    {
        id: 'item-8',
        author: {
            nickname: 'poldommmyrol',
            avatar: avatar8,
            isVerified: false,
        },
        image: img8,
        title: 'Infinite figure',
        price: 1.1,
        qty: 1,
        available: 1,
        likes: 34,
        hot: dayjs().add({days: 1, hours: 12}),
        categories: ['music', 'sports', 'virtual'],
        statuses: ['new'],
        type: 'img',
    },
    {
        id: 'item-9',
        author: {
            nickname: 'hollywood',
            avatar: avatar9,
            isVerified: true,
        },
        image: img9,
        title: 'Outta space',
        price: 0.114,
        qty: 1,
        available: 1,
        likes: 1124,
        hot: dayjs().add(12, 'days'),
        categories: ['domain'],
        statuses: ['new', 'now'],
        type: '3d',
    },
    {
        id: 'item-10',
        author: {
            nickname: 'voltage220',
            avatar: avatar10,
            isVerified: true,
        },
        image: img10,
        title: 'Responsibility',
        price: 19.9,
        qty: 2,
        available: 1,
        likes: 2358,
        hot: dayjs().add(26, 'days'),
        categories: ['photo', 'utility'],
        statuses: ['offer', 'auction'],
        type: 'img',
    },
    {
        id: 'item-11',
        author: {
            nickname: 'soulhunter',
            avatar: avatar11,
            isVerified: false,
        },
        image: img11,
        title: 'Mother Earth',
        price: 1.88,
        qty: 3,
        available: 1,
        likes: 777,
        hot: dayjs().add({days: 20, hours: 10}),
        categories: ['music', 'virtual', 'art'],
        statuses: ['offer', 'auction'],
        type: 'video',
    },
    {
        id: 'item-12',
        author: {
            nickname: 'layla',
            avatar: avatar12,
            isVerified: false,
        },
        image: img12,
        title: 'Daydreamin',
        price: 1.489,
        qty: 1,
        available: 1,
        likes: 380,
        hot: dayjs().add({days: 7, hours: 3}),
        categories: ['domain', 'sports', 'art'],
        statuses: ['offer', 'now'],
        type: '3d',
    },
    {
        id: 'item-13',
        author: {
            nickname: 'peek-a-boo',
            avatar: avatar13,
            isVerified: true,
        },
        image: img13,
        title: 'Think pink',
        price: 1.49,
        qty: 1,
        available: 1,
        likes: 921,
        hot: dayjs().add({days: 28, hours: 12, minutes: 30}),
        categories: ['virtual', 'domain', 'music'],
        statuses: ['offer', 'auction', 'new'],
        type: 'img',
    },
    {
        id: 'item-14',
        author: {
            nickname: 'cervezachille',
            avatar: avatar14,
            isVerified: false,
        },
        image: img14,
        title: 'Alien blood',
        price: 1.1,
        qty: 1,
        available: 1,
        likes: 9784,
        hot: dayjs().add({days: 1, hours: 12}),
        categories: ['music', 'sports', 'domain'],
        statuses: ['now'],
        type: '3d',
    },
    {
        id: 'item-15',
        author: {
            nickname: 'bigfoot',
            avatar: avatar15,
            isVerified: true,
        },
        image: img15,
        title: 'Underwater',
        price: 0.35,
        qty: 1,
        available: 1,
        likes: 3784,
        hot: dayjs().add(12, 'days'),
        categories: ['music'],
        statuses: ['offer'],
        type: 'img',
    },
    {
        id: 'item-16',
        author: {
            nickname: 'sk8erboi',
            avatar: avatar16,
            isVerified: true,
        },
        image: img16,
        title: 'Golden Age',
        price: 7.04,
        qty: 2,
        available: 1,
        likes: 201,
        hot: dayjs().add(2, 'days'),
        categories: ['sports', 'collectibles', 'art'],
        statuses: ['new', 'auction'],
        type: 'video',
    },
    {
        id: 'item-17',
        author: {
            nickname: 'diamondhead',
            avatar: avatar17,
            isVerified: false,
        },
        image: img17,
        title: 'Prismatic',
        price: 10.1,
        qty: 1,
        available: 1,
        likes: 310,
        hot: dayjs().add({days: 5, hours: 8}),
        categories: ['sports', 'virtual'],
        statuses: ['offer', 'auction'],
        type: '3d',
    },
    {
        id: 'item-18',
        author: {
            nickname: 'wellington',
            avatar: avatar18,
            isVerified: false,
        },
        image: img18,
        title: 'Tranquility',
        price: 0.1,
        qty: 1,
        available: 1,
        likes: 791,
        hot: dayjs().add({days: 1, hours: 12}),
        categories: ['art'],
        statuses: ['now', 'auction'],
        type: 'img',
    },
    {
        id: 'item-19',
        author: {
            nickname: 'iamwhoiam',
            avatar: avatar19,
            isVerified: true,
        },
        image: img19,
        title: 'Labyrinth',
        price: 1.82,
        qty: 1,
        available: 1,
        likes: 347,
        hot: dayjs().add(12, 'days'),
        categories: ['music', 'photo'],
        statuses: ['new', 'auction'],
        type: '3d',
    },
    {
        id: 'item-20',
        author: {
            nickname: 'tellmemore',
            avatar: avatar20,
            isVerified: false,
        },
        image: img20,
        title: 'Octopus Garden',
        price: 0.1,
        qty: 1,
        available: 1,
        likes: 123,
        hot: dayjs().add(26, 'days'),
        categories: ['music', 'virtual', 'collectibles'],
        statuses: ['offer', 'new'],
        type: 'video',
    },
    {
        id: 'item-21',
        author: {
            nickname: 'savage',
            avatar: avatar21,
            isVerified: false,
        },
        image: img21,
        title: 'Cooldown',
        price: 10.11,
        qty: 1,
        available: 1,
        likes: 5912,
        hot: dayjs().add(1, 'days'),
        categories: ['music', 'sports', 'art'],
        statuses: ['now'],
        type: 'img',
    },
    {
        id: 'item-22',
        author: {
            nickname: 'hippieeesoul',
            avatar: avatar22,
            isVerified: true,
        },
        image: img22,
        title: 'Crystal Waterfall',
        price: 2.84,
        qty: 4,
        available: 2,
        likes: 98710,
        hot: dayjs().add(17, 'days'),
        categories: ['collectibles', 'virtual', 'art'],
        statuses: ['offer', 'auction'],
        type: 'video',
    },
    {
        id: 'item-23',
        author: {
            nickname: 'crybaby',
            avatar: avatar23,
            isVerified: true,
        },
        image: img23,
        title: 'Sahara',
        price: 7.18,
        qty: 1,
        available: 1,
        likes: 1468,
        hot: dayjs().add(3, 'days'),
        categories: ['sports', 'photo'],
        statuses: ['new', 'auction'],
        type: '3d',
    },
    {
        id: 'item-24',
        author: {
            nickname: 'tripplethreat',
            avatar: avatar24,
            isVerified: true,
        },
        image: img24,
        title: 'The Great Escape',
        price: 0.1,
        qty: 1,
        available: 1,
        likes: 666,
        hot: dayjs().add(10, 'hours'),
        categories: ['music', 'sports', 'photo'],
        statuses: ['offer', 'auction'],
        type: 'img',
    }
]

export default all_items