import TrainSearchCard from '@/pages/home/components/train-search-card'
import ExampleCard from '@/pages/ui/example-card'
import HomeFooter from '@/pages/home/components/home-footer'

interface HomeExamplesProps {
  onAction: (action: string) => void
}

const HomeExamples = ({ onAction }: HomeExamplesProps) => {
  const handleSearch = () => {
    onAction('홈에서 열차 조회하기')
  }

  return (
    <>
      <ExampleCard heading='h4' title='홈 열차 조회 조건 카드'>
        <TrainSearchCard onSearch={handleSearch} />
      </ExampleCard>

      <ExampleCard heading='h4' title='홈 안내 푸터' fullWidth>
        <HomeFooter />
      </ExampleCard>
    </>
  )
}

export default HomeExamples
