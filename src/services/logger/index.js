/**
 * Created by Ajeh Emeke on 1/22/2019.
 */
const CONSOLE_PREFIX = '[KEEPER]'

class Logger {
    prefixedConsole = null

    methodNames = [
        'log',
        'debug',
        'warn',
        'error',
        'critical',
        'emergency',
    ]

    constructor (client) {
        this.client = client
        this.prefixedConsole = this.getPrefixedConsole()
        this.methodNames.forEach(methodName => {
            Object.defineProperty(this, methodName, {
                value: (...what) => this.prefixedConsole[methodName](...what)
            })
        })
    }

    getPrefixedConsole = () => {
        const prefix = CONSOLE_PREFIX
        let prefixedConsole = {}

        this.methodNames.forEach(methodName => {
            let consoleMethod = typeof console[methodName] === 'function'
                ? console[methodName]
                : console['log']
            Object.defineProperty(prefixedConsole, methodName, {
                get: () => consoleMethod.bind(console, prefix)
            })
        })

        return prefixedConsole
    }
}

const logger = new Logger()

export default logger
