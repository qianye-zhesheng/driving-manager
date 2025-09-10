import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import BackendApiTestView from '../../../views/__tools__/BackendApiTestView.vue'
import { DeployMode } from '../../../config/deploy-mode'

describe('HeaderBar.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('DeployModeがdevelopmentのとき、開発環境用のテキストが表示される', () => {
    vi.spyOn(DeployMode, 'isDevelopment').mockReturnValue(true)
    const wrapper = mountComponent()

    expect(wrapper.text()).toContain('この画面は開発環境でのみ表示されます。')
    expect(wrapper.text()).not.toContain('開発環境以外では使用できません。')

    expect(DeployMode.isDevelopment).toHaveBeenCalled()
  })

  test('DeployModeがproductionのとき、本番環境用のテキストが表示される', () => {
    vi.spyOn(DeployMode, 'isDevelopment').mockReturnValue(false)
    const wrapper = mountComponent()

    expect(wrapper.text()).not.toContain('この画面は開発環境でのみ表示されます。')
    expect(wrapper.text()).toContain('開発環境以外では使用できません。')

    expect(DeployMode.isDevelopment).toHaveBeenCalled()
  })
})

function mountComponent() {
  return mount(BackendApiTestView, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  })
}
