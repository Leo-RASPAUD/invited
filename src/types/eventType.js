import guest from './guestType';

export const lightEvent = 'name id';
export const event = `
    name
    id
    userId
    type
    host
    place
    time
    date
    guests {
        ${guest}
    }
`;
