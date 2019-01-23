import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ChatMessage from "../MessageItem"

class ChatBody extends PureComponent {
    chatBodyRef = React.createRef()

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        // New message
        this.scrollToBottom()
    }

    scrollToBottom() {
        // Todo:: animate
        const node = this.chatBodyRef.current
        node.scrollTop = node.scrollHeight
    }

    render() {
        const { authUser, messages } = this.props
        return (
            <div className="chat-body" ref={this.chatBodyRef}>
                {messages.map((message) => (
                    <ChatMessage
                        body={message.body}
                        isOwner={message.from_user === authUser}
                        key={`${message.from_user}-${message.time}`}
                    />
                ))}
            </div>
        )
    }

    static propTypes = {
        authUser: PropTypes.string.isRequired,
        messages: PropTypes.array.isRequired
    }
}

export default ChatBody
