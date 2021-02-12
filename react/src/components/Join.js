import React, { useState, useEffect, useCallback, memo } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../services/api/axios_conf';
import { joinChat, getChatInfo } from '../store/actions/chat';
import { getUserAction } from '../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';

import joinBg from '../images/join-bg.png';

function Join({ history }) {
    const dispatch = useDispatch();
    const { user } = useSelector(({ user }) => ({
        user: user.data,
    }));
    const [chatTypes, setchatTypes] = useState([]);
    const checkData = useCallback(
        (data) => {
            if (Object.keys(data).length) {
                history.push('/chat');
            } else {
                axios.get('/chat-types').then((res) => {
                    const chatTypes = res?.data;
                    setchatTypes(chatTypes);
                });
            }
        },
        [history]
    );
    useEffect(() => {
        if (!user) {
            dispatch(getUserAction()).then((data) => {
                if (data?.role.name === 'Admin') {
                    history.push('/chat');
                }
                if (data?.role.name === 'Client') {
                    dispatch(getChatInfo()).then((data) => {
                        checkData(data);
                    });
                }
            });
        }
    }, [checkData, dispatch, user, history]);

    const handleCLick = async (e) => {
        dispatch(joinChat(e.target.id)).then(() => {
            history.push('/chat');
        });
    };

    return (
        <div className='join' style={{ backgroundImage: `url(${joinBg})` }}>
<div className='join__inner'>
        <h1 className='join__title'>Welcome to Chat</h1>
    <p className='join__text'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </p>
    <div className='join__buttons'></div>
        {chatTypes?.map((type) => {
            return (
                <button
            key={type._id}
            name={type.name}
            id={type._id}
            onClick={handleCLick}
            className='btn'
                >
                {type.name}
            </button>
            );
        })}
</div>
    </div>
);
}

export default withRouter(memo(Join));
