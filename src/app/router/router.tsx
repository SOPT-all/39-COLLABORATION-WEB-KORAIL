import { createBrowserRouter } from 'react-router'

import RootLayout from '@/app/layout/root-layout'
import HomePage from '@/pages/home/home-page'
import ReservationConfirmationPage from '@/pages/reservation-confirmation/reservation-confirmation-page'
import SeatSelectionPage from '@/pages/seat-selection/seat-selection-page'
import TrainSearchPage from '@/pages/train-search/train-search-page'

const routes = [
  {
    Component: RootLayout,
    children: [
      { path: '/', Component: HomePage },
      { path: '/train-search', Component: TrainSearchPage },
      { path: '/reservation-confirmation', Component: ReservationConfirmationPage },
    ],
  },
  { path: '/seat-selection/:trainRunId', Component: SeatSelectionPage },
]

const uiRoutes =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_UI_GUIDE === 'true'
    ? [
        {
          path: '/ui',
          lazy: async () => {
            const { default: UiPage } = await import('@/pages/ui/style-guide')
            return { Component: UiPage }
          },
        },
      ]
    : []

export const router = createBrowserRouter([...routes, ...uiRoutes])
