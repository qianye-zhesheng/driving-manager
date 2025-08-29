import { PutApi } from '@/logic/api/put-api'

export class PutApiBuilder {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL

  private path: string | undefined
  private JSONstringifiedBody: string | undefined

  public constructor() {}

  /**
   *
   * @param path 冒頭・末尾にスラッシュは不要
   * @returns このインスタンス
   */
  public setPath(path: string): PutApiBuilder {
    this.path = path
    return this
  }

  /**
   *
   * @param JSONBody JSON形式のオブジェクト
   * @returns このインスタンス
   */
  public setBody(JSONBody: unknown): PutApiBuilder {
    this.JSONstringifiedBody = JSON.stringify(JSONBody)
    return this
  }

  public build(): PutApi {
    if (this.path === undefined) {
      throw new Error('Path must be set before building PutApi')
    }
    if (this.JSONstringifiedBody === undefined) {
      throw new Error('Body must be set before building PutApi')
    }

    if (this.path.startsWith('/')) {
      throw new Error('Path must not start with a slash')
    }
    if (this.path.endsWith('/')) {
      throw new Error('Path must not end with a slash')
    }

    return new PutApi(PutApiBuilder.BASE_URL, this.path, this.JSONstringifiedBody)
  }
}
