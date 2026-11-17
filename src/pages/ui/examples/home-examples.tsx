import HomeExternalLinks from '@/pages/home/components/home-external-links'
import TrainSearchCard from '@/pages/home/components/train-search-card'
import ExampleCard from '@/pages/ui/example-card'
import HomeShortcuts from '@/pages/home/components/home-shortcuts'

interface HomeExamplesProps {
  onAction: (action: string) => void
}

const HomeExamples = ({ onAction }: HomeExamplesProps) => {
  const handleSearch = () => {
    onAction('홈에서 열차 조회하기')
  }

  return (
    <>
      <ExampleCard heading='h4' title='홈 상단 외부링크 줄'>
        <HomeExternalLinks />
      </ExampleCard>

      <ExampleCard heading='h4' title='홈 열차 조회 조건 카드'>
        <TrainSearchCard onSearch={handleSearch} />
      </ExampleCard>

      <ExampleCard heading='h4' title='홈 바로가기 섹션' fullWidth>
        <div className='px-[14px]'>
          <HomeShortcuts />
        </div>
      </ExampleCard>
    </>
  )
}

export default HomeExamples
