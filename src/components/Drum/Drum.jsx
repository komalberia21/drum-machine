import{ useRef } from 'react';
import "./Drum.css";

const Drum = ({ audioClip, alpha,setDisplay,volume,isPowerOn }) => {
  const audioRef = useRef(null);

  const playSound = () => {
    const audioElement = audioRef.current;
    if (audioElement&&isPowerOn) {
      audioElement.currentTime = 0;
      audioElement.play();
      audioElement.volume=volume/100;
      setDisplay(audioClip?.label);
    }
  };
  return (
    <button
      className="drum-pad"
      id={`drum-${alpha}`}
      onClick={playSound}
    >
      <audio ref={audioRef} src={audioClip?.sound} id={alpha} className="clip" />
      {alpha}
    </button>
  );
};

export default Drum;
