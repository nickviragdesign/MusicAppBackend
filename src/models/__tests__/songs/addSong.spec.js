const mongoose = require('mongoose')
const SongModel = require('../../song.model')

const songId = mongoose.Types.ObjectId()
const artistId = mongoose.Types.ObjectId()

const newTags = ['tag1','tag2']
const newSong = {
    _id: songId,
    title: 'Harry Potter',
    description: 'I went through a bad breakup.',
    location: 'San Diego',
    artist: artistId
}

describe('Test the creation of a new song', () => {

    let testSongId = ''

    beforeAll(async () => {
        try {
            const dbc = await mongoose.connect('mongodb://127.0.0.1:27017/testing')
            console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        } catch(e) {
            console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        }
    })

    test('New song gets added', async () => {
        try {
            const saveSong = await SongModel.addSong(newSong, newTags)
            expect(saveSong.tags).toEqual(expect.arrayContaining(newTags))
            testSongId = saveSong._id
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    afterEach(async () => {
        try {
            await SongModel.findByIdAndRemove(testSongId).exec()
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })
})
