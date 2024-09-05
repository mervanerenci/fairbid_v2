// utils
import dayjs from 'dayjs';

// assets
import img1 from '@assets/activity/1.webp';
import img2 from '@assets/activity/2.webp';
import img3 from '@assets/activity/3.webp';
import img4 from '@assets/activity/4.webp';
import img5 from '@assets/activity/5.webp';
import img6 from '@assets/activity/6.webp';
import img7 from '@assets/activity/7.webp';
import img8 from '@assets/activity/8.webp';
import img9 from '@assets/activity/9.webp';
import img10 from '@assets/activity/10.webp';
import img11 from '@assets/activity/11.webp';
import img12 from '@assets/activity/12.webp';
import img13 from '@assets/activity/13.webp';
import img14 from '@assets/activity/14.webp';
import img15 from '@assets/activity/15.webp';
import img16 from '@assets/activity/16.webp';
import img17 from '@assets/activity/17.webp';
import img18 from '@assets/activity/18.webp';
import img19 from '@assets/activity/19.webp';
import img20 from '@assets/activity/20.webp';
import img21 from '@assets/activity/21.webp';
import img22 from '@assets/activity/22.webp';
import img23 from '@assets/activity/23.webp';
import img24 from '@assets/activity/24.webp';
import img25 from '@assets/activity/25.webp';
import img26 from '@assets/activity/26.webp';
import img27 from '@assets/activity/27.webp';
import img28 from '@assets/activity/28.webp';
import img29 from '@assets/activity/29.webp';
import img30 from '@assets/activity/30.webp';

