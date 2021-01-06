import { ChatType } from 'src/modules/chat-type/chat.type.model.js';

const ChatTypeSeeder =
    ChatType.create(
        {
            name: "Admin"
        },
        {
            name: "General"
        }
    );
export { ChatTypeSeeder };
