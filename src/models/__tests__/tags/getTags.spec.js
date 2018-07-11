const mongoose = require('mongoose')
const TagModel = require('../../tag.model')

const newTags = [{tag: 'tag1'},{tag: 'tag2'},{tag: 'tag3'}]

describe('Test retrieval of all tags in collection', () => {

    let tagId_1 = ''
    let tagId_2 = ''
    let tagId_3 = ''

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
            const saveTags = await TagModel.addTag(newTags)
            tagId_1 = saveTags[0]._id
            tagId_2 = saveTags[1]._id
            tagId_3 = saveTags[2]._id
            expect(saveTags.length).toBe(3)
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    test('Three tags should be retrieved', async () => {
        try {
            const findTags = await TagModel.getTags()
            expect(findTags.length).toBe(3)
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    afterEach(async () => {
        try {
            await TagModel.findByIdAndRemove(tagId_1).exec()
            await TagModel.findByIdAndRemove(tagId_2).exec()
            await TagModel.findByIdAndRemove(tagId_3).exec()
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })
})
