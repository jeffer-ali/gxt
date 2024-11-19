import { CreateAudio } from '@/components/create-audio'

const MinimaxVoiceMap = [
  {
    id: "male-qn-qingse-jingpin",
    name: "青涩青年-beta",
    tags: "男,青年,中文",
    description: "青涩青年精品音色，声音更加清新自然，适合年轻化场景",
    audition: "/audio/male-qn-qingse-jingpin.mp3",
  },
  {
    id: "male-qn-jingying-jingpin",
    name: "精英青年-beta",
    tags: "男,青年,中文",
    description: "精英青年精品音色，声音更加沉稳有力，适合商务场景",
    audition: "/audio/male-qn-jingying-jingpin.mp3",
  },
]

const Page = async () => {

  return <CreateAudio audioConfig={MinimaxVoiceMap} />
}

export default Page
