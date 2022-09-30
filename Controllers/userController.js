const {User, Thought} = require('../Models')
const { param } = require('../routes')

module.exports = {
    getAllUsers(req,res){
        User.find()
            .then((users)=>res.json(users))
            .catch((err)=>res.status(500).json(err))
    },
    getUser(req,res){
        User.findOne({_id: req.params.id})
            .select('-__v')
            .then(async (user) => 
                !user
                    ? res.status(404).json({ message: 'No User with that ID' })
                    : res.json({user})
            )
    },
    createUser(req,res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    updateUser(req,res){
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    deleteUser(req,res){
        User.findOneAndDelete({ _id: req.params.id })
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));

    },
    addFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user)=>
            !user
            ? res.status(404).json({message: 'No user found with that ID'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },
    deleteFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user)=>
        !user
        ? res.status(404).json({message: 'No user found with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    }
}


