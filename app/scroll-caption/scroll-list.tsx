'use client'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import styles from './index.module.css'
import cl from 'classnames'
import { ScrollArea } from "@/components/ui/scroll-area"
import { staticFile } from "remotion";
import { AudioViz } from "./Composition";
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { useGlobalContext } from '@/app/globalcontext'
const parseSRT:any = require("parse-srt")

interface LyricData {
    time: number;  
    content: string;
    tran?: string;
}

export function ScrollList({ data }: any) {
    const audioRef = useRef(null)
    const [lyricIndex, setLyricIndex] = useState(0)
    const [lrcData, setLrcData] = useState<LyricData[]>([])
    // const lrcData:LyricData[] = data.songLyric.lrcData
    const [frame, setFrame] = useState(0);
    const [frequenciesToDisplay, setFrequenciesToDisplay] = useState([]);
    const fps = 38
    const waveColor="#15b8f7"
    const numberOfSamples=256
    const freqRangeStartIndex=0
    const waveLinesToDisplay=29
    const mirrorWave=true
    const audioData = useAudioData(staticFile("9f0f7bce.mp3"));
    console.log('audioData', audioData)
    const {
        setPlaying
    } = useGlobalContext()
    const audioVizRef = useRef<{ jumpTime: (time:number) => void; resetWave: () => void }>(null);

    useEffect(() => {
        const src='/9f0f7bce.srt'
        fetch(src)
            .then((res) => res.text())
            .then((text) => {
                const parsed = parseSRT(text);
                const newData = parsed.map((item:any) => {
                    return { time: item.start, content: item.text };
                  })
                setLrcData(newData)
            })
            .catch((err) => {
                console.log("Error fetching subtitles", err);
            });
    }, [])

    // 字幕滚动
    const lyricsScroll = (index: number) => {
        const lrcItemDom = document.getElementById(index >= 0 ? "lrc-" + index : "lrc-placeholder");
        if (lrcItemDom) {
            const container = lrcItemDom.parentElement;
            if (!container) return;
            // 调整滚动的距离
            const scrollDistance = lrcItemDom.offsetTop - container.offsetTop - 80;
            // 开始滚动
            lrcItemDom?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    // 更新当前字幕索引
    const updateSubtitleIndex = (time:number) => {
        const index = lrcData.findIndex(subtitle => subtitle.time > time) - 1;
        setLyricIndex(index);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const audioElement:HTMLAudioElement = audioRef.current;
            const curTime:any = audioElement.currentTime
            updateSubtitleIndex(curTime)
            // setFrame(Math.round(curTime*fps))
        }
    };

    // 进度跳转
    const jumpSeek = (time: number) => {
        if (!time) return;
        if (audioRef.current) {
            const audioElement:HTMLAudioElement = audioRef.current;
            audioElement.currentTime = time;
            audioElement.play();
            setPlaying(true);
            if (audioVizRef.current) {
                audioVizRef.current.jumpTime(time);
            }
        }
    };
    
    useEffect(() => {
        lyricsScroll(lyricIndex)
    }, [lyricIndex])

    useEffect(() => {
        if (audioData) {
          const frequencyData = visualizeAudio({
            fps,
            frame,
            audioData,
            numberOfSamples, // Use more samples to get a nicer visualisation
          });
        
          // Pick the low values because they look nicer than high values
          // feel free to play around :)
          const frequencyDataSubset = frequencyData.slice(
            freqRangeStartIndex,
            freqRangeStartIndex +
              (mirrorWave ? Math.round(waveLinesToDisplay / 2) : waveLinesToDisplay),
          );
        
          const frequenciesToDisplay:any = mirrorWave
            ? [...frequencyDataSubset.slice(1).reverse(), ...frequencyDataSubset]
            : frequencyDataSubset;
    
          setFrequenciesToDisplay(frequenciesToDisplay)
        }
    }, [frame]); 

    return (
        <>
            <div>
                <audio 
                    ref={audioRef} 
                    src="/9f0f7bce.mp3"
                    autoPlay={true}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    preload="metadata"
                    controls
                />
            </div>

            <AudioViz
                ref={audioVizRef}
                waveColor="#15b8f7"
                numberOfSamples={256}
                freqRangeStartIndex={0}
                waveLinesToDisplay={29}
                mirrorWave={true}
                audioSrc={staticFile("9f0f7bce.mp3")}
            />
            {/* <div className="scale-50 flex flex-row h-[96px] justify-center items-center gap-3 mt-12">
                {frequenciesToDisplay.map((v, i) => {
                    return (
                    <div
                        key={i}
                        className="rounded-xl w-3"
                        style={{
                        minWidth: "1px",
                        backgroundColor: waveColor,
                        height: `${500 * Math.sqrt(v)}%`,
                        }}
                    />
                    );
                })}
            </div> */}

            <div className={cl(styles.lyric, styles.cover, styles.pure)}>
                <div className={styles.lyricContent}>
                <ScrollArea className={cl('h-[500px]', styles.lyricScroll)}>
                {lrcData && lrcData.map((item, index) => (
                    <div
                        key={index}
                        id={`lrc-${index}`}
                        className={cl(styles.lrcLine, styles.isLrc, lyricIndex === index ? styles.on : '')}
                        style={{
                            filter: true
                            ? `blur(${Math.min(Math.abs(lyricIndex - index) * 1.8, 10)}px)`
                            : 'blur(0)',
                        }}
                        onClick={() => jumpSeek(item.time)}
                    >
                        <span className={cl(styles.content, styles.span)}>{item.content}</span>
                        {item.tran && <span className={cl(styles.tran, styles.span)}>{item.tran}</span>}
                    </div>
                ))}
                </ScrollArea>
                </div>
            </div>
        </>
    )
}
