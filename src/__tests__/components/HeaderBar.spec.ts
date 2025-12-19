import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import HeaderBar from '../../components/HeaderBar.vue'
import { DeployMode } from '../../config/deploy-mode'
import { Authenticator } from '../../logic/auth/authenticator'

describe('HeaderBar.vue', () => {
  let mockAuthenticator: unknown
  beforeEach(() => {
    vi.clearAllMocks()
    mockAuthenticator = vi.spyOn(Authenticator, 'isAuthenticated').mockResolvedValue(true)
  })

  test('DeployModeがdevelopmentのとき、developmentのテキストが表示される', () => {
    vi.spyOn(DeployMode, 'isDevelopment').mockReturnValue(true)
    const wrapper = mountComponent()

    expect(wrapper.text()).toContain('Development')

    expect(DeployMode.isDevelopment).toHaveBeenCalled()
    expect(mockAuthenticator).toHaveBeenCalled()
  })

  test('DeployModeがproductionのとき、developmentのテキストが表示されない', () => {
    vi.spyOn(DeployMode, 'isDevelopment').mockReturnValue(false)
    const wrapper = mountComponent()

    expect(wrapper.text()).not.toContain('Development')

    expect(DeployMode.isDevelopment).toHaveBeenCalled()
    expect(mockAuthenticator).toHaveBeenCalled()
  })
})

function mountComponent() {
  return mount(HeaderBar, {
    global: {
      stubs: {
        RouterLink: true,
      },
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  })
}
