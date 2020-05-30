// all signed in users
const users =[];

//// helper functions ////

//gets a new user and checks to be sure name is not taken
const addUser =({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser) {
        return { error: 'Username is taken!' };
    };

    const user = { id, name, room };
    users.push(user);

    return { user };
};

// removes a user by id
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index, 1)[0];
    };
};

// gets a user by id
const getUser = (id) => users.find((user) => user.id === id);

// gets all users in a room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);



module.exports = { addUser, removeUser, getUser, getUsersInRoom };
