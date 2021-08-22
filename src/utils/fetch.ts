export function applyQueryParams(endpoint: string, queryParams: Record<string, string | number | boolean>) {
  const paramKeys = Object.keys(queryParams)
  const queryParamString = paramKeys.reduce((intermediateString, key, index) => {
    const prefix = index === 0 ? '?' : '&'
    return `${intermediateString}${prefix}${key}=${queryParams[key]}`
  }, '')

  return endpoint + queryParamString
}
