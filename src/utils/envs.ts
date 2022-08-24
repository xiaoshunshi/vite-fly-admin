const env = import.meta.env

const { MODE } = env
export function getEnvs ():{envStr:string} {
  let envStr = ''
  if (MODE === 'development') {
    envStr = 'dev'
  } else {
    envStr = 'pro'
  }
  return {
    envStr
  }
}
