import { ChatType } from 'src/modules/chat-type/chat.type.model.js';
import { connect } from 'src/config/db.js';

connect().then(mongoose => {
    ChatType.create(
        {
            name: "General"
        }
    );

    mongoose.disconnect();
}).catch(err => {
    console.log(err);
});
