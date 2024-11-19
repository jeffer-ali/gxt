'use client'

import { Download, Loader2, Link, Gem } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Textarea from 'react-textarea-autosize'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export function CreateVideo() {
  const [script, setScript] = useState('')
  const [textLen, setTextLen] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const scriptRef = useRef<any>(null)
  const router = useRouter()

  const handleGenerateBtn = async () => {
    setVideoUrl('')
    setLoading(true)
    const response: any = await fetch('/api/video', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: script,
        model: "video-01"
      })
    })
    if (!response.ok) {
      setLoading(false)
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { downloadUrl } = await response.json()
    setVideoUrl(downloadUrl)
    setLoading(false)
  }

  const handleDownload = () => {
    if (!videoUrl) {
      return
    }
    const a = document.createElement('a')
    a.href = videoUrl
    a.download = 'video-' + Date.now() // 设置下载后文件的名称
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handleCopyText = () => {

  }

  return (
    <div className="p-6 pt-10 w-full">
      <div className="w-1/2 mx-auto">
        <h2 className='slogan'>
          <span>创作无限 天马行空</span>
        </h2>
        <div className='flex items-center gap-1 p-1 pl-5 border-2 rounded-full border-[#38495a]'>
          <Link />
          <Input className='border-none outline-none bg-transparent' />
          <Button className='great-btn rounded-full'>分析链接</Button>
        </div>
        <Label className="block mb-2 font-medium text-base">提示词</Label>
        <div className="relative mb-5">
          <Textarea
            ref={scriptRef}
            rows={3}
            maxRows={6}
            tabIndex={0}
            maxLength={500}
            placeholder={'输入你的提示词，比如：摄像机从高处俯瞰的位置开始缓慢下降，呈现出一个古老战场的全景。从高处的视角，可以看到一片广阔泥泞的大地，见证着下方激烈的冲突。摄像机镜头捕捉到陷入生死搏斗的战士们痛苦的吼叫、刀剑相击，用令人窒息的紧张感笼罩着感官。'}
            spellCheck={false}
            value={script}
            className={`w-full border min-h-[238px] max-h-[338px] bg-background p-2 rounded-lg placeholder:text-sm placeholder:leading-[22px] text-sm leading-[22px] resize-none`}
            onChange={e => {
              setScript(e.target.value)
              setTextLen(e.target.value.length)
            }}
          />
        </div>

        <div className="mt-10">
          <Button
            className="w-full text-base font-bold cursor-pointer"
            onClick={handleGenerateBtn}
            disabled={loading || !script}
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            生成
            <span className='flex items-center'>
              （<Gem className='mr-1' size={16} />60）
            </span>
          </Button>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-base">生成结果</span>
          <div
            className="flex items-center text-sm cursor-pointer"
            onClick={handleDownload}
          >
            <Download size={16} className="mr-1" />
            下载
          </div>
        </div>
        {videoUrl && (
          <div>
            <video
              className="w-full border-none appearance-none outline-none"
              controls
              src={videoUrl}
            ></video>
          </div>
        )}
        {loading && <div className="typing_loader">loading...</div>}

      </div>

      <div className='grid grid-cols-5 gap-4'>
        <div className='p-4 rounded-2xl bg-muted/50'>
          <div className='text-sm font-bold'>
            10w+标题大师
          </div>
          <div className='relative my-3 text-base line-clamp-3 group cursor-pointer'>
          摄像机从高处俯瞰的位置开始缓慢下降，呈现出一个古老战场的全景。从高处的视角，可以看到一片广阔泥泞的大地，见证着下方激烈的冲突。摄像机镜头捕捉到陷入生死搏斗的战士们痛苦的吼叫、刀剑相击，用令人窒息的紧张感笼罩着感官。
            <div 
              className='flex justify-center items-center absolute inset-0 bg-[rgba(0,0,0,0.5)] rounded invisible group-hover:visible'
              onClick={handleCopyText}
            >
              复制文本
            </div>
          </div>
          <div className='text-sm text-muted-foreground/50 text-right'>
            创建于 2024/11/12
          </div>
        </div>
      </div>
    </div>
  )
}
