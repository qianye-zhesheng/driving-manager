import { describe, it, expect } from 'vitest'
import { FormattedCurrentInfo } from '@/logic/dashboard/formatted-current-info'
import type { CurrentInfo, CheckResult, DrivingSession } from '@/logic/dashboard/current-info'

describe('FormattedCurrentInfo', () => {
  describe('constructor with todaysCheck', () => {
    it('should format todaysCheck when present', () => {
      const checkResult: CheckResult = {
        checkedAt: '2024-01-15T10:30:00+09:00',
        judgement: '良好',
      }
      const currentInfo: CurrentInfo = {
        todaysCheck: checkResult,
      }

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.todaysCheck).toBeDefined()
      expect(formatted.todaysCheck?.judgement).toBe('良好')
    })

    it('should not set todaysCheck when undefined', () => {
      const currentInfo: CurrentInfo = {}

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.todaysCheck).toBeUndefined()
    })
  })

  describe('constructor with activeSession', () => {
    it('should format activeSession when present', () => {
      const drivingSession: DrivingSession = {
        date: '2024-01-15',
        startOdometer: 12345,
      }
      const currentInfo: CurrentInfo = {
        activeSession: drivingSession,
      }

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.activeSession).toBeDefined()
      expect(formatted.activeSession?.startOdometer).toBe('12,345')
    })

    it('should not set activeSession when undefined', () => {
      const currentInfo: CurrentInfo = {}

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.activeSession).toBeUndefined()
    })
  })

  describe('formatCheckResult', () => {
    it('should format checkedAt with correct date-time format', () => {
      const checkResult: CheckResult = {
        checkedAt: '2025-01-01T14:09+09:00',
        judgement: '異常なし',
      }
      const currentInfo: CurrentInfo = { todaysCheck: checkResult }

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.todaysCheck?.checkedAt).toBe('2025-01-01 14:09')
    })
  })

  describe('formatDrivingSession', () => {
    it('should format date with Japanese day format', () => {
      const drivingSession: DrivingSession = {
        date: '2025-01-01',
        startOdometer: 50000,
      }
      const currentInfo: CurrentInfo = { activeSession: drivingSession }

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.activeSession?.date).toBe('1月1日')
    })

    it('should format startOdometer with ja-JP locale', () => {
      const drivingSession: DrivingSession = {
        date: '2024-01-15',
        startOdometer: 123456,
      }
      const currentInfo: CurrentInfo = { activeSession: drivingSession }

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.activeSession?.startOdometer).toBe('123,456')
    })

    it('should format large odometer values correctly', () => {
      const drivingSession: DrivingSession = {
        date: '2024-01-15',
        startOdometer: 999999,
      }
      const currentInfo: CurrentInfo = { activeSession: drivingSession }

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.activeSession?.startOdometer).toBe('999,999')
    })
  })

  describe('both todaysCheck and activeSession', () => {
    it('should format both when both are present', () => {
      const currentInfo: CurrentInfo = {
        todaysCheck: {
          checkedAt: '2024-01-15T09:00:00+09:00',
          judgement: '良好',
        },
        activeSession: {
          date: '2024-01-15',
          startOdometer: 10000,
        },
      }

      const formatted = new FormattedCurrentInfo(currentInfo)

      expect(formatted.todaysCheck).toBeDefined()
      expect(formatted.activeSession).toBeDefined()
    })
  })
})
