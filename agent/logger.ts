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

/**
 * 日志类 - 单例模式
 */
export class Logger {
    private static instance: Logger;

    private constructor() {}

    /**
     * 获取日志实例
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * 调试日志
     */
    debug(message: string): void {
        console.log(this.formatMessage(LogLevel.DEBUG, message));
    }

    /**
     * 信息日志
     */
    info(message: string): void {
        console.log(this.formatMessage(LogLevel.INFO, message));
    }

    /**
     * 警告日志
     */
    warning(message: string): void {
        console.log(this.formatMessage(LogLevel.WARNING, message));
    }

    /**
     * 错误日志
     */
    error(message: string): void {
        console.log(this.formatMessage(LogLevel.ERROR, message));
    }

    /**
     * 获取当前时间戳
     */
    private getTimestamp(): string {
        const now = new Date();
        return now.toISOString();
    }

    /**
     * 根据日志等级获取颜色
     */
    private getColorForLevel(level: LogLevel): string {
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

    /**
     * 格式化日志消息
     */
    private formatMessage(level: LogLevel, message: string): string {
        const color = this.getColorForLevel(level);
        const timestamp = this.getTimestamp();
        return `${color}[${timestamp}] [${level}] ${message}${Colors.reset}`;
    }
}

// 导出日志实例
export const log = Logger.getInstance();
