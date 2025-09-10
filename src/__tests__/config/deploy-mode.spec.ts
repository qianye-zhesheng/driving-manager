import { describe, test, expect, beforeEach, vi } from 'vitest'

import { DeployMode } from '../../config/deploy-mode'

describe('DeployModeのテスト', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  test('getがimport.meta.env.MODEを返すこと', () => {
    const mockMode = 'test-mode'
    vi.stubEnv('MODE', mockMode)

    expect(DeployMode.get()).toBe(mockMode)
    vi.unstubAllEnvs()
  })

  test('isDevelopmentが正しく動作すること', () => {
    vi.spyOn(DeployMode, 'get').mockReturnValue('development')
    expect(DeployMode.isDevelopment()).toBe(true)

    vi.spyOn(DeployMode, 'get').mockReturnValue('production')
    expect(DeployMode.isDevelopment()).toBe(false)
  })

  test('isProductionが正しく動作すること', () => {
    vi.spyOn(DeployMode, 'get').mockReturnValue('production')
    expect(DeployMode.isProduction()).toBe(true)

    vi.spyOn(DeployMode, 'get').mockReturnValue('development')
    expect(DeployMode.isProduction()).toBe(false)
  })
})
