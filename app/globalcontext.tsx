'use client'
import {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
  ReactNode,
  useRef
} from 'react'

const GlobalContext = createContext<any>({})
export const useGlobalContext = () => useContext<any>(GlobalContext)

export const GlobalContextProvider = function ({
  children
}: {
  children: ReactNode
}) {
  const [playing, setPlaying] = useState(false)
  const [playtime, setPlaytime] = useState(0)

  return (
    <GlobalContext.Provider
      value={{
        playing,
        setPlaying,
        playtime,
        setPlaytime
      }}
    >
        {children}
    </GlobalContext.Provider>
  )
}