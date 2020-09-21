import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { chat } from '../config/apis'

export default class Chat extends React.Component {
    state = {
        messages: [],
    }

    componentDidMount() {
        chat.post(`/getConversation`, { id: 'ac2685e6-fb1c-484a-ace5-fcb5209ac2cb' }, {
            headers: {
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3NjcxNGQ0LTdlNzItNGI2ZS04ZDgwLTM5YzcxNDBlMzYwYSIsInVzZXJuYW1lIjoiRGV3ZXkuTmFmdHppbmdlciIsInBhc3N3b3JkIjoiJDJhJDEwJE9mYlpUTTlpYi9ObXBOOUxXVDV1by4xaVlhLmJqMXVucTV5SlUuMno5SmV3SXk5LzBNUTdlIiwiY3JlYXRlZEF0IjoiMjAyMC0wNC0wMlQwMToxNjozOS4yMjlaIiwidXBkYXRlZEF0IjoiMjAyMC0wNC0wMlQwMToxNjozOS4yMjlaIiwiaWF0IjoxNTg3Njc0MTM1LCJleHAiOjE1OTAyNjYxMzV9.ADpqXDbqnuTx27kU5LJBlJCChYznqc6ZW6bskT0PDcU',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(async (res) => {
            const mesgs = [];
            await res.data.messages.forEach(async (x) => {
                x.picURI = res.data.profiles.find(y => x.senderId === y.id).picURI
                console.log(x)
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, [{
                        _id: Math.round(Math.random() * 1000000),
                        text: x.content,
                        createdAt: x.createdAt,
                        user: {
                            _id: 2,
                            name: 'React Native',
                            avatar: 'https://placeimg.com/140/140/any',
                        },
                    }]),
                }))
                console.log(mesgs)
            });
            // mesgs.sort((a, b) => b.createdAt - a.createdAt);
            // this.setState({ messages: mesgs });
            // this.myRef = React.createRef();
            // this.myRef.current.focusTextInput();
        })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                inverted={true}
                user={{
                    _id: 1,
                }}
            />
        )
    }
}
