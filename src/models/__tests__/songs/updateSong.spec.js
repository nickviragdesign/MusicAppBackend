const mongoose = require('mongoose')
const SongModel = require('../../song.model')

const songId = mongoose.Types.ObjectId()
const artistId = mongoose.Types.ObjectId()
const newArtistId = mongoose.Types.ObjectId()

const newTags = ['tag1','tag2']
const newSong = {
    _id: songId,
    title: 'Harry Potter',
    description: 'I went through a bad breakup.',
    location: 'San Diego',
    artist: artistId
}

const updatedSong = {
    title: 'Of Mice and Men',
    description: 'I went through a bad breakup.',
    location: 'New York',
    artist: newArtistId,
    tags: ['tag1','tag3']
}

describe('Update existing song document', () => {

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

    test('Song will be updated with new properties', async () => {
        try {
            const changes = await SongModel.updateSong(testSongId, updatedSong)
            expect(changes.title).toBe('Of Mice and Men')
            expect(changes.location).toBe('New York')
            expect(changes.artist).toMatchObject(newArtistId)
            expect(changes.tags).not.toEqual(expect.arrayContaining(['tag2']))
            expect(changes.tags).toEqual(expect.arrayContaining(['tag3']))
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
