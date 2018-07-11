const mongoose = require('mongoose')
const TagModel = require('../../tag.model')

const newTags = [{tag: 'tag1'},{tag: 'tag2'}]

describe('Test the deletion of a tag', () => {

    let tagId_1 = ''
    let tagId_2 = ''

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
            expect(saveTags.length).toBe(2)
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    test('1 tag should be deleted', async () => {
        try {
            const check = await TagModel.find({}).exec()
            expect(check.length).toBe(2)

            const deleteTag = await TagModel.removeTag(tagId_1)
            expect(deleteTag.tag).toBe('tag1')

            const checkAgain = await TagModel.find({}).exec()
            expect(checkAgain.length).toBe(1)
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })

    afterEach(async () => {
        try {
            await TagModel.findByIdAndRemove(tagId_2).exec()
        } catch(e) {
            expect(e).not.toBeTruthy()
        }
    })
})
