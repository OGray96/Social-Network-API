const { Types, Schema, model } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
  {
    reactionId:{
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody:{
      type: String,
      required:true,
      max_length:280,
    },
    username:{
      type:String,
      required:true,
    },
    createdAt:{
      type:Date,
      default: Date.now,
      get: date => moment(date).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON:{
      getters:true
    },
    id:false
  }
)




const thoughtSchema = new Schema(
  {
    thoughtText:{
        type: String,
        required: true,
        max_length: 280,
        min_length: 1
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: date => moment(date).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: [
        {
            type: String,
            required: true
        }
    ],
    reactions: [reactionSchema]
  },
  {
    toJSON:{
        virtuals: true,
        getters:true
    },
    id:false
  }
)

thoughtSchema
  .virtual('reactionCount')
  .get(function(){
    return this.reactions.length;
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought
