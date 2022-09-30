const {User, Thought, Reactions} = require('../Models')
const { param } = require('../routes')

module.exports = {
    getAllThoughts(req,res){
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    getOneThought(req,res){
        Thought.findOne({_id: req.params.id})
            .select('-__v')
            .then(async (thoughts) =>
                    !thoughts
                        ? res.status(404).json({message: 'No thoughts by that ID'})
                        : res.json({thoughts})    
            )
    },
    createThought(req,res){
        Thought.create(req.body)
            .then((thoughts) =>{
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$push: {thoughts: thoughts._id}},
                    {new:true}
                );
            })
            .then((user) => 
            !user
            ? res.status(404).json({message: 'Thought created, but found no user with that ID'})
            : res.json('Created the thought 🎉')
            )

    },
    updateThought(req,res){
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    deleteThought(req,res){
        Thought.findOneAndDelete({ _id: req.params.id })
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    createReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {runValidators: true, new: true} 
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({message: 'No thought found with that ID'})
            : res.json(thought)
        )
    },
    deleteReaction(req,res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.body.reactionId}}},
            {runValidators: true, new: true} 
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({message: 'No thought found with that ID'})
            : res.json(thought)
        )
    }

    

}

