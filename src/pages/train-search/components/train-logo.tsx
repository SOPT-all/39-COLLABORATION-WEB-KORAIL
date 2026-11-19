import ItxCheongchunLogoMask from '@/pages/train-search/assets/logo-itx-cheongchun.png'
import ItxSaemaeulLogoMask from '@/pages/train-search/assets/logo-itx-saemaeul.png'
import KtxLogoMask from '@/pages/train-search/assets/logo-ktx.png'
import MugunghwaLogoMask from '@/pages/train-search/assets/logo-mugunghwa.png'
import type { TrainType } from '@/pages/train-search/types/train-result'

interface TrainLogoProps {
  trainType: TrainType
  isMuted?: boolean
  variant?: 'default' | 'filter'
}

interface TrainLogoAppearance {
  colorClassName: string
  mask: string
  width: number
}

const trainLogoAppearance: Record<TrainType, TrainLogoAppearance> = {
  ktx: {
    colorClassName: 'bg-blue-500',
    mask: KtxLogoMask,
    width: 36,
  },
  'itx-cheongchun': {
    colorClassName: 'bg-gray-900',
    mask: ItxCheongchunLogoMask,
    width: 37,
  },
  'itx-saemaeul': {
    colorClassName: 'bg-red-450',
    mask: ItxSaemaeulLogoMask,
    width: 49,
  },
  mugunghwa: {
    colorClassName: 'bg-green-450',
    mask: MugunghwaLogoMask,
    width: 35,
  },
}

const TrainLogo = ({ trainType, isMuted = false, variant = 'default' }: TrainLogoProps) => {
  const { colorClassName, mask, width } = trainLogoAppearance[trainType]
  const selectedColorClassName =
    variant === 'filter' && trainType === 'itx-cheongchun' ? 'bg-slate-900' : colorClassName

  return (
    <span
      aria-hidden='true'
      className={`block h-3 shrink-0 ${isMuted ? 'bg-gray-500' : selectedColorClassName}`}
      style={{
        width,
        WebkitMaskImage: `url(${mask})`,
        maskImage: `url(${mask})`,
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}

export default TrainLogo
