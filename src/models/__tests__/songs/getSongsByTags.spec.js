const mongoose = require('mongoose')
const SongModel = require('../../song.model')

const songId1 = mongoose.Types.ObjectId()
const songId2 = mongoose.Types.ObjectId()
const songId3 = mongoose.Types.ObjectId()
const artistId = mongoose.Types.ObjectId()

const newTags1 = ['tag1','tag2','tag3','tag4']
const newTags2 = ['tag3','tag4','tag5','tag6']
const newTags3 = ['tag5','tag6','tag7','tag8']

const commonTags1 = ['tag3','tag4']
const commonTags2 = ['tag5','tag6']
const uncommonTags = ['tag1','tag2']
const nonexistentTag = ['tag0']

const newSong1 = {
    _id: songId1,
    title: 'Harry Potter',
    description: 'I went through a bad breakup.',
    location: 'San Diego',
    artist: artistId,
    tags: newTags1
}
const newSong2 = {
    _id: songId2,
    title: 'Willy Wonka',
    description: 'I ate a lot of candy.',
    location: 'New York',
    artist: artistId,
    tags: newTags2
}
const newSong3 = {
    _id: songId3,
    title: 'Willy Wonka',
    description: 'I ate a lot of candy.',
    location: 'New York',
    artist: artistId,
    tags: newTags3
}

describe('Test the retrieval of songs with common tags', () => {

    let testSongId1 = ''
    let testSongId2 = ''
    let testSongId3 = ''

    beforeAll(async () => {
        try {
            const dbc = await mongoose.connect('mongodb://127.0.0.1:27017/testing')
            console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        } catch(e) {
            console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        }
    })

    test('Retrieve two songs which contain common tags', async () => {
        try {
            const saveSong1 = await SongModel.addSong(newSong1, newTags1)
            expect(saveSong1.tags).toEqual(expect.arrayContaining(newTags1))
            testSongId1 = saveSong1._id

            const saveSong2 = await SongModel.addSong(newSong2, newTags2)
            expect(saveSong2.tags).toEqual(expect.arrayContaining(newTags2))
            testSongId2 = saveSong2._id

            const saveSong3 = await SongModel.addSong(newSong3, newTags3)
            expect(saveSong3.tags).toEqual(expect.arrayContaining(newTags3))
            testSongId3 = saveSong3._id

            const getSongs1 = await SongModel.getSongsByTags(commonTags1)
            console.log(getSongs1)

            const getSongs2 = await SongModel.getSongsByTags(commonTags2)
            console.log(getSongs2)

            const getSongs3 = await SongModel.getSongsByTags(uncommonTags)
            console.log(getSongs3)

            const getSongs4 = await SongModel.getSongsByTags(nonexistentTag)
            console.log(getSongs4)

            expect(getSongs1.length).toBe(2)
            expect(getSongs2.length).toBe(2)
            expect(getSongs3.length).toBe(1)
            expect(getSongs4.length).toBe(0)
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    afterEach(async () => {
        try {
            await SongModel.findByIdAndRemove(testSongId1).exec()
            await SongModel.findByIdAndRemove(testSongId2).exec()
            await SongModel.findByIdAndRemove(testSongId3).exec()
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })
})
