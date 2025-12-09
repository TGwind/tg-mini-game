interface TelegramWebApp {
  initData: string
  initDataUnsafe: any
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: any
  BackButton: any
  // TODO: 添加更多 Telegram WebApp API 类型
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export const useTelegram = () => {
  const tg = window.Telegram?.WebApp

  if (!tg) {
    console.warn('Telegram WebApp is not available')
  }

  // TODO: 实现 Telegram WebApp 功能封装
  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    initData: tg?.initData || '',
  }
}

export const initTelegramWebApp = () => {
  const { tg } = useTelegram()
  if (tg) {
    tg.ready()
    tg.expand()
  }
  // TODO: 实现初始化逻辑
}

