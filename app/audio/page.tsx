import { CreateAudio } from '@/components/create-audio'
// const MinimaxVoiceMap: Map<string, string> = new Map<string, string>([


//   ['Arnold', 'Arnold'],
//   ['Charming_Santa', 'Charming Santa'],
//   ['Charming_Lady', 'Charming Lady'],
//   ['Sweet_Girl', 'Sweet Girl'],
//   ['Cute_Elf', 'Cute Elf'],
//   ['Attractive_Girl', 'Attractive Girl'],
//   ['Serene_Woman', 'Serene Woman']
// ])
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
  {
    id: "male-qn-badao-jingpin",
    name: "霸道青年-beta",
    tags: "男,青年,中文",
    description: "霸道青年精品音色，声音更加富有魅力，适合强势场景",
    audition: "/audio/male-qn-badao-jingpin.mp3",
  },
  {
    id: "male-qn-daxuesheng-jingpin",
    name: "青年大学生-beta",
    tags: "男,青年,中文",
    description: "青年大学生精品音色，声音更加阳光活力，适合校园场景",
    audition: "/audio/male-qn-daxuesheng-jingpin.mp3",
  },
  {
    id: "female-shaonv-jingpin",
    name: "少女-beta",
    tags: "女,青年,中文",
    description: "少女精品音色，声音更加清脆甜美，适合年轻化场景",
    audition: "/audio/female-shaonv-jingpin.mp3",
  },
  {
    id: "female-yujie-jingpin",
    name: "御姐-beta",
    tags: "女,青年,中文",
    description: "御姐精品音色，声音更加成熟魅惑，适合时尚场景",
    audition: "/audio/female-yujie-jingpin.mp3",
  },
  {
    id: "female-chengshu-jingpin",
    name: "成熟女性-beta",
    tags: "女,成年,中文",
    description: "成熟女性精品音色，声音更加温婉大方，适合商务场景",
    audition: "/audio/female-chengshu-jingpin.mp3",
  },
  {
    id: "female-tianmei-jingpin",
    name: "甜美女性-beta",
    tags: "女,成年,中文",
    description: "甜美女性精品音色，声音更加甜美动听，适合亲和场景",
    audition: "/audio/female-tianmei-jingpin.mp3",
  },
  {
    id: "clever_boy",
    name: "聪明男童",
    tags: "男,儿童,中文",
    description: "聪明男童音色，声音机灵可爱，适合儿童场景",
    audition: "/audio/clever_boy.mp3",
  },
  {
    id: "cute_boy",
    name: "可爱男童",
    tags: "男,儿童,中文",
    description: "可爱男童音色，声音天真可爱，适合儿童场景",
    audition: "/audio/cute_boy.mp3",
  },
  {
    id: "lovely_girl",
    name: "萌萌女童",
    tags: "女,儿童,中文",
    description: "萌萌女童音色，声音萌萌可爱，适合儿童场景",
    audition: "/audio/lovely_girl.mp3",
  },
  {
    id: "cartoon_pig",
    name: "卡通猪小琪",
    tags: "女,儿童,中文",
    description: "卡通猪小琪音色，声音活泼可爱，适合儿童动画场景",
    audition: "/audio/cartoon_pig.mp3",
  },
  {
    id: "bingjiao_didi",
    name: "病娇弟弟",
    tags: "男,青年,中文",
    description: "病娇弟弟音色，声音温柔执着，适合特殊角色场景",
    audition: "/audio/bingjiao_didi.mp3",
  },
  {
    id: "junlang_nanyou",
    name: "俊朗男友",
    tags: "男,青年,中文",
    description: "俊朗男友音色，声音阳光帅气，适合恋爱场景",
    audition: "/audio/junlang_nanyou.mp3",
  },
  {
    id: "chunzhen_xuedi",
    name: "纯真学弟",
    tags: "男,青年,中文",
    description: "纯真学弟音色，声音清新阳光，适合校园场景",
    audition: "/audio/chunzhen_xuedi.mp3",
  },
  {
    id: "lengdan_xiongzhang",
    name: "冷淡学长",
    tags: "男,青年,中文",
    description: "冷淡学长音色，声音冷静成熟，适合校园场景",
    audition: "/audio/lengdan_xiongzhang.mp3",
  },
  {
    id: "badao_shaoye",
    name: "霸道少爷",
    tags: "男,青年,中文",
    description: "霸道少爷音色，声音高贵傲娇，适合贵族角色场景",
    audition: "/audio/badao_shaoye.mp3",
  },
  {
    id: "tianxin_xiaoling",
    name: "甜心小玲",
    tags: "女,青年,中文",
    description: "甜心小玲音色，声音甜美可人，适合少女场景",
    audition: "/audio/tianxin_xiaoling.mp3",
  },
  {
    id: "qiaopi_mengmei",
    name: "俏皮萌妹",
    tags: "女,青年,中文",
    description: "俏皮萌妹音色，声音活泼可爱，适合年轻化场景",
    audition: "/audio/qiaopi_mengmei.mp3",
  },
  {
    id: "wumei_yujie",
    name: "妩媚御姐",
    tags: "女,青年,中文",
    description: "妩媚御姐音色，声音性感成熟，适合成熟女性场景",
    audition: "/audio/wumei_yujie.mp3",
  },
  {
    id: "diadia_xuemei",
    name: "嗲嗲学妹",
    tags: "女,青年,中文",
    description: "嗲嗲学妹音色，声音娇嗲可爱，适合校园场景",
    audition: "/audio/diadia_xuemei.mp3",
  },
  {
    id: "danya_xuejie",
    name: "淡雅学姐",
    tags: "女,青年,中文",
    description: "淡雅学姐音色，声音温柔知性，适合校园场景",
    audition: "/audio/danya_xuejie.mp3",
  },
  {
    id: "male-qn-qingse",
    name: "青涩青年音色",
    tags: "男,青年,中文",
    description: "青涩青年音色，声音清新自然，适合年轻化场景",
    audition: "/audio/male-qn-qingse.mp3",
  },
  {
    id: "male-qn-jingying",
    name: "精英青年音色",
    tags: "男,青年,中文",
    description: "精英青年音色，声音沉稳有力，适合商务场景",
    audition: "/audio/male-qn-jingying.mp3",
  },
  {
    id: "male-qn-badao",
    name: "霸道青年音色",
    tags: "男,青年,中文",
    description: "霸道青年音色，声音富有魅力，适合强势场景",
    audition: "/audio/male-qn-badao.mp3",
  },
  {
    id: "male-qn-daxuesheng",
    name: "青年大学生音色",
    tags: "男,青年,中文",
    description: "青年大学生音色，声音阳光活力，适合校园场景",
    audition: "/audio/male-qn-daxuesheng.mp3",
  },
  {
    id: "female-shaonv",
    name: "少女音色",
    tags: "女,青年,中文",
    description: "少女音色，声音清脆甜美，适合年轻化场景",
    audition: "/audio/female-shaonv.mp3",
  },
  {
    id: "female-yujie",
    name: "御姐音色",
    tags: "女,青年,中文",
    description: "御姐音色，声音成熟魅惑，适合时尚场景",
    audition: "/audio/female-yujie.mp3",
  },
  {
    id: "female-chengshu",
    name: "成熟女性音色",
    tags: "女,成年,中文",
    description: "成熟女性音色，声音温婉大方，适合商务场景",
    audition: "/audio/female-chengshu.mp3",
  },
  {
    id: "female-tianmei",
    name: "甜美女性音色",
    tags: "女,成年,中文",
    description: "甜美女性音色，声音甜美动听，适合亲和场景",
    audition: "/audio/female-tianmei.mp3",
  },
  {
    id: "presenter_male",
    name: "男性主持人",
    tags: "男,成年,中文",
    description: "男性主持人音色，声音专业有力，适合新闻播报场景",
    audition: "/audio/presenter_male.mp3",
  },
  {
    id: "presenter_female",
    name: "女性主持人",
    tags: "女,成年,中文",
    description: "女性主持人音色，声音专业亲和，适合新闻播报场景",
    audition: "/audio/presenter_female.mp3",
  },
  {
    id: "audiobook_male_1",
    name: "男性有声书1",
    tags: "男,成年,中文",
    description: "男性有声书音色1，声音富有磁性，适合有声读物场景",
    audition: "/audio/audiobook_male_1.mp3",
  },
  {
    id: "audiobook_male_2",
    name: "男性有声书2",
    tags: "男,成年,中文",
    description: "男性有声书音色2，声音温和从容，适合有声读物场景",
    audition: "/audio/audiobook_male_2.mp3",
  },
  {
    id: "audiobook_female_1",
    name: "女性有声书1",
    tags: "女,成年,中文",
    description: "女性有声书音色1，声音温柔细腻，适合有声读物场景",
    audition: "/audio/audiobook_female_1.mp3",
  },
  {
    id: "audiobook_female_2",
    name: "女性有声书2",
    tags: "女,成年,中文",
    description: "女性有声书音色2，声音优雅动听，适合有声读物场景",
    audition: "/audio/audiobook_female_2.mp3",
  },
  {
    id: "Santa_Claus",
    name: "Santa Claus",
    tags: "男,老年,英语",
    description: "圣诞老人音色，声音温暖慈祥，适合节日场景",
    audition: "/audio/Santa_Claus.mp3",
  },
  {
    id: "Grinch",
    name: "Grinch",
    tags: "男,成年,英语",
    description: "格林奇音色，声音独特有趣，适合特殊角色场景",
    audition: "/audio/Grinch.mp3",
  },
  {
    id: "Rudolph",
    name: "Rudolph",
    tags: "男,青年,英语",
    description: "鲁道夫音色，声音活泼可爱，适合节日场景",
    audition: "/audio/Rudolph.mp3",
  },
  {
    id: "Arnold",
    name: "Arnold",
    tags: "男,成年,英语",
    description: "阿诺德音色，声音低沉有力，适合运动场景",
    audition: "/audio/Arnold.mp3",
  },
  {
    id: "Charming_Santa",
    name: "Charming Santa",
    tags: "男,老年,英语",
    description: "迷人的圣诞老人音色，声音充满魅力，适合节日场景",
    audition: "/audio/Charming_Santa.mp3",
  },
  {
    id: "Charming_Lady",
    name: "Charming Lady",
    tags: "女,成年,英语",
    description: "迷人女士音色，声音优雅动听，适合社交场景",
    audition: "/audio/Charming_Lady.mp3",
  },
  {
    id: "Sweet_Girl",
    name: "Sweet Girl",
    tags: "女,青年,英语",
    description: "甜美女孩音色，声音清新甜美，适合年轻化场景",
    audition: "/audio/Sweet_Girl.mp3",
  },
  {
    id: "Cute_Elf",
    name: "Cute Elf",
    tags: "女,青年,英语",
    description: "可爱精灵音色，声音俏皮可爱，适合童话场景",
    audition: "/audio/Cute_Elf.mp3",
  },
  {
    id: "Attractive_Girl",
    name: "Attractive Girl",
    tags: "女,青年,英语",
    description: "迷人女孩音色，声音富有魅力，适合时尚场景",
    audition: "/audio/Attractive_Girl.mp3",
  },
  {
    id: "Serene_Woman",
    name: "Serene woman",
    tags: "女,青年,英语",
    description: "恬静女性音色，声音温和从容，适合商务场景",
    audition: "/audio/Serene_Woman.mp3",
  },
]

const Page = async () => {

  return <CreateAudio audioConfig={MinimaxVoiceMap} />
}

export default Page