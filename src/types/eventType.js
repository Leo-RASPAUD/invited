import guest from './guestType';

export const lightEvent = 'name id';
export const baseEvent = `
    name
    id
    userId
    type
    host
    place
    time
    date
    details
`;
export const event = `
    ${baseEvent}
    guests {
        ${guest}
    }
`;
