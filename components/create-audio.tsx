'use client'

import { Download, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Textarea from 'react-textarea-autosize'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ScrollArea } from "@/components/ui/scroll-area"

interface Voice {
  id: string
  name: string
  tags: string
  description: string
  audition: string
}
export function CreateAudio({
  audioConfig,
}: {
  audioConfig: Array<Voice>
}) {
  const [script, setScript] = useState('')
  const [textLen, setTextLen] = useState(0)
  const [voice, setVoice] = useState('')
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [audioDownloadUrl, setAudioDownloadUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const scriptRef = useRef<any>(null)
  const router = useRouter()

  const handleGenerateBtn = async () => {
    setAudioUrl('')
    setAudioDownloadUrl('')
    setLoading(true)
    const response: any = await fetch('/api/audio', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: script,
        voiceId: voice
      })
    })
    if (!response.ok) {
      setLoading(false)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { audioUrl } = await response.json()
    setAudioUrl(audioUrl)
    setAudioDownloadUrl(audioUrl)
    setLoading(false)
  }

  const handleDownload = () => {
    if (!audioDownloadUrl) {
      return
    }
    const a = document.createElement('a')
    a.href = audioDownloadUrl
    a.download = 'audio-' + Date.now() // 设置下载后文件的名称
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleChoose = (id: string) => {
    setVoice(id)
  }

  return (
    <div className="p-5 pt-10 w-full">
      <div className="flex flex-row w-full pt-5">
        <div className="w-1/2 mr-12">
          <Label className="block mb-2 font-medium text-base">
            音色选择
          </Label>
          <ScrollArea className="h-80">
            <div className='grid grid-cols-2 gap-4'>
            {audioConfig &&
              audioConfig.map(item => (
                <div 
                  key={item.id}
                  className={cn('relative p-4 border rounded-lg hover:border-blue-500',
                    voice === item.id ? 'border-blue-500' : ''
                  )}
                  onClick={() => handleChoose(item.id)}
                >
                  <h3 className='text-base font-semibold mb-2'>{item.name}</h3>
                  <p className='text-[#86909c] text-xs'>{item.description}</p>
                  <div className='absolute top-4 right-4 w-8 h-8 rounded-full overflow-hidden'>
                    <audio
                      className="absolute -left-[10px] -top-[13px] h-14 border-none appearance-none outline-none"
                      controls
                      controlsList="nodownload noplaybackrate nofullscreen"
                      src={item.audition}
                    ></audio>
                  </div>
                </div>
            ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1">
          <Label className="block mb-2 font-medium text-base">台词文案</Label>
          <div className="relative mb-5">
            <Textarea
              ref={scriptRef}
              rows={3}
              maxRows={6}
              tabIndex={0}
              maxLength={500}
              placeholder={'输入你的音频逐字稿'}
              spellCheck={false}
              value={script}
              className={`w-full border min-h-[238px] max-h-[338px] bg-background p-2 rounded-lg placeholder:text-sm placeholder:leading-[22px] text-sm leading-[22px] resize-none`}
              onChange={e => {
                setScript(e.target.value)
                setTextLen(e.target.value.length)
              }}
            />
            <div className="absolute right-3 bottom-3 text-sm text-black/80 dark:text-white/80">
              {textLen} / 500
            </div>
          </div>

          <div className="mt-10">
            <Button
              className="w-full text-base font-bold cursor-pointer"
              onClick={handleGenerateBtn}
              disabled={loading || !script}
            >
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              生成
            </Button>
          </div>
        
          <div className="flex justify-between mt-10">
            <span className="font-medium text-base">生成结果</span>
            <div
              className="flex items-center text-sm cursor-pointer"
              onClick={handleDownload}
            >
              <Download size={16} className="mr-1" />
              下载
            </div>
          </div>
          {audioUrl && (
            <div>
              <audio
                className="w-full border-none appearance-none outline-none"
                controls
                controlsList="nodownload noplaybackrate nofullscreen"
                src={audioUrl}
              ></audio>
            </div>
          )}
          {loading && <div className="typing_loader">loading...</div>}
        </div>
      </div>
    </div>
  )
}
