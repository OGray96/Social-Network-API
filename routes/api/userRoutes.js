
const router = require('express').Router();

const {getAllUsers, 
        createUser, 
        getUser, 
        updateUser, 
        deleteUser, 
        addFriend,
        deleteFriend} = require('../../Controllers/userController')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;