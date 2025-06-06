import { PostApi } from '@/logic/api/post-api'

export class PostApiBuilder {
  private static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL

  private path: string | undefined
  private JSONstringifiedBody: string | undefined

  public constructor() {}

  /**
   *
   * @param path 冒頭・末尾にスラッシュは不要
   * @returns このインスタンス
   */
  public setPath(path: string): PostApiBuilder {
    this.path = path
    return this
  }

  /**
   *
   * @param JSONBody JSON形式のオブジェクト
   * @returns このインスタンス
   */
  public setBody(JSONBody: unknown): PostApiBuilder {
    this.JSONstringifiedBody = JSON.stringify(JSONBody)
    return this
  }

  public build(): PostApi {
    if (this.path === undefined) {
      throw new Error('Path must be set before building PostApi')
    }
    if (this.JSONstringifiedBody === undefined) {
      throw new Error('Body must be set before building PostApi')
    }

    if (this.path.startsWith('/')) {
      throw new Error('Path must not start with a slash')
    }
    if (this.path.endsWith('/')) {
      throw new Error('Path must not end with a slash')
    }

    return new PostApi(PostApiBuilder.BASE_URL, this.path, this.JSONstringifiedBody)
  }
}
