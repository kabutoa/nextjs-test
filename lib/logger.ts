import pino from 'pino'

// 创建日志配置
const config = {
  // 开发环境下打印更美观的日志
  transport: process.env.NODE_ENV !== 'production' 
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      }
    : undefined,
  // 设置基础日志级别
  level: process.env.LOG_LEVEL || 'info',
  // 添加默认的时间戳
  timestamp: true,
}

// 创建logger实例
const logger = pino(config)

// 导出logger实例
export default logger

// 创建子logger的工具函数
export const createLogger = (name: string) => logger.child({ name }) 