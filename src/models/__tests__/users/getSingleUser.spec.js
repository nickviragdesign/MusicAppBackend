const mongoose = require('mongoose')
const UserModel = require('../../user.model')

const userId1 = mongoose.Types.ObjectId()
const userId2 = mongoose.Types.ObjectId()

const songId1 = mongoose.Types.ObjectId()
const songId2 = mongoose.Types.ObjectId()

const newUser1 = {
    _id: userId1,
    name: {
        first: 'Michael',
        last: 'Scott'
    },
    username: 'prisonmike',
    password: 'encrypted',
    email: 'mscott@dmifflin.com',
    shows: [
        {
            venue: 'Lizard Lounge',
            date: Date.now()
        },
        {
            venue: 'Potbelly',
            date: Date.now()
        }
    ],
    songs: [songId1, songId2]

}
const newUser2 = {
    _id: userId2,
    name: {
        first: 'Quabbitty',
        last: 'Assuance'
    },
    username: 'bobobbity69',
    password: 'encrypted',
    email: 'mungbeans@distinct-old-man-smell.com',
    shows: [
        {
            venue: 'Lizard Lounge',
            date: Date.now()
        },
        {
            venue: 'Potbelly',
            date: Date.now()
        }
    ],
    songs: [songId1, songId2]
}

describe('Test the retrieval of a single user', () => {

    let testUserId1 = ''
    let testUserId2 = ''

    beforeAll(async () => {
        try {
            const dbc = await mongoose.connect('mongodb://127.0.0.1:27017/testing')
            console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        } catch(e) {
            console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        }
    })

    test('Retrieve one user by ObjectId', async () => {
        try {
            const newUserDoc1 = new UserModel(newUser1)
            const saveUser1 = await newUserDoc1.save()
            expect(saveUser1.name.first).toBe('Michael')
            testUserId1 = saveUser1._id

            const newUserDoc2 = new UserModel(newUser2)
            const saveUser2 = await newUserDoc2.save()
            expect(saveUser2.name.first).toBe('Quabbitty')
            testUserId2 = saveUser2._id

            const getUser = await UserModel.getSingleUser(testUserId2)
            expect(getUser.username).toBe('bobobbity69')
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    afterEach(async () => {
        try {
            const delete_1 = await UserModel.findByIdAndRemove(testUserId1).exec()
            const delete_2 = await UserModel.findByIdAndRemove(testUserId2).exec()
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })
})
