import { ChatType } from 'src/modules/chat-type/chat.type.model';

const ChatTypeRepository = {
     async all() {
        return  await ChatType.find();
    }
};

export { ChatTypeRepository };
