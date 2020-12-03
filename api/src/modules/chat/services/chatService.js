const ChatService = {
    async save(data) {
        const { text, user_id } = data;

        let todo = new Todo({
            title: title,
            user_id: user_id
        });

        return await todo.save();
    },
};

export { ChatService };
