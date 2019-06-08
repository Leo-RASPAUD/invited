import React from 'react';

export const events = [
  {
    date: '6th of June',
    guests: [
      {
        attending: true,
        dietaryRequirements: 'Burgers',
        email: 'leo@email.com',
        name: 'Leo',
        notes: '',
        phone: '+6112345678',
      }
    ]
    host: 'Garth',
    introduction: 'Together with friends',
    location: "LP's quality meats",
    time: '8.30pm',
    type: 'Birthday',
    url: '/unique-id',
  },
];

export const EventsContext = React.createContext([]);
