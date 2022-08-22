export default {
    id: '1',
    users: [
        {
            id: 'u1',
            name: 'Vadim',
            imageUri:
                'https://scontent.fhan12-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=vVhbKhjuOB0AX-9XELr&_nc_ht=scontent.fhan12-1.fna&oh=00_AT8v7cop4clEiIF7sJIxpoifS8_Z75nbmlutanLFvq9cEA&oe=63256F78',
        },
        {
            id: 'u2',
            name: 'Lukas',
            imageUri:
                'https://scontent.fhan12-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=vVhbKhjuOB0AX-9XELr&_nc_ht=scontent.fhan12-1.fna&oh=00_AT8v7cop4clEiIF7sJIxpoifS8_Z75nbmlutanLFvq9cEA&oe=63256F78',
        },
    ],
    messages: [
        {
            id: 'm1',
            content: 'How are you, Lukas!',
            createdAt: '2020-10-10T12:48:00+07:00',
            user: {
                id: 'u1',
                name: 'Vadim',
            },
        },
        {
            id: 'm2',
            content: 'I am good, good',
            createdAt: '2020-10-03T14:49:00+07:00',
            user: {
                id: 'u2',
                name: 'Lukas',
            },
        },
        {
            id: 'm3',
            content: 'What about you?',
            createdAt: '2020-10-03T14:49:40+07:00',
            user: {
                id: 'u2',
                name: 'Lukas',
            },
        },
        {
            id: 'm4',
            content: 'Good as well, preparing for the stream now.',
            createdAt: '2020-10-03T14:50:00+07:00',
            user: {
                id: 'u1',
                name: 'Vadim',
            },
        },
        {
            id: 'm5',
            content: 'How is your uni going?',
            createdAt: '2020-10-03T14:51:00+07:00',
            user: {
                id: 'u1',
                name: 'Vadim',
            },
        },
        {
            id: 'm6',
            content: 'It is a bit tough, as I have 2 specializations. How about yours? Do you enjoy it?',
            createdAt: '2020-10-03T14:49:00+07:00',
            user: {
                id: 'u2',
                name: 'Lukas',
            },
        },
        {
            id: 'm7',
            content: 'Big Data is really interesting. Cannot wait to go through all the material.',
            createdAt: '2020-10-03T14:53:00+07:00',
            user: {
                id: 'u1',
                name: 'Vadim',
            },
        },
        {
            id: 'm8',
            content: 'Big Data is really interesting. Cannot wait to go through all the material.',
            createdAt: '2022-08-22T14:53:00+07:00',
            user: {
                id: 'u1',
                name: 'Vadim',
            },
        },
    ],
};
