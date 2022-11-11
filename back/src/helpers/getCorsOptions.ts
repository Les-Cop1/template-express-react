import { CorsOptions } from 'cors'
import { networkInterfaces } from 'os'

export const getCorsOptions = (): CorsOptions => {
  if (process.env.NODE_ENV === 'development') {
    let whitelist = ['http://localhost:3000']

    const nets = networkInterfaces()

    whitelist = Object.keys(nets).reduce((tab, name) => {
      // @ts-ignore
      for (const net of nets[name]) {
        if (net && net?.family === 'IPv4') {
          tab.push(`http://${net.address}:3000`)
        }
      }
      return tab
    }, whitelist)

    return {
      origin: function (origin: any, callback: (arg0: Error | null, arg1: boolean) => void) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'), false)
        }
      },
      credentials: true,
    }
  } else {
    return { credentials: true }
  }
}
