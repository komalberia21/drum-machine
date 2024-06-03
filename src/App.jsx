import { useEffect, useState } from "react";
import Drum from "./components/Drum/Drum";
import "./App.css";

const App = () => {
  const heaterKit = {
    "Q": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", label: "Heater 1" },
    "W": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", label: "Heater 2" },
    "E": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", label: "Heater 3" },
    "A": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", label: "Heater 4" },
    "S": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", label: "Heater 5" },
    "D": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", label: "Heater 6" },
    "Z": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", label: "Heater 7" },
    "X": { sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", label: "Heater 8" },
    "C": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", label: "Heater 9" },
  };

  const smoothpowerKit = {
    "Q": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", label: "Chord 1" },
    "W": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", label: "Chord 2" },
    "E": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", label: "Chord 3" },
    "A": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", label: "Shaker" },
    "S": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", label: "Open HH" },
    "D": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3", label: "Closed HH" },
    "Z": { sound: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", label: "Punchy Kick" },
    "X": { sound: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", label: "Side Stick" },
    "C": { sound: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", label: "Snare" },
  };

  const [bank, setBank] = useState(heaterKit);
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(20);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [currentBank, setCurrentBank] = useState("heaterKit");

  const handleVolumeDisplay = () => {
    setTimeout(() => {
      setDisplay("");
    }, 1500);
  };

  const handleButtonClick = (key) => {
    if (isPowerOn && bank[key].sound) {
      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.volume = volume / 100;
      audio.play();
      setDisplay(bank[key].label);
    } else {
      console.log("Turn power on");
    }
  };

  const handleVolumeChange = (e) => {
    setDisplay(`Volume: ${e.target.value}`);
    handleVolumeDisplay();
    setVolume(e.target.value);
  };

  const togglePower = () => {
    if (isPowerOn) {
      setDisplay("Power Off");
    } else {
      setDisplay("Power On");
    }
    setIsPowerOn(!isPowerOn);
  };

  const switchBank = () => {
    if (currentBank === "heaterKit") {
      setBank(smoothpowerKit);
      setDisplay("SmoothpowerKit");
      setCurrentBank("smoothpowerKit");
    } else {
      setBank(heaterKit);
      setDisplay("HeaterKit");
      setCurrentBank("heaterKit");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      if (bank[key]) {
        handleButtonClick(key);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [bank, isPowerOn]);

  return (
    <div id="drum-machine">
      <div className="keys">
        {Object.keys(bank).map((key) => (
          <Drum audioClip={bank[key]} alpha={key} key={key} setDisplay={setDisplay}
           volume={volume} isPowerOn={isPowerOn} />
        ))}
      </div>
      <div className="second-part">
        <button onClick={switchBank} className="bank">
          Switch Bank
        </button>
        <div id="display">{display}</div>
        <div className="volume">
          <input type="range" id="volume" name="volume" min="0" max="100" value={volume} 
          onChange={handleVolumeChange} />
          <div className="volume-bar">
            <div className="volume-bar-progress" style={{ width: `${volume}%` }}></div>
          </div>
        </div>
        <button onClick={togglePower} className="bank">
          Power
        </button>
      </div>
    </div>
  );
};

export default App;



 // const switchBank = () => {
  //   if (bank === heaterKit) {
  //         console.log("true");
  //prob is bank and heaterKit are considered as two differnt object  thought content is same 
  //     setBank({ ...smoothpowerKit }); 
  //     setDisplay("Smooth Piano Bank");
  //   } else {
  //     setBank({ ...heaterKit });
  //     setDisplay("Heater Kit Bank");
  //     console.log("false");
  //   }
  // };