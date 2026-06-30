// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { userDataContext } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import aiImg from "../assets/ai.gif"
// import { CgMenuRight } from "react-icons/cg";
// import { RxCross1 } from "react-icons/rx";
// import userImg from "../assets/user.gif"
// const Home = () => {
//   const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
//   const navigate = useNavigate()
//   const [listening, setListening] = useState(false)
//   const [userText, setUserText] = useState("")
//   const [aiText, setAiText] = useState("")
//   const isSpeakingRef = useRef(false)
//   const recognitionRef = useRef(null)
//   const [ham, setHam] = useState(false)
//   const isRecognizingRef = useRef(false)
//   const synth = window.speechSynthesis

//   const handleLogout = async () => {
//     try {
//       const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
//       setUserData(null)
//       navigate("/signin")
//     } catch (error) {
//       setUserData(null)
//       console.log(error)
//     }
//   }

//   const startRecognition = () => {

//     if (!isSpeakingRef.current && !isRecognizingRef.current) {
//       try {
//         recognitionRef.current?.start();
//         console.log("Recognition requested to start");
//       } catch (error) {
//         if (error.name !== "InvalidStateError") {
//           console.error("Start error:", error);
//         }
//       }
//     }

//   }

//   const speak = (text) => {
//     const utterence = new SpeechSynthesisUtterance(text)
//     utterence.lang = 'hi-IN';
//     const voices = window.speechSynthesis.getVoices()
//     const hindiVoice = voices.find(v => v.lang === 'hi-IN');
//     if (hindiVoice) {
//       utterence.voice = hindiVoice
//     }


//     isSpeakingRef.current = true
//     // utterence.onend = () => {
//     //   setAiText("")
//     //   isSpeakingRef.current = false;
//     //   setTimeout(() => {
//     //     startRecognition(); // Delay se race condition avoid hoti hai
//     //   }, 800);
//     // }

//     utterence.onend = () => {
//       setAiText("");
//       isSpeakingRef.current = false;

//       setTimeout(() => {
//         startRecognition();
//       }, 500);
//     };

//     synth.cancel(); // pahle se koi speech ho to band karo
//     synth.speak(utterence);
//   }

//   // const handleCommand = (data) => {
//   //   const { type, userInput, response } = data
//   //   speak(response);

//   //   if (type === 'google-search') {
//   //     const query = encodeURIComponent(userInput);
//   //     window.open(`https://www.google.com/search?q=${query}`, '_blank');
//   //   }
//   //   if (type === 'calculator-open') {

//   //     window.open('https://www.google.com/search?q=calculator', '_blank');
//   //   }
//   //   if (type === 'instagram-open') {
//   //     window.open('https://www.instagram.com/', '_blank');
//   //   }
//   //   if (type === "facebook-open") {
//   //     window.open('https://www.facebook.com/', '_blank');
//   //   }
//   //   if (type === "weather-show") {
//   //     window.open('https://www.google.com/search?q=weather', '_blank');
//   //   }

//   //   if (type === 'youtube-search' || type === 'youtube-play') {
//   //     const query = encodeURIComponent(userInput);
//   //     window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
//   //   }

//   // }


//   const handleCommand = (data) => {
//     if (!data) return;

//     const { type, userInput, response } = data;

//     speak(response);

//     switch (type) {
//       case "google-search":
//         window.open(
//           `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
//           "_blank"
//         );
//         break;

//       case "youtube-search":
//       case "youtube-play":
//         window.open(
//           `https://www.youtube.com/results?search_query=${encodeURIComponent(
//             userInput
//           )}`,
//           "_blank"
//         );
//         break;

//       case "calculator-open":
//         window.open(
//           "https://www.google.com/search?q=calculator",
//           "_blank"
//         );
//         break;

//       case "instagram-open":
//         window.open("https://www.instagram.com/", "_blank");
//         break;

//       case "facebook-open":
//         window.open("https://www.facebook.com/", "_blank");
//         break;

//       case "weather-show":
//         window.open(
//           "https://www.google.com/search?q=weather",
//           "_blank"
//         );
//         break;

//       default:
//         break;
//     }
//   };






//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();

//     // recognition.continuous = true

//     recognition.continuous = false;



//     recognition.lang = 'en-US'
//     recognition.interimResults = false;

//     recognitionRef.current = recognition;

//     let isMounted = true; // flag to avoid setState on unmounted component

//     // Start recognition after 1 second delay onlf if component still mounted
//     const startTimeout = setTimeout(() => {
//       if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
//         try {
//           recognition.start();
//           console.log("Recognition requested to start");
//         } catch (e) {
//           if (e.name !== "InvalidStateError") {
//             console.error(e)
//           }
//         }
//       }
//     }, 1000);

//     recognition.onstart = () => {
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     // recognition.onend = () => {
//     //   isRecognizingRef.current = false;
//     //   setListening(false);
//     //   if (isMounted && !isSpeakingRef.current) {
//     //     setTimeout(() => {
//     //       if (isMounted) {
//     //         try {
//     //           recognition.start();
//     //           console.log("Recognition restarted");
//     //         } catch (e) {
//     //           if (e.name !== "InvalidStateError") console.error(e)
//     //         }
//     //       }
//     //     }, 1000);
//     //   }
//     // };


//     recognition.onend = () => {
//       isRecognizingRef.current = false;
//       setListening(false);
//       console.log("Recognition stopped");
//     };



//     recognition.onerror = (event) => {
//       console.warn("Recognition error:", event.error);
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
//         setTimeout(() => {
//           if (isMounted) {
//             try {
//               recognition.start();
//               console.log("Recognition restarted after error");
//             } catch (e) {
//               if (e.name !== "InvalidStateError") console.error(e)
//             }
//           }
//         }, 1000);
//       }
//     };

//     // recognition.onresult = async (e) => {
//     //   const transcript = e.results[e.results.length - 1][0].transcript.trim();
//     //   if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//     //     setAiText("")
//     //     setUserText(transcript);
//     //     recognition.stop();
//     //     isRecognizingRef.current = false;
//     //     setListening(false);
//     //     // const data = await getGeminiResponse(transcript)
//     //     // handleCommand(data)

//     //     const data = await getGeminiResponse(transcript);

//     //     if (!data) {
//     //       speak("Something went wrong.");
//     //       return;
//     //     }

//     //     handleCommand(data);



//     //     setAiText(data.response)
//     //     setUserText("")
//     //   }
//     // };


//     recognition.onresult = async (e) => {
//       const transcript =
//         e.results[e.results.length - 1][0].transcript.trim();

//       console.log("User:", transcript);

//       // Assistant name detect karo
//       if (
//         !transcript
//           .toLowerCase()
//           .includes(userData.assistantName.toLowerCase())
//       ) {
//         return;
//       }

//       // Agar AI bol raha hai to ignore karo
//       if (isSpeakingRef.current) return;

//       // Recognition stop karo
//       recognition.stop();
//       isRecognizingRef.current = false;
//       setListening(false);

//       setUserText(transcript);
//       setAiText("");

//       try {
//         const data = await getGeminiResponse(transcript);

//         // Agar API fail ho jaye
//         if (!data) {
//           setAiText("Sorry, Gemini is unavailable right now.");
//           speak("Sorry, Gemini is unavailable right now.");
//           setUserText("");
//           return;
//         }

//         setAiText(data.response);

//         handleCommand(data);

//         setUserText("");
//       } catch (error) {
//         console.error(error);

//         setAiText("Something went wrong.");
//         speak("Something went wrong.");
//       }
//     };







//     const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
//     greeting.lang = 'hi-IN';

//     window.speechSynthesis.speak(greeting);


//     return () => {
//       isMounted = false;
//       clearTimeout(startTimeout);
//       recognition.stop();
//       setListening(false);
//       isRecognizingRef.current = false;
//     };
//   }, []);




//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-[15px]'>
//       <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(true)} />
//       {/* <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000053] backdrop-blur-lg p-[20px] flex flex-col gap-[20px] items-start ${ham ? "translate-x-0" : "translate-x-full"} transition-transform`}> */}
//       <div
//         className={`fixed inset-0 z-50 lg:hidden bg-[#00000053] backdrop-blur-lg p-5 flex flex-col gap-5 items-start transition-transform duration-300 ${ham ? "translate-x-0" : "translate-x-full"
//           }`}
//       >
//         <RxCross1 className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(false)} />
//         <button className='min-w-[150px] h-[60px] text-black font-semibold bg-white rounded-full cursor-pointer text-[19px]' onClick={handleLogout}>Log Out</button>
//         <button className='min-w-[150px] h-[60px]  text-black font-semibold bg-white rounded-full cursor-pointer text-[19px] px-[20px] py-[10px]' onClick={() => navigate("/customize")}>Customize your Assistant</button>

//         <div className='w-full h-[2px] bg-gray-400'></div>
//         <h1 className='text-white font-semibold text-[19px]'>History</h1>

//         {/* <div className='w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col'>
//           {userData.history?.map((his, index) => (
//             <span className='text-gray-200 text-[18px] truncate'>{his}</span>
//           ))}

//         </div> */}


//         <div className="w-full flex-1 overflow-y-auto flex flex-col gap-3">
//           {userData.history?.map((his, index) => (
//             <span
//               key={index}
//               className="text-white text-sm break-words border-b border-gray-600 pb-2"
//             >
//               {his}
//             </span>
//           ))}
//         </div>




//       </div>
//       <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold absolute hidden lg:block top-[20px] right-[20px] bg-white rounded-full cursor-pointer text-[19px]' onClick={handleLogout}>Log Out</button>
//       <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white absolute top-[100px] right-[20px] rounded-full cursor-pointer text-[19px] px-[20px] py-[10px] hidden lg:block' onClick={() => navigate("/customize")}>Customize your Assistant</button>
//       <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg'>
//         <img src={userData?.assistantImage} alt="image" className='h-full object-cover' />
//       </div>
//       <h1 className='text-white text-[18px] font-semibold'>I'm {userData?.assistantName}</h1>
//       {!aiText && <img src={userImg} alt="" className='w-[200px]' />}
//       {aiText && <img src={aiImg} alt="" className='w-[200px]' />}

//       <h1 className='text-white text-[18px] font-semibold text-wrap'>{userText ? userText : aiText ? aiText : null}</h1>

//     </div>
//   )
// }

// export default Home














import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";

import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

