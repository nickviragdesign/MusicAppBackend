const mongoose = require('mongoose')
const SongModel = require('../../song.model')

const songId1 = mongoose.Types.ObjectId()
const songId2 = mongoose.Types.ObjectId()
const artistId = mongoose.Types.ObjectId()

const newTags = ['tag1','tag2']
const newSong1 = {
    _id: songId1,
    title: 'Harry Potter',
    description: 'I went through a bad breakup.',
    location: 'San Diego',
    artist: artistId
}
const newSong2 = {
    _id: songId2,
    title: 'Willy Wonka',
    description: 'I ate a lot of candy.',
    location: 'New York',
    artist: artistId
}

describe('Test the retrieval of a single song', () => {

    let testSongId1 = ''
    let testSongId2 = ''

    beforeAll(async () => {
        try {
            const dbc = await mongoose.connect('mongodb://127.0.0.1:27017/testing')
            console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        } catch(e) {
            console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        }
    })

    test('Retrieve one song by ObjectId', async () => {
        try {
            const saveSong1 = await SongModel.addSong(newSong1, newTags)
            expect(saveSong1.tags).toEqual(expect.arrayContaining(newTags))
            testSongId1 = saveSong1._id

            const saveSong2 = await SongModel.addSong(newSong2, newTags)
            expect(saveSong2.tags).toEqual(expect.arrayContaining(newTags))
            testSongId2 = saveSong2._id

            const getSong = await SongModel.getSingleSong(testSongId2)
            expect(getSong.location).toBe('New York');
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    afterEach(async () => {
        try {
            await SongModel.findByIdAndRemove(testSongId1).exec()
            await SongModel.findByIdAndRemove(testSongId2).exec()
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })
})
