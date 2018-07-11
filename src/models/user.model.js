const UserModel = require('./schemas/user.schema')

/*
 * Retrieve
 */

UserModel.getSingleUser = async userId => {
    try {
        const getUser = await UserModel.findById(userId).exec()
        return getUser
    } catch(e) {
        throw e
    }
}

module.exports = UserModel
