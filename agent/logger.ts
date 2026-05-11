// ANSI 颜色代码
const Colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m'
};

export enum LogLevel {
    DEBUG = 'DEBUG',
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

// 获取当前时间戳
function getTimestamp(): string {
    const now = new Date();
    return now.toISOString();
}

// 根据日志等级获取颜色
function getColorForLevel(level: LogLevel): string {
    switch (level) {
        case LogLevel.DEBUG:
            return Colors.blue;
        case LogLevel.INFO:
            return Colors.green;
        case LogLevel.WARNING:
            return Colors.yellow;
        case LogLevel.ERROR:
            return Colors.red;
        default:
            return Colors.white;
    }
}

// 格式化日志消息
function formatMessage(level: LogLevel, message: string): string {
    const color = getColorForLevel(level);
    const timestamp = getTimestamp();
    return `${color}[${timestamp}] [${level}] ${message}${Colors.reset}`;
}

// 日志对象
export const log = {
    debug: (message: string): void => {
        console.log(formatMessage(LogLevel.DEBUG, message));
    },
    info: (message: string): void => {
        console.log(formatMessage(LogLevel.INFO, message));
    },
    warning: (message: string): void => {
        console.log(formatMessage(LogLevel.WARNING, message));
    },
    error: (message: string): void => {
        console.log(formatMessage(LogLevel.ERROR, message));
    }
};
