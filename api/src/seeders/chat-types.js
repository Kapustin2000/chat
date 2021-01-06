import { ChatType } from 'src/modules/chat-type/chat.type.model.js';
import { connect } from 'src/config/db.js';

const ChatTypeSeeder = connect().then(() => {
    ChatType.create(
        {
            name: "Admin"
        },
        {
            name: "General"
        }
    ).then(data => {
        console.log("Chat type seeder ok");
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err);
});

export { ChatTypeSeeder };
