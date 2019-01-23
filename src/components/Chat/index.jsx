import './index.scss'

import React, {Component, Fragment} from 'react'
import { toast } from 'react-toastify'
import ChatBody from "./_patials/ChatBody/index"
import mockedMessages from './__mocks__/messages'
import api from '../../services/api'
import ChatHeader from "./_patials/ChatHeader"

// Todo:: move to redux store when creating auth module
const authUser = 'fake_user'
const fakeUser = 'user_312'

const INTERVAL = 30 // fetch interval in secs

class Chat extends Component {
    state = {
        messages: mockedMessages,
        isSubmittingMessage: false
    }

    historyFetchTimer = null
    chatInputRef = React.createRef()

    componentDidMount = async () => {
        try {
            await this.loadChatHistory()
        } catch (err) {}
    }

    componentWillUnmount = () => {
        if (this.historyFetchTimer) {
            clearTimeout(this.historyFetchTimer)
        }
    }

    tick = () => {
        this.historyFetchTimer = setTimeout(this.loadChatHistory, INTERVAL * 1000)
    }

    loadChatHistory = async () => {
        try {
            const resp = await api.chat.getTestChat(fakeUser, authUser)
            if (resp.data.error === false) return

            const messages = resp.data.filter(m => !(
                m.to_user === 'undefined'
                || m.from_user === 'undefined'
                || m.body === 'undefined'
            ))

            messages.length && this.setState({ messages })
        } catch(err) {}

        this.tick()
    }

    injectQuickReply = (value) => {
        if (!value) return
        this.chatInputRef.current.value = value
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { isSubmittingMessage } = this.state
        const body = this.chatInputRef.current.value

        if (isSubmittingMessage) return
        if (body === '') return

        this.setState({
            isSubmittingMessage: true
        }, () => {
            this.chatInputRef.current.value = ''
        })

        try {
            await this.submitMessage(body)

            // Refresh when successful
            if (this.historyFetchTimer)
                clearTimeout(this.historyFetchTimer)

            try {
                await this.loadChatHistory()
            } catch (err) {}
        } catch(err) {
            // handled globally via interceptors
        }
    }

    submitMessage = async (body) => {
        try {
            // Todo:: implement cancelable xhr request
            const resp = await api.chat.sendTestMsg(fakeUser, authUser, body)

            // Todo:: If successful, push to array of messages

            // Error
            if (resp.data.error === true) {
                toast.error('Unable to process your request')
                throw new Error()
            }
        } catch(err) {
            // Ask user whether they want to retry sending the same message
            // Todo:: push to chat body with a retry button
            confirm('Failed! Retry sending: ' + body) && await this.submitMessage(body)
        }

        this.setState({
            isSubmittingMessage: false
        })
    }

    render() {
        const { messages, isSubmittingMessage } = this.state

        return (
            <div id="chat-main">
                <ChatHeader onSelectQuickReply={this.injectQuickReply} />

                <ChatBody messages={messages} authUser={authUser}/>

                <form
                    action="javascript:"
                    onSubmit={this.handleSubmit}
                >
                    <div className="chat-footer">

                            <div className="input-wrapper">
                                <input
                                    className="message"
                                    placeholder="Enter your message"
                                    ref={this.chatInputRef}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Chat
