import { persist } from 'zustand/middleware'
import { create } from 'zustand'

import {
  TColorVersion,
  TFontVersion,
} from '@/components/selection/components/selection-item/selection-item.props'

export type TTimer = {
  pomodoro: number
  long: number
  short: number
  cycles: number
}

export type TStyle = {
  font: TFontVersion
  color: TColorVersion
}

const POMODORO = 'pomodoro'
const SHORT = 'short'
const LONG = 'long'

type TimerState = 'pomodoro' | 'long' | 'short'

type TimerSteps = TimerState[]

export interface AppState {
  style: TStyle
  timer: TTimer
  timerBeforeApply?: TTimer
  timerStep: number
  timerSteps: TimerSteps
  showSettings: boolean
  isRunning: boolean
}

type Actions = {
  setStyle: (style: AppState['style']) => void
  setTimer: (time: TTimer) => void
  setTimerBeforeApply: (time: TTimer) => void
  clearTimerBeforeApply: () => void
  setShowSettings: (show: boolean) => void
  setIsRunning: (isRunning: boolean) => void
  setTimerStep: () => void
  updateTimerSteps: (cycles: number) => void
  resetTimerStep: () => void
}

const DEFAULT_TIMER = 0.1
const DEFAULT_MIN_TIMER = 0.2
const DEFAULT_MAX_TIMER = 0.3
const DEFAULT_CYCLES = 2

const DEFAULT_STYLE: TStyle = {
  font: 'font-family',
  color: 'red',
}

const BASE_CYCLE = [POMODORO, SHORT]
const $STORAGE_NAME = 'timer_storage'

const FIELDS_TO_EXCLUDED_FROM_LOCAL_STORAGE = ['isRunning', 'timerStep']

export const useAppStore = create<AppState & Actions>()(
  persist(
    (set, get) => ({
      style: DEFAULT_STYLE,
      setStyle: (style) => set(() => ({ style: style })),

      timerSteps: [POMODORO, SHORT, LONG],

      updateTimerSteps: (cycles: number) =>
        set(() => ({
          timerSteps: Array.of(
            ...Array(cycles).fill(BASE_CYCLE).flat(),
            'long'
          ),
        })),

      timerStep: 0,

      setTimerStep: () =>
        set(({ timerStep, timerSteps }) =>
          timerStep < timerSteps.length - 1
            ? { timerStep: ++timerStep, isRunning: true }
            : { timerStep: 0, isRunning: false }
        ),

      resetTimerStep: () => set(() => ({ timerStep: 0, isRunning: false })),

      timer: {
        pomodoro: DEFAULT_TIMER,
        short: DEFAULT_MIN_TIMER,
        long: DEFAULT_MAX_TIMER,
        cycles: DEFAULT_CYCLES,
      },

      setTimer: (timer: TTimer) => set(() => ({ timer })),

      setTimerBeforeApply: (timer: TTimer) =>
        set(() => ({
          timerBeforeApply: timer,
        })),

      clearTimerBeforeApply: () =>
        set(() => ({
          timerBeforeApply: undefined,
        })),

      showSettings: false,

      setShowSettings: (show: boolean) =>
        set((state) => ({
          showSettings: show,
        })),

      isRunning: false,

      setIsRunning: (isRunning: boolean) =>
        set((state) => ({
          isRunning: isRunning,
        })),
    }),
    {
      name: $STORAGE_NAME,
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !FIELDS_TO_EXCLUDED_FROM_LOCAL_STORAGE.includes(key)
          )
        ),
    }
  )
)
