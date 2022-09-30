
const router = require('express').Router();

const {getAllThoughts,
        getOneThought,
        createThought,
        updateThought,
        deleteThought,
        createReaction,
        deleteReaction} = require('../../Controllers/thoughtsController')

router.route('/').get(getAllThoughts).post(createThought)
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)


module.exports = router;