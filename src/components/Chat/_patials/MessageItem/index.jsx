import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classname from 'classname'

class ChatMessage extends PureComponent {
    render() {
        const { body, isOwner } = this.props
        return (
            <div
                className={classname('chat-message', {
                    'owner': isOwner
                })}
            >
                { body }
            </div>
        )
    }

    static propTypes = {
        body: PropTypes.string.isRequired,
        isOwner: PropTypes.bool.isRequired,
    }
}

export default ChatMessage
