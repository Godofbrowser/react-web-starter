import React, { Component, Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import { hot } from 'react-hot-loader'
import Chat from '../Chat'

class App extends Component {
    render() {
        return (
            <Fragment>
                <header className="main-header bg-primary text-white p-1 mb-5">
                    <div className="container py-5">
                        <h1 className="display-5 font-weight-bold text-center">Chat component</h1>
                        <p className="text-center mt-4">A basic chat interface</p>
                    </div>
                </header>

                <div className="container mb-5" style={{ minHeight: '450px' }}>
                    <Chat />
                </div>

                <ToastContainer />
            </Fragment>
        )
    }
}

// Regular export
// export default App

// Hot module replacement export
// (Disabled in production: https://github.com/gaearon/react-hot-loader#install)
export default hot(module)(App)
