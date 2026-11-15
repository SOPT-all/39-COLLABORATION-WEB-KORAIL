import { createBrowserRouter } from 'react-router'

import HomePage from '../../pages/home/home-page'
import ReservationConfirmationPage from '../../pages/reservation-confirmation/reservation-confirmation-page'
import SeatSelectionPage from '../../pages/seat-selection/seat-selection-page'
import TrainSearchPage from '../../pages/train-search/train-search-page'

const routes = [
  { path: '/', Component: HomePage },
  { path: '/train-search', Component: TrainSearchPage },
  { path: '/seat-selection/:trainRunId', Component: SeatSelectionPage },
  { path: '/reservation-confirmation', Component: ReservationConfirmationPage },
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
