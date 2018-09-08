export const printBirth = child => (child.events.birth ? `* ${child.events.birth}` : null);
export const printDeath = child => (child.events.death ? `† ${child.events.death}` : null);

export const findPerson = (handle, persons) => persons.find(p => p.handle === handle);
