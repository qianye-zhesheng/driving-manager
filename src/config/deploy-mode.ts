export class DeployMode {
  static get(): string {
    return import.meta.env.MODE
  }

  static isDevelopment(): boolean {
    return DeployMode.get() === 'development'
  }

  static isProduction(): boolean {
    return DeployMode.get() === 'production'
  }
}
