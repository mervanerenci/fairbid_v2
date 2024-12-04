export const HEADER_LINKS = [
    {
        name: 'Home',
        isSingle: true,
        url:"/"

    },
    {
        name: 'Auctions',
        links: [
            {name: 'Explore', url: '/explore-page', isMain: true},
            {name: 'Live Auctions', url: '/explore/live-auctions'},
            {name: 'Upcoming Auctions', url: '/explore/upcoming-auctions'},
            
            // {name: 'Single item', url: '/explore/item'},
            // {name: 'Author', url: '/author'},
        ]
    },
    // {
    //     name: 'Pages',
    //     links: [
    //         {name: 'About', url: '/about'},
    //         {name: 'Help center', url: '/faq'},
    //         {name: 'Team', url: '/team'},
    //         {name: 'Ranking', url: '/ranking'},
    //         {name: 'Page 404', url: '/404'},
    //     ]
    // },
    // {
    //     name: 'Community',
    //     links: [
    //         {name: 'Blog Sidebar', url: '/blog-sidebar'},
    //         {name: 'Blog Grid', url: '/blog-grid'},
    //         {name: 'Single post', url: '/post'}
    //     ]
    // },
    {
        name: 'Create',
        isSingle: true,
        url: '/new-auction'
    },
    {
        name: 'How to Fairbid',
        isSingle: true,
        url: '/how-to-fairbid'
    },
    {
        name: 'Account',
        links: [
            {name: 'Profile', url: '/profile'},
        ]
    }
];

export const FOOTER_LINKS = [
    {
        title: 'My account',
        links: [
            {
                title: 'Profile',
                url: '/profile',
            },
            {
                title: 'Deposit',
                url: '/deposit',
            },
            {
                title: 'Withdraw',
                url: '/withdraw',
            },
            // {
            //     title: 'Settings',
            //     url: '/profile',
            // }
        ]
    },
    {
        title: 'Explore',
        links: [
            {
                title: 'Explore',
                url: '/explore-page',
            },
            {
                title: 'Live Auctions',
                url: '/explore/live-auctions',
            },
            {
                title: 'Upcoming Auctions',
                url: '/explore/upcoming-auctions',
            },
            
        ]
    },
    {
        title: 'Create',
        links: [
            {
                title: 'Create New Auction',
                url: '/new-auction',
            },
            // {
            //     title: 'Our team',
            //     url: '/team',
            // },
            // {
            //     title: 'Blog',
            //     url: '/blog-sidebar',
            // },
            // {
            //     title: 'Contact us',
            //     url: '/contacts',
            // }
        ]
    }
];

export const SOCIAL_LINKS = [
    {
        icon: 'twitter',
        url: 'https://twitter.com/',
        name: 'Twitter'
    },
    {
        icon: 'facebook',
        url: 'https://facebook.com/',
        name: 'Facebook'
    },
    {
        icon: 'instagram',
        url: 'https://instagram.com/',
        name: 'Instagram'
    },
    {
        icon: 'youtube',
        url: 'https://youtube.com/',
        name: 'Youtube'
    },
    {
        icon: 'telegram',
        url: 'https://telegram.com/',
        name: 'Telegram'
    },
    {
        icon: 'discord',
        url: 'https://discord.com/',
        name: 'Discord'
    },
    {
        icon: 'linkedin',
        url: 'https://linkedin.com/',
        name: 'Linkedin'
    }
];

export const PROFILE_SOCIAL_LINKS = [
    {
        icon: 'twitter',
        url: 'https://twitter.com/',
        name: 'Twitter'
    },
    {
        icon: 'facebook',
        url: 'https://facebook.com/',
        name: 'Facebook'
    },
    {
        icon: 'instagram',
        url: 'https://instagram.com/',
        name: 'Instagram'
    }
];