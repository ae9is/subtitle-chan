export function getParam(name: string, url?: string) {
  const params = new URLSearchParams(url ?? window.location.search)
  const value = params.get(name)
  return value
}

export function getAllParams(url?: string) {
  const params = new URLSearchParams(url ?? window.location.search)
  return params
}

export function parseBoolean(value?: string | null): boolean | undefined {
  let parsed
  if (value) {
    parsed = value?.toLowerCase() === 'true'
  }
  return parsed
}

export function parseNumber(value?: string | null): number | undefined {
  let parsed
  if (value) {
    parsed = Number(value) ?? undefined
    if (parsed && isNaN(parsed)) {
      parsed = undefined
    }
  }
  return parsed
}
