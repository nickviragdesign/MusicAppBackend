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

describe('Delete song document', () => {

    let testSongId = ''

    beforeAll(async () => {
        try {
            const dbc = await mongoose.connect('mongodb://127.0.0.1:27017/testing')
            console.log(`Succesfully Connected to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        } catch(e) {
            console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/testing`)
        }
    })

    beforeEach(async () => {
        try {
            const saveSong = await SongModel.addSong(newSong, newTags)
            expect(saveSong.tags).toEqual(expect.arrayContaining(newTags))
            testSongId = saveSong._id
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    test('Song will be removed from the database', async () => {
        try {
            const check = await SongModel.getSongs()
            expect(check.length).toBe(1)

            const changes = await SongModel.removeSong(testSongId)
            expect(changes.artist).toMatchObject(newSong.artist)

            const checkAgain = await SongModel.getSongs()
            expect(checkAgain.length).toBe(0)
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })
})
