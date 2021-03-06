import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    toggleLooping: () => void;
    toggleShuffling: () => void;
    clearPlayerState: () => void;
};

type PlayerContextProviderProps = {
    children: ReactNode
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerCntextProvider ({ children } : PlayerContextProviderProps) {
    
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode : Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list :Episode[], index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
  }

  function togglePlay () {
    setIsPlaying(!isPlaying);
  }

  function playNext () {
      if (isShuffling) {
          const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
          setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      }
      if (hasNext) {
          setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
  }

  function playPrevious () {
      if (hasPrevious) {
        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function setPlayingState (state: boolean) {
    setIsPlaying(state);
  }

  function toggleLooping() {
      setIsLooping(!isLooping);
  }

  function toggleShuffling() {
      setIsShuffling(!isShuffling);
  }

  function clearPlayerState() {
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
  }

  const hasNext = currentEpisodeIndex + 1 < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  return (
    <PlayerContext.Provider 
        value={{ 
            episodeList, 
            currentEpisodeIndex, 
            play, 
            playList,
            isPlaying, 
            togglePlay, 
            setPlayingState,
            playNext,
            playPrevious,
            hasNext,
            hasPrevious,
            isLooping,
            toggleLooping,
            isShuffling,
            toggleShuffling,
            clearPlayerState
        }}>
        {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}