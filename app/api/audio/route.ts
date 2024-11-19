import axios from "axios"
import { NextRequest, NextResponse } from 'next/server'
import { cosUploadBuffer } from "@/lib/cosUpload"

const GROUP_ID = process.env.MINIMAX_GROUP_ID
const API_KEY = process.env.MINIMAX_API_KEY

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { text, voiceId } = body

  const payload = {
    model: "speech-01-turbo",
    text,
    stream: false,
    voice_setting: {
      voice_id: voiceId,
      speed: 1,
      vol: 1,
      pitch: 0
    },
    audio_setting: {
      sample_rate: 32000,
      bitrate: 128000,
      format: "mp3",
      channel: 1,
    },
  };

  const url = `https://api.minimax.chat/v1/t2a_v2?GroupId=${GROUP_ID}`;
  const headers = {
    authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, payload, { headers });
    if(response.status === 200) {
      const minimaxResponse = response.data
      // console.log(minimaxResponse)
      const timestamp = Date.now()
      const fileName = `minimax_audio_${timestamp}.mp3`
      const audioUrl = await cosUploadBuffer(minimaxResponse.data.audio, fileName)

      const resp = {
        audioUrl: '//'+audioUrl || '',
      }
      return Response.json(resp)
    } else {
      throw new Error(`Minimax.t2a_v2: error: ${response.status}`)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 })
  }
}
