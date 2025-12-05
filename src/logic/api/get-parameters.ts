type ParameterValue = string | number | boolean | undefined
export type Parameters = Record<string, ParameterValue | ParameterValue[]>

export class GetParameters {
  private constructor(
    private readonly parameters: Parameters | undefined,
    private readonly isEmpty: boolean,
  ) {}

  public static ofEmpty(): GetParameters {
    return new GetParameters(undefined, true)
  }

  public static of(parameters: Parameters): GetParameters {
    if (GetParameters.isEmptyObject(parameters)) {
      return GetParameters.ofEmpty()
    }
    if (GetParameters.isAllValuesUndefined(parameters)) {
      return GetParameters.ofEmpty()
    }
    return new GetParameters(parameters, false)
  }

  toUrlQueryString(): string {
    if (this.isEmpty || this.parameters === undefined) {
      return ''
    }

    const urlSearchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(this.parameters)) {
      if (!Array.isArray(value)) {
        if (value === undefined) {
          continue
        }
        urlSearchParams.append(key, String(value))
        continue
      }

      for (const v of value) {
        if (v === undefined) {
          continue
        }
        urlSearchParams.append(key, String(v))
      }
    }
    return '?' + urlSearchParams.toString()
  }

  private static isEmptyObject(parameters: Parameters): boolean {
    return Object.keys(parameters).length === 0
  }

  private static isAllValuesUndefined(parameters: Parameters): boolean {
    return Object.values(parameters).every((value) => GetParameters.isEmptyValue(value))
  }

  private static isEmptyValue(value: ParameterValue | ParameterValue[]): boolean {
    if (Array.isArray(value)) {
      return value.length === 0
    }
    return value === undefined
  }
}