const activity = [
    {
        id: 'activity-1',
        details: {
            type: 'like'
        },
        user: {
            name: 'Larry Johnson',
            avatar: img1,
        },
        date: dayjs().subtract(11, 'minutes').toDate(),
        read: true
    },
    {
        id: 'activity-2',
        details: {
            type: 'list',
            qty: 1
        },
        user: {
            name: 'Wilma Sanchez',
            avatar: img2,
        },
        date: dayjs().subtract(14, 'minutes').toDate(),
        read: false
    },
    {
        id: 'activity-3',
        details: {
            type: 'bid',
            operation: 'cancel'
        },
        user: {
            name: 'Jonathan Mullins',
            avatar: img3,
        },
        date: dayjs().subtract(29, 'minutes').toDate(),
        read: false
    },
    {
        id: 'activity-4',
        details: {
            type: 'purchase',
            qty: 1,
            price: 0.02
        },
        user: {
            name: 'Marie Riley',
            avatar: img4,
        },
        date: dayjs().subtract(44, 'minutes').toDate(),
        read: false
    },
    {
        id: 'activity-5',
        details: {
            type: 'follow'
        },
        user: {
            name: 'Irene Roberts',
            avatar: img5,
        },
        date: dayjs().subtract(2, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-6',
        details: {
            type: 'bid',
            operation: 'cancel'
        },
        user: {
            name: 'Jeffrey Thornton',
            avatar: img6,
        },
        date: dayjs().subtract(2, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-7',
        details: {
            type: 'bid',
            operation: 'cancel'
        },
        user: {
            name: 'Pauline Thomas',
            avatar: img7,
        },
        date: dayjs().subtract(7, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-8',
        details: {
            type: 'bid',
            operation: 'cancel'
        },
        user: {
            name: 'Brandon Hunt',
            avatar: img8,
        },
        date: dayjs().subtract(7, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-9',
        details: {
            type: 'like'
        },
        user: {
            name: 'Hazel Lane',
            avatar: img9,
        },
        date: dayjs().subtract(8, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-10',
        details: {
            type: 'like'
        },
        user: {
            name: 'Linda Jacobs',
            avatar: img10,
        },
        date: dayjs().subtract(9, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-11',
        details: {
            type: 'purchase',
            qty: 4,
            price: 1.021
        },
        user: {
            name: 'Dina Kim',
            avatar: img11,
        },
        date: dayjs().subtract(11, 'days').toDate(),
        read: false
    },
    {
        id: 'activity-12',
        details: {
            type: 'follow'
        },
        user: {
            name: 'Derek B.',
            avatar: img12,
        },
        date: dayjs().subtract(11, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-13',
        details: {
            type: 'purchase',
            qty: 2,
            price: 0.08
        },
        user: {
            name: 'Levis Lee',
            avatar: img13,
        },
        date: dayjs().subtract(12, 'days').toDate(),
        read: false
    },
    {
        id: 'activity-14',
        details: {
            type: 'list',
            qty: 4
        },
        user: {
            name: 'Sandra Dorset',
            avatar: img14,
        },
        date: dayjs().subtract(12, 'days').toDate(),
        read: false
    },
    {
        id: 'activity-15',
        details: {
            type: 'follow'
        },
        user: {
            name: 'Olivia Diamond',
            avatar: img15,
        },
        date: dayjs().subtract(15, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-16',
        details: {
            type: 'list',
            qty: 1
        },
        user: {
            name: 'Sandra Dorset',
            avatar: img16,
        },
        date: dayjs().subtract(15, 'days').toDate(),
        read: false
    },
    {
        id: 'activity-17',
        details: {
            type: 'purchase',
            qty: 1,
            price: 0.01
        },
        user: {
            name: 'Judy Alvarez',
            avatar: img17,
        },
        date: dayjs().subtract(16, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-18',
        details: {
            type: 'follow'
        },
        user: {
            name: 'Ted Havana',
            avatar: img18,
        },
        date: dayjs().subtract(16, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-19',
        details: {
            type: 'like'
        },
        user: {
            name: 'Jolly Molly',
            avatar: img19,
        },
        date: dayjs().subtract(17, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-20',
        details: {
            type: 'bid',
            operation: 'place'
        },
        user: {
            name: 'Angel T.',
            avatar: img20,
        },
        date: dayjs().subtract(20, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-21',
        details: {
            type: 'like'
        },
        user: {
            name: 'Gary Newman',
            avatar: img21,
        },
        date: dayjs().subtract(21, 'days').toDate(),
        read: true
    },
    {
        id: 'activity-22',
        details: {
            type: 'purchase',
            qty: 2,
            price: 0.721
        },
        user: {
            name: 'Selena B.',
            avatar: img22,
        },
        date: dayjs().subtract(1, 'months').toDate(),
        read: true
    },
    {
        id: 'activity-23',
        details: {
            type: 'purchase',
            qty: 1,
            price: 0.459
        },
        user: {
            name: 'Nancy Drew',
            avatar: img23,
        },
        date: dayjs().subtract(1, 'months').toDate(),
        read: false
    },
    {
        id: 'activity-24',
        details: {
            type: 'like'
        },
        user: {
            name: 'Lucky Quinn',
            avatar: img24,
        },
        date: dayjs().subtract(1, 'months').toDate(),
        read: true
    },
    {
        id: 'activity-25',
        details: {
            type: 'list',
            qty: 6
        },
        user: {
            name: 'Master Chief',
            avatar: img25,
        },
        date: dayjs().subtract(1, 'months').toDate(),
        read: false
    },
    {
        id: 'activity-26',
        details: {
            type: 'purchase',
            qty: 2,
            price: 0.87
        },
        user: {
            name: 'Silvia Belle',
            avatar: img26,
        },
        date: dayjs().subtract(1, 'months').toDate(),
        read: false
    },
    {
        id: 'activity-27',
        details: {
            type: 'follow'
        },
        user: {
            name: 'Gia Holmes',
            avatar: img27,
        },
        date: dayjs().subtract(2, 'months').toDate(),
        read: false
    },
    {
        id: 'activity-28',
        details: {
            type: 'follow'
        },
        user: {
            name: 'Leon Sierra',
            avatar: img28,
        },
        date: dayjs().subtract(4, 'months').toDate(),
        read: true
    },
    {
        id: 'activity-29',
        details: {
            type: 'list',
            qty: 1
        },
        user: {
            name: 'Grace O.',
            avatar: img29,
        },
        date: dayjs().subtract(6, 'months').toDate(),
        read: false
    },
    {
        id: 'activity-30',
        details: {
            type: 'bid',
            operation: 'place'
        },
        user: {
            name: 'Oliver Magnus',
            avatar: img30,
        },
        date: dayjs().subtract(1, 'years').toDate(),
        read: true
    },
]

export default activity