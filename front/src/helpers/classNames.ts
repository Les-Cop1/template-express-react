export const classNames = (...args: string[]): string => {
  return args.filter(Boolean).join(' ')
}
