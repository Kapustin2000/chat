import Mongoose from 'mongoose';
import Bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const SearchSchema = new Mongoose.Schema({
   user_id: {
       type: String,
       required: true
   }
});

const Search = Mongoose.model('Search', SearchSchema);

export { Search };
