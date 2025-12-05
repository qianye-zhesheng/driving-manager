import { GetApi } from '@/logic/api/get-api'
import { GetParameters } from '@/logic/api/get-parameters'
import type { Parameters } from '@/logic/api/get-parameters'

export class GetApiBuilder {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL

  private path: string | undefined
  private parameters: GetParameters | undefined

  public constructor() {}

  /**
   *
   * @param path 冒頭・末尾にスラッシュは不要
   * @returns このインスタンス
   */
  public setPath(path: string): GetApiBuilder {
    this.path = path
    return this
  }

  /**
   *
   * @param parameters リクエストパラメーターオブジェクト（オプショナル）
   * @returns このインスタンス
   */
  public setParameters(parameters: Parameters): GetApiBuilder {
    this.parameters = GetParameters.of(parameters)
    return this
  }

  public build(): GetApi {
    if (this.path === undefined) {
      throw new Error('Path must be set before building GetApi')
    }

    if (this.path.startsWith('/')) {
      throw new Error('Path must not start with a slash')
    }
    if (this.path.endsWith('/')) {
      throw new Error('Path must not end with a slash')
    }

    if (this.parameters === undefined) {
      this.parameters = GetParameters.ofEmpty()
    }

    return new GetApi(GetApiBuilder.BASE_URL, this.path, this.parameters)
  }
}
