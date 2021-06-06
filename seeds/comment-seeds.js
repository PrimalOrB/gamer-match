const { Comment } = require('../models');

const commentData = [
  {
    "user_id": "1",
    "game_id": "1",
    "comment_text": "this comment is a test"
  },
  {
    "user_id": "1",
    "game_id": "2",
    "comment_text": "this comment is also a test"
  },
  {
    "user_id": "1",
    "game_id": "3",
    "comment_text": "blue birds fly high"
  },
  {
    "user_id": "2",
    "game_id": "4",
    "comment_text": "super mega ultra test"
  },
  {
    "user_id": "2",
    "game_id": "1",
    "comment_text": "the wicked witch of the west"
  },
  {
    "user_id": "3",
    "game_id": "1",
    "comment_text": "w00t"
  },
  {
    "user_id": "4",
    "game_id": "2",
    "comment_text": "yo n00bz"
  },
  {
    "user_id": "4",
    "game_id": "3",
    "comment_text": "l33t hax yo"
  },
  {
    "user_id": "4",
    "game_id": "5",
    "comment_text": "super test comment"
  },
  {
    "user_id": "5",
    "game_id": "1",
    "comment_text": "this comment may or may not be slightly longer than the others"
  },
  {
    "user_id": "5",
    "game_id": "2",
    "comment_text": "who dunnit"
  },
  {
    "user_id": "5",
    "game_id": "3",
    "comment_text": "this game rox"
  },
  {
    "user_id": "5",
    "game_id": "4",
    "comment_text": "wow such amaze"
  },
  {
    "user_id": "5",
    "game_id": "5",
    "comment_text": "do you evne lift bro?"
  },
  {
    "user_id": "1",
    "game_id": "6",
    "comment_text": "owen wilson `Woooow`"
  },
  {
    "user_id": "3",
    "game_id": "6",
    "comment_text": "gotta go fast"
  },
  {
    "user_id": "4",
    "game_id": "7",
    "comment_text": "test comment 2"
  },
  {
    "user_id": "2",
    "game_id": "7",
    "comment_text": "cant think of anything else to test in comments!"
  }
];

const seedComment = () => Comment.bulkCreate( commentData );

module.exports = seedComment;
