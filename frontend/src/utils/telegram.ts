interface TelegramWebAppUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

interface TelegramWebApp {
  initData: string
  initDataUnsafe: { user?: TelegramWebAppUser }
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: any
  BackButton: any
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

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    initData: tg?.initData || ''
  }
}

export const initTelegramWebApp = () => {
  const { tg } = useTelegram()
  if (tg) {
    tg.ready()
    tg.expand()
  }
}
