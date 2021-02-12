import chatApi from '../../services/api/chatApi';

const setChatInfo = (data) => ({
  type: 'SET_CHAT_INFO',
  payload: data,
});

export const addMessage = (msg) => ({
  type: 'ADD_NEW_MESSAGE',
  payload: msg,
});

export const joinChat = (id) => async (dispatch) => {
  return chatApi
    .joinChat(id)
    .then((data) => {
      dispatch(setChatInfo(data?.data));
      dispatch(setCurrentChat(data?.data));
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAdminChatInfo = () => async (dispatch) => {
  const data = await chatApi.getAdminChat();
  dispatch(setChatInfo(data?.data));
  return data?.data;
};

export const getChatInfo = () => async (dispatch) => {
  const { data } = await chatApi.getChat();
  Object.keys(data).length
    ? dispatch(setCurrentChat(data))
    : dispatch(setCurrentChat(null));
  return data;
};

export const setCurrentChat = (data) => ({
  type: 'SET_CURRENT_CHAT',
  payload: data,
});

export const getCurrentChatAction = (id) => async (dispatch) => {
  const data = await chatApi.getMessages(id);
  dispatch(setCurrentChat(data?.data));
};

export const addNewChatAction = (chat) => ({
  type: 'ADD_NEW_CHAT',
  payload: chat,
});

export const addNewChatUserAction = (user) => ({
  type: 'ADD_NEW_CHAT_USER',
  payload: user,
});

export const sendMessageAction = (chatId, value) => (dispatch) => {
  chatApi.sendMesage(chatId, value);
};
export const sendAdminMessageAction = (chatId, value) => (dispatch) => {
  chatApi.sendAdminMesage(chatId, value);
};
