const initialState = {
  data: null,
  currentChat: null,
};

const chat = function (state = initialState, { type, payload }) {
  switch (type) {
    case 'SET_CHAT_INFO':
      return {
        ...state,
        data: payload,
      };
    case 'SET_CURRENT_CHAT':
      return {
        ...state,
        currentChat: payload,
      };

    case 'ADD_NEW_MESSAGE':
      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          messages: [...state.currentChat.messages, payload],
        },
      };
    case 'ADD_NEW_CHAT':
      return {
        ...state,
        data: [...state.data, payload],
      };
    case 'ADD_NEW_CHAT_USER':
      let { data, currentChat } = state;

      if (currentChat._id === payload.chat_id) {
        if (!currentChat.members.find((m) => m._id === payload._id)) {
          currentChat = {
            ...currentChat,
            members: [...currentChat.members, payload],
          };
        }
      }

      if (Array.isArray(state.data)) {
        data = data.map((chat) => {
          return chat._id === payload.chat_id
            ? { ...chat, members: [...chat.members, payload] }
            : chat;
        });
      }

      return {
        ...state,
        data,
        currentChat,
      };
    case 'LOGOUT':
      return {
        data: null,
        currentChat: null,
        currentChatId: null,
      };
    default:
      return state;
  }
};

export default chat;