const Home = () => {
  const {
    userData,
    serverUrl,
    setUserData,
    getGeminiResponse,
  } = useContext(userDataContext);

  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [ham, setHam] = useState(false);

  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);

  const synth = window.speechSynthesis;

  // ---------------- LOGOUT ----------------

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      setUserData(null);

      navigate("/signin");
    } catch (err) {
      console.log(err);
      setUserData(null);
    }
  };

  // ---------------- START RECOGNITION ----------------

  const startRecognition = () => {
    if (
      !recognitionRef.current ||
      isSpeakingRef.current ||
      isRecognizingRef.current
    )
      return;

    try {
      recognitionRef.current.start();
      console.log("🎤 Listening...");
    } catch (err) {
      if (err.name !== "InvalidStateError") {
        console.log(err);
      }
    }
  };

  // ---------------- SPEAK ----------------

  const speak = (text) => {
    if (!text) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";

    const voices = synth.getVoices();

    const voice =
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang === "hi-IN");

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      console.log("🔊 AI Speaking");

      isSpeakingRef.current = true;

      try {
        recognitionRef.current?.stop();
      } catch { }
    };

    utterance.onend = () => {
      console.log("✅ AI Finished");

      isSpeakingRef.current = false;

      // UI clear
      setAiText("");
      setUserText("");

      setTimeout(() => {
        startRecognition();
      }, 500);
    };

    synth.speak(utterance);
  };

  // ---------------- HANDLE COMMAND ----------------

  const handleCommand = (data) => {
    if (!data) return;

    const { type, userInput, response } = data;

    setAiText(response);

    speak(response);

    switch (type) {
      case "google-search":
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
          "_blank"
        );
        break;

      case "youtube-search":
      case "youtube-play":
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            userInput
          )}`,
          "_blank"
        );
        break;

      case "calculator-open":
        window.open(
          "https://www.google.com/search?q=calculator",
          "_blank"
        );
        break;

      case "instagram-open":
        window.open("https://www.instagram.com", "_blank");
        break;

      case "facebook-open":
        window.open("https://www.facebook.com", "_blank");
        break;

      case "weather-show":
        window.open(
          "https://www.google.com/search?q=weather",
          "_blank"
        );
        break;

      default:
        break;
    }
  };

  // ---------------- USE EFFECT ----------------

  useEffect(() => {
    if (!userData) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // ---------------- START ----------------

    recognition.onstart = () => {
      console.log("🎤 Recognition Started");

      isRecognizingRef.current = true;
      setListening(true);
    };

    // ---------------- END ----------------

    recognition.onend = () => {
      console.log("🛑 Recognition End");

      isRecognizingRef.current = false;
      setListening(false);

      if (!isSpeakingRef.current) {
        setTimeout(() => {
          startRecognition();
        }, 500);
      }
    };

    // ---------------- ERROR ----------------

    recognition.onerror = (event) => {
      console.log("Recognition Error :", event.error);

      isRecognizingRef.current = false;
      setListening(false);

      if (
        event.error === "no-speech" ||
        event.error === "aborted" ||
        event.error === "audio-capture"
      ) {
        setTimeout(() => {
          startRecognition();
        }, 1000);
      }
    };

    // ---------------- RESULT ----------------

    recognition.onresult = async (event) => {
      const result = event.results[event.resultIndex];

      if (!result.isFinal) return;

      const transcript = result[0].transcript.trim();

      console.log("🗣 User :", transcript);

      // AI bol raha hai to ignore
      if (isSpeakingRef.current) return;

      // Wake word check
      if (
        !transcript
          .toLowerCase()
          .includes(userData.assistantName.toLowerCase())
      ) {
        return;
      }

      recognition.stop();

      setUserText(transcript);
      setAiText("");

      try {
        const data = await getGeminiResponse(transcript);

        if (!data) {
          speak("Sorry, I am unavailable right now.");
          setUserText("");
          return;
        }

        setAiText(data.response);

        handleCommand(data);

        // User text turant hata do
        setUserText("");
      } catch (err) {
        console.log(err);

        speak("Something went wrong.");
      }
    };

    // ---------------- GREETING ----------------

    const greeting = new SpeechSynthesisUtterance(
      `Hello ${userData.name}, what can I help you with?`
    );

    greeting.lang = "en-US";

    greeting.onstart = () => {
      isSpeakingRef.current = true;
    };

    greeting.onend = () => {
      isSpeakingRef.current = false;

      startRecognition();
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(greeting);

    // ---------------- CLEANUP ----------------

    return () => {
      recognition.stop();
      speechSynthesis.cancel();

      isRecognizingRef.current = false;
      isSpeakingRef.current = false;
    };
  }, [userData]);


  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#02023d] flex flex-col items-center justify-center gap-4 relative p-5">

      {/* Mobile Menu */}
      <CgMenuRight
        className="lg:hidden text-white absolute top-5 right-5 w-7 h-7 cursor-pointer"
        onClick={() => setHam(true)}
      />

      <div
        className={`fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-lg p-5 transition-transform duration-300 ${ham ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <RxCross1
          className="text-white absolute top-5 right-5 w-6 h-6 cursor-pointer"
          onClick={() => setHam(false)}
        />

        <button
          className="bg-white text-black px-5 py-3 rounded-full mt-10"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          className="bg-white text-black px-5 py-3 rounded-full mt-5"
          onClick={() => navigate("/customize")}
        >
          Customize Assistant
        </button>

        <h2 className="text-white mt-8 text-xl font-bold">History</h2>

        <div className="mt-4 h-[60vh] overflow-y-auto flex flex-col gap-3 w-full">
          {userData?.history?.map((item, index) => (
            <div
              key={index}
              className="text-white border-b border-gray-600 pb-2 break-words"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Buttons */}

      <button
        className="hidden lg:block absolute top-5 right-5 bg-white text-black px-5 py-3 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </button>

      <button
        className="hidden lg:block absolute top-24 right-5 bg-white text-black px-5 py-3 rounded-full"
        onClick={() => navigate("/customize")}
      >
        Customize Assistant
      </button>

      {/* Assistant Image */}

      <div className="w-72 h-96 rounded-3xl overflow-hidden shadow-xl">
        <img
          src={userData?.assistantImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-white text-xl font-bold">
        I'm {userData?.assistantName}
      </h1>

      {!aiText ? (
        <img src={userImg} alt="" className="w-48" />
      ) : (
        <img src={aiImg} alt="" className="w-48" />
      )}

      <h2 className="text-white text-center text-lg px-5 max-w-xl">
        {userText || aiText}
      </h2>

      {listening && (
        <p className="text-green-400 text-lg animate-pulse">
          🎤 Listening...
        </p>
      )}
    </div>
  );
};

export default Home;