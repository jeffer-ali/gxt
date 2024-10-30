import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { useCountUp } from 'use-count-up';
import { useGlobalContext } from '@/app/globalcontext'

export const fps = 38;
interface UsePauseableCountUpProps {
  start?: number;
  end: number;
  duration: number;
}
const usePauseableCountUp = ({ start = 0, end, duration }: UsePauseableCountUpProps) => {
  const [isPaused, setIsPaused] = useState(true);
  const [startFrame, setStartFrame] = useState(start);
  const { value, reset } = useCountUp({
      isCounting: !isPaused,
      easing: 'linear',
      start: startFrame,
      end,
      duration,
  });

  const pause = () => setIsPaused(true);
  const play = () => setIsPaused(false);
  const togglePause = () => setIsPaused(prev => !prev);
  const jumpTo = (time:number) => setStartFrame(Math.round(fps * time));

  return {
      value,
      reset,
      isPaused,
      pause,
      play,
      togglePause,
      jumpTo
  };
};

// export const AudioViz: React.FC<{
//   waveColor: string;
//   numberOfSamples: number;
//   freqRangeStartIndex: number;
//   waveLinesToDisplay: number;
//   mirrorWave: boolean;
//   audioSrc: string;
// }> = ({
//   waveColor,
//   numberOfSamples,
//   freqRangeStartIndex,
//   waveLinesToDisplay,
//   mirrorWave,
//   audioSrc
// }) => {

export const AudioViz = forwardRef<{
    jumpTime: (time:number) => void;
    resetWave: () => void;
}, {
    waveColor: string;
    numberOfSamples: number;
    freqRangeStartIndex: number;
    waveLinesToDisplay: number;
    mirrorWave: boolean;
    audioSrc: string;
}>(({
    waveColor,
    numberOfSamples,
    freqRangeStartIndex,
    waveLinesToDisplay,
    mirrorWave,
    audioSrc
}, ref) => {
  const [frame, setFrame] = useState(0);
  const [frequenciesToDisplay, setFrequenciesToDisplay] = useState([]);
  const {
    playing,
    playtime
  } = useGlobalContext()
  
  const audioData = useAudioData(audioSrc);

  const { value, reset, isPaused, pause, play, togglePause, jumpTo } = usePauseableCountUp({
    start: 0,
    end: fps * 225,
    duration: 225
  });

  const jumpTime = (time:number) => {
    jumpTo(time)
  };

  const resetWave = () => {
    reset()
  };

  // 使用 useImperativeHandle 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    jumpTime,
    resetWave,
  }));

  useEffect(() => {
    playing ? play() : pause()
    // jumpTo(100)
  }, [playing]);
  
  useEffect(() => {
    console.log(value)
    setFrame(Number(value))
    // let animationFrameId:any;
    // const updateFrame = () => {
    //   setFrame((prevFrame) => (prevFrame + 1)); // durationInSeconds 是视频的总时长
    //   animationFrameId = requestAnimationFrame(updateFrame);
    // };

    // updateFrame();

    // return () => {
    //   cancelAnimationFrame(animationFrameId);
    // };
  }, [value]);

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
      <div className="scale-50 flex flex-row h-[96px] justify-center items-center gap-3 mt-12">
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
      </div>
    </>
  );
});
