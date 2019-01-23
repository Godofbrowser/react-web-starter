import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import api from '../../../../services/api'

class ChatHeader extends PureComponent {
    state = {
        quickReplies: [] // Todo:: loading state/feedback
    }

    componentDidMount() {
        this.loadQuickReplies()
    }

    loadQuickReplies = async () => {
        try {
            const resp = await api.chat.getTestTable()
            if (resp.data.error === false) return

            this.setState({
                quickReplies: resp.data.map(item => item['animals'])
            })
        } catch(err) {}
    }

    onSelectQuickReply = (e) => {
        e.preventDefault()

        const value = e.target.value
        e.target.value = ''
        if (!value) return

        this.props.onSelectQuickReply(value)
    }

    render() {
        const { authUser, messages } = this.props
        const { quickReplies } = this.state

        return (
            <div className="chat-header">
                <div className="row">
                    <div className="col-6"><strong>User 312</strong></div>
                    <div className="col-6">
                        <select
                            className="form-control w-100"
                            onChange={this.onSelectQuickReply}
                        >
                            <option value="">Select Quick Reply</option>
                            {quickReplies.map(qr => (
                                <option key={qr} value={qr}>{qr}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        )
    }

    static propTypes = {
        onSelectQuickReply: PropTypes.func.isRequired,
    }
}

export default ChatHeader
