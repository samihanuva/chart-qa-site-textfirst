// import React, { useState, useEffect, useRef } from 'react';
// import rawSamples from './data/chartSamples.json';
// import { MathJax, MathJaxContext } from 'better-react-mathjax';

// const chartImages = require.context('./charts', false, /\.png$/);

// const shuffleArray = (array) => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

// const ChartQATaskApp = () => {
//   const [userId, setUserId] = useState(() => {
//     const stored = localStorage.getItem('userId');
//     if (stored) return stored;
//     const newId = 'user_' + Date.now();
//     localStorage.setItem('userId', newId);
//     return newId;
//   });

//   // const [shuffledSamples, setShuffledSamples] = useState(() => {
//   //   const stored = localStorage.getItem('shuffledSamples');
//   //   if (stored) return JSON.parse(stored);
//   //   const shuffled = shuffleArray(rawSamples);
//   //   localStorage.setItem('shuffledSamples', JSON.stringify(shuffled));
//   //   return shuffled;
//   // });

// const [shuffledSamples, setShuffledSamples] = useState(() => {
//   const stored = localStorage.getItem('shuffledSamples');
//   if (stored) return JSON.parse(stored);

//   // ✅ Filter samples based on correct explanation types
//   const textSamples = rawSamples.filter(sample => sample.explanationType === 'Text');
//   const visualSamples = rawSamples.filter(sample => sample.explanationType === 'Visual');

//   // ✅ Debug logs to verify counts
//   console.log("✅ Text Samples:", textSamples.length);
//   console.log("✅ Visual Samples:", visualSamples.length);

//   // ✅ Shuffle each group
//   const shuffledText = shuffleArray(textSamples);
//   const shuffledVisual = shuffleArray(visualSamples);

//   // ✅ Concatenate for Text-First order
//   const orderedSamples = [...shuffledText, ...shuffledVisual];

//   // ✅ Save to localStorage
//   localStorage.setItem('shuffledSamples', JSON.stringify(orderedSamples));
//   return orderedSamples;
// });


//   const [currentIndex, setCurrentIndex] = useState(() => {
//     const saved = localStorage.getItem('currentIndex');
//     return saved ? parseInt(saved, 10) : 0;
//   });

//   const [userAnswers, setUserAnswers] = useState(() => {
//     const saved = localStorage.getItem('userAnswers');
//     return saved ? JSON.parse(saved) : {};
//   });


//   const [visitedSamples, setVisitedSamples] = useState(() => {
//   const stored = localStorage.getItem('visitedSamples');
//   return stored ? new Set(JSON.parse(stored)) : new Set();
//   });


//   const [globalTimeLeft, setGlobalTimeLeft] = useState(() => {
//     const saved = localStorage.getItem('globalTimeLeft');
//     return saved ? parseInt(saved, 10) : rawSamples.length * 60;
//   });

//   const [taskStarted, setTaskStarted] = useState(() => {
//     const saved = localStorage.getItem('taskStarted');
//     return saved === 'true';
//   });

//   const [taskEnded, setTaskEnded] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const [hovered, setHovered] = useState(null);
//   const [selected, setSelected] = useState(null);
//   const [isTextSelecting, setIsTextSelecting] = useState(false);
//   const [questionStartTime, setQuestionStartTime] = useState(() => {
//   const stored = localStorage.getItem('questionStartTime');
//   return stored ? parseInt(stored, 10) : Date.now();
// });

// useEffect(() => {
//   localStorage.setItem('questionStartTime', questionStartTime.toString());
// }, [questionStartTime]);

//   const globalTimerRef = useRef(null);

//   useEffect(() => {
//     if (taskStarted) {
//       globalTimerRef.current = setInterval(() => {
//         setGlobalTimeLeft((prev) => {
//           if (prev <= 1) {
//             clearInterval(globalTimerRef.current);
//             handleAutoSubmit();
//             return 0;
//           }
//           const newVal = prev - 1;
//           localStorage.setItem('globalTimeLeft', newVal.toString());
//           return newVal;
//         });
//       }, 1000);
//       return () => clearInterval(globalTimerRef.current);
//     }
//   }, [taskStarted]);

//   const [taskStartTimestamp, setTaskStartTimestamp] = useState(() => {
//   const saved = localStorage.getItem('taskStartTimestamp');
//   return saved ? parseInt(saved, 10) : null;
// });

//   useEffect(() => {
//     localStorage.setItem('currentIndex', currentIndex.toString());
//     localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
//   }, [currentIndex, userAnswers]);

// const startTask = () => {
//   const startTime = Date.now();
//   setTaskStarted(true);
//   setQuestionStartTime(startTime);
//   setTaskStartTimestamp(startTime);
//   localStorage.setItem('taskStarted', 'true');
//   localStorage.setItem('taskStartTimestamp', startTime.toString());
// };

// const [endClicked, setEndClicked] = useState(false);

// const endTask = () => {
//   if (!submitted) {
//     setEndClicked(true); // ✅ flag end task manually triggered
//     clearInterval(globalTimerRef.current);
//     setTaskEnded(true);
//     submitToBackend();
//   }
// };


//   const handleAutoSubmit = () => {
//     setTaskEnded(true);
//     submitToBackend(true);
//   };

//   const currentSample = shuffledSamples[currentIndex];


//   const hasVisual = Array.isArray(currentSample?.visualExplanation);
//   const hasText = Array.isArray(currentSample?.textExplanation);

//  const handleAnswerChange = (option) => {
//   const chartKey = currentSample.id;
//   const prev = userAnswers[chartKey] || {};

//   const duration = Math.floor((Date.now() - questionStartTime) / 1000);
//   const prevTime = prev.timeTakenSeconds || 0;
//   const totalTime = prevTime + duration;

//   const newAnswers = {
//     ...userAnswers,
//     [chartKey]: {
//       chartId: currentSample.id,
//       questionType: currentSample.questionType,
//       explanationType: currentSample.explanationType,
//       selectedAnswer: option,
//       correctAnswer: currentSample.answer,
//       isCorrect: option === currentSample.answer,
//       timeTakenSeconds: totalTime,
//     },
//   };

//   setUserAnswers(newAnswers);
//   setQuestionStartTime(Date.now()); // ✅ Reset for next timing interval
// };



// const recordTimeForCurrentQuestion = ({ allowIfUnanswered = false } = {}) => {
//   const chartKey = currentSample.id;
//   const prev = userAnswers[chartKey];

//   const hasAnswered = prev && prev.selectedAnswer;

//   if (!hasAnswered && !allowIfUnanswered) return;

//   const duration = Math.floor((Date.now() - questionStartTime) / 1000);
//   const totalTime = (prev?.timeTakenSeconds || 0) + duration;

//   const updatedAnswer = {
//     ...prev,
//     chartId: currentSample.id,
//     questionType: currentSample.questionType,
//     explanationType: currentSample.explanationType,
//     selectedAnswer: prev?.selectedAnswer || null,
//     correctAnswer: currentSample.answer,
//     isCorrect: prev?.selectedAnswer === currentSample.answer,
//     timeTakenSeconds: totalTime,
//   };

//   setUserAnswers((prevAnswers) => ({
//   ...prevAnswers,
//   [chartKey]: updatedAnswer,
// }));

// };




// const handleNext = () => {
//   if (!visitedSamples.has(currentIndex)) {
//     // First time visiting → log time even if unanswered
//     recordTimeForCurrentQuestion({ allowIfUnanswered: true });
//     setVisitedSamples((prev) => {
//       const newSet = new Set(prev).add(currentIndex);
//       localStorage.setItem('visitedSamples', JSON.stringify([...newSet]));
//       return newSet;
//     });
//   } else {
//     // Already visited → only count if answered
//     recordTimeForCurrentQuestion({ allowIfUnanswered: false });
//   }

//   if (currentIndex < shuffledSamples.length - 1) {
//     setCurrentIndex(currentIndex + 1);
//     setHovered(null);
//     setSelected(null);
//     // setQuestionStartTime(Date.now());
//   } else {
//     endTask();
//   }
// };


// const handleBack = () => {
//   recordTimeForCurrentQuestion({ allowIfUnanswered: false });

//   if (currentIndex > 0) {
//     setCurrentIndex(currentIndex - 1);
//     setHovered(null);
//     setSelected(null);
//     // setQuestionStartTime(Date.now());
//   }
// };



//   const submitToBackend = async (auto = false) => {
//   const chartResponses = Object.values(userAnswers);
//   const now = Date.now();

//   // ✅ Use real taskStartTimestamp if available
//   const startTimestamp = taskStartTimestamp || now;
//   const totalTimeSeconds = Math.floor((now - startTimestamp) / 1000);

//   const payload = {
//     userId,
//     startTime: new Date(startTimestamp),
//     endTime: new Date(now),
//     totalTimeSeconds,
//     chartResponses,
//     summary: {
//       totalCharts: chartResponses.length,
//       correctAnswers: chartResponses.filter((r) => r.isCorrect).length,
//       wrongAnswers: chartResponses.filter((r) => !r.isCorrect).length,
//     },
//   };

//   try {
//     const res = await fetch('http://localhost:5000/api/responses', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });
//     await res.json();
//     setSubmitted(true);
//     localStorage.clear(); // ✅ Clear everything
//     setTaskStartTimestamp(null); // ✅ Reset this too
//     if (!auto) alert("✅ Your response has been submitted.");
//   } catch (err) {
//     console.error("❌ Failed to send response:", err);
//   }
// };


//   const isExactMatch = (id) => selected === id || hovered === id;
//   const isActiveStep = (stepId) => selected?.startsWith(`${stepId}`) || hovered?.startsWith(`${stepId}`);

//   const getChartImage = () => {
//     if (!currentSample) return '';
//     let imageName = currentSample.chartImage;
//     const key = selected || hovered;

//     if (key && hasVisual) {
//       const [stepIdx, subStepIdx] = key.split('-').map(Number);
//       const step = currentSample.visualExplanation[stepIdx];
//       const sub = step?.subSteps?.[subStepIdx];
//       if (sub?.highlightedChartImage) imageName = sub.highlightedChartImage;
//       else if (step?.highlightedChartImage) imageName = step.highlightedChartImage;
//     }

//     try {
//       return chartImages(`./${imageName}`);
//     } catch {
//       return chartImages(`./${currentSample.chartImage}`);
//     }
//   };

//   const renderFormula = (formula) => <MathJax>{`$$${formula}$$`}</MathJax>;

//   useEffect(() => {
//     const handleMouseDown = () => setIsTextSelecting(true);
//     const handleMouseUp = () => {
//       setTimeout(() => {
//         if (window.getSelection().toString().length > 0) setHovered(null);
//         setIsTextSelecting(false);
//       }, 0);
//     };
//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
//     return () => {
//       window.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, []);

//   useEffect(() => {
//   localStorage.setItem('visitedSamples', JSON.stringify([...visitedSamples]));
// }, [visitedSamples]);

// useEffect(() => {
//   setQuestionStartTime(Date.now());
// }, [currentIndex]);



//   if (!taskStarted) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6">Welcome to the Chart QA Task</h1>
//         <p className="mb-6 text-gray-700 max-w-xl text-center">
//           In this task, you'll analyze charts, view clues/explanations if necessary, and answer mcq questions related to the chart. You will get 1 minute for answering each question. Click below when you're ready to begin.
//         </p>
//         <button
//           onClick={startTask}
//           className="px-6 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700"
//         >
//           Start Task
//         </button>
//       </div>
//     );
//   }

//   return (
//     <MathJaxContext>
    
//       <div className="flex flex-col min-h-screen">
//       {!currentSample ? (
//         <div className="flex justify-center items-center h-screen text-red-600 text-xl font-bold">
//           ❌ No valid chart sample found. Please check your data or filters.
//         </div>
//       ) : (
//         <div>
//         {/* Top Navbar */}
//         <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-6 py-3 flex justify-between items-center z-50">
//           <div className="text-lg font-semibold">Chart QA Task - Textual First </div>
//           <div className="flex items-center gap-6">
//             {/* <div className="text-orange-400 font-semibold text-md">
//               ⏳ Time Left: {Math.floor(globalTimeLeft / 60)}:{String(globalTimeLeft % 60).padStart(2, '0')}
//             </div> */}

//             <button
//             onClick={endTask}  disabled={submitted || endClicked}
//             className={`px-3 py-1 rounded ${submitted || endClicked? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white' }`}>
//             {submitted || endClicked ? 'Task Ended' : 'End Task'}
//           </button>

//           </div>
//         </div>
        

//         <div className="flex flex-col items-center p-6 pb-20 pt-20 min-h-screen">
//           {/* Chart and Explanation Layout */}
//           <div className="flex w-full max-w-[1300px] justify-center gap-4 mb-8">
//             <div className="w-[50%] h-[500px] flex items-center justify-center border rounded shadow">
//               <img src={getChartImage()} alt="Chart" className="max-w-full max-h-full object-contain" />
//             </div>
//             <div className="w-[50%] h-[500px] overflow-y-auto border rounded shadow p-4 relative">
//               {(hasVisual || hasText) && <h2 className="text-lg font-semibold mb-2">Explanation Steps</h2>}
//               {hasVisual && selected && (
//                 <button
//                   onClick={() => setSelected(null)}
//                   className="absolute top-2 right-4 text-sm text-blue-600 hover:underline"
//                 >
//                   Clear Selection
//                 </button>
//               )}
//               {hasVisual &&
//                 currentSample.visualExplanation.map((step, sIdx) => (
//                   <div key={sIdx} className="mb-4">
//                     <div
//                       onMouseEnter={() => !isTextSelecting && setHovered(`${sIdx}`)}
//                       onMouseLeave={() => setHovered(null)}
//                       onClick={() => setSelected((prev) => (prev === `${sIdx}` ? null : `${sIdx}`))}
//                       className={`cursor-pointer ${isActiveStep(`${sIdx}`) ? 'underline decoration-blue-400 decoration-2 underline-offset-4' : ''}`}
//                     >
//                       <span className="text-blue-600 font-semibold mr-1">{step.stepNumber}:</span>
//                       <span className="font-semibold">{step.stepTitle}</span>
//                       <div className="ml-4 mt-1">
//                         <p>{step.stepDescription}</p>
//                         {step.formula && <div>{renderFormula(step.formula)}</div>}
//                         {step.example && <p className="text-sm italic mt-1">Example: {step.example}</p>}
//                       </div>
//                     </div>
//                     {step.subSteps && (
//                       <div className="ml-4 mt-2">
//                         {step.subSteps.map((sub, subIdx) => {
//                           const key = `${sIdx}-${subIdx}`;
//                           const isSubActive = isExactMatch(key);
//                           return (
//                             <div
//                               key={key}
//                               onMouseEnter={() => !isTextSelecting && setHovered(key)}
//                               onMouseLeave={() => setHovered(null)}
//                               onClick={() => setSelected((prev) => (prev === key ? null : key))}
//                               className={`cursor-pointer mb-2 ${isSubActive ? 'underline decoration-blue-400 decoration-2 underline-offset-4' : ''}`}
//                             >
//                               <div className="text-sm">
//                                 <span className="text-blue-600 mr-1">{sub.subStepNumber}:</span> {sub.subStepDescription}
//                               </div>
//                               {sub.formula && <div className="ml-4">{renderFormula(sub.formula)}</div>}
//                               {sub.example && <p className="text-sm italic ml-4">Example: {sub.example}</p>}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               {hasText &&
//                 currentSample.textExplanation.map((step, idx) => (
//                   <div key={idx} className="mb-4">
//                     <div>
//                       <span className="text-blue-600 font-semibold mr-1">{step.stepNumber}:</span>
//                       <span className="font-semibold">{step.stepTitle}</span>
//                     </div>
//                     <div className="ml-4">
//                       <p>{step.stepDescription}</p>
//                       {step.formula && <div>{renderFormula(step.formula)}</div>}
//                       {step.example && <p className="text-sm italic mt-1">Example: {step.example}</p>}
//                     </div>

//               {/* Sub-steps (with formula + example support) */}

//               {step.subSteps && (
//               <div className="ml-6 mt-2">
//                 {step.subSteps.map((sub, subIdx) => (
//                   <div key={subIdx} className="text-sm mb-3">
//                     <p>
//                       <span className="text-blue-500 mr-1">{sub.subStepNumber}.</span>
//                       {sub.subStepDescription}
//                     </p>
//                     {sub.formula && (
//                       <div className="ml-4">{renderFormula(sub.formula)}</div>
//                     )}
//                     {sub.example && (
//                       <p className="text-sm italic ml-4">Example: {sub.example}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
                    
                 
//                   </div>

              

//                 ))}
//             </div>
//           </div>

//           {/* Q/A Section */}
//           <div className="w-full max-w-5xl min-h-[150px]">
//             <h2 className="text-lg font-semibold text-white text-center mb-2 pb-0.5 bg-gray-500 w-[1025px] rounded-sm">Question</h2>
//             <h3 className="font-semibold mb-2">{currentSample.question}</h3>
//             <form>
//               {currentSample.options.map((option, idx) => (
//                 <label key={idx} className="block my-1">
//                   <input
//                     type="radio"
//                     name={`question-${currentIndex}`}
//                     value={option}
//                     checked={userAnswers[currentSample.id]?.selectedAnswer === option}
//                     onChange={() => handleAnswerChange(option)}
//                     className="mr-2"
//                   />
//                   {option}
//                 </label>
//               ))}
//             </form>
//           </div>

//           {/* Navigation */}
//           <div className="fixed bottom-10 w-full max-w-5xl px-6 z-50">
//             <div className="flex justify-between items-center bg-white px-2">
//               <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>
//               <div className="text-sm text-gray-700">Progress: {currentIndex + 1} of {shuffledSamples.length}</div>
//               <button
//                 onClick={handleNext}
//                 disabled={submitted}
//                 className={`px-4 py-2 rounded ${submitted ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
//               >
//                 {currentIndex === shuffledSamples.length - 1 ? submitted ? 'Submitted' : 'Submit' : 'Next'}

//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       )}
//     </div>
//     </MathJaxContext>
//   );
// };

// export default ChartQATaskApp;




import React, { useState, useEffect, useRef } from 'react';
import rawSamples from './data/chartSamples.json';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const chartImages = require.context('./charts', false, /\.png$/);

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const ChartQATaskApp = () => {
  const [userId, setUserId] = useState(() => {
    const stored = localStorage.getItem('userId');
    if (stored) return stored;
    const newId = 'user_' + Date.now();
    localStorage.setItem('userId', newId);
    return newId;
  });

  // const [shuffledSamples, setShuffledSamples] = useState(() => {
  //   const stored = localStorage.getItem('shuffledSamples');
  //   if (stored) return JSON.parse(stored);
  //   const shuffled = shuffleArray(rawSamples);
  //   localStorage.setItem('shuffledSamples', JSON.stringify(shuffled));
  //   return shuffled;
  // });

const [shuffledSamples, setShuffledSamples] = useState(() => {
  const stored = localStorage.getItem('shuffledSamples');
  if (stored) return JSON.parse(stored);

  // ✅ Filter samples based on correct explanation types
  const textSamples = rawSamples.filter(sample => sample.explanationType === 'Text');
  const visualSamples = rawSamples.filter(sample => sample.explanationType === 'Visual');

  // ✅ Debug logs to verify counts
  console.log("✅ Text Samples:", textSamples.length);
  console.log("✅ Visual Samples:", visualSamples.length);

  // ✅ Shuffle each group
  const shuffledText = shuffleArray(textSamples);
  const shuffledVisual = shuffleArray(visualSamples);

  // ✅ Concatenate for Text-First order
  const orderedSamples = [...shuffledText, ...shuffledVisual];

  // ✅ Save to localStorage
  localStorage.setItem('shuffledSamples', JSON.stringify(orderedSamples));
  return orderedSamples;
});


  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem('currentIndex');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [userAnswers, setUserAnswers] = useState(() => {
    const saved = localStorage.getItem('userAnswers');
    return saved ? JSON.parse(saved) : {};
  });


  const [visitedSamples, setVisitedSamples] = useState(() => {
  const stored = localStorage.getItem('visitedSamples');
  return stored ? new Set(JSON.parse(stored)) : new Set();
  });


  const [globalTimeLeft, setGlobalTimeLeft] = useState(() => {
    const saved = localStorage.getItem('globalTimeLeft');
    return saved ? parseInt(saved, 10) : rawSamples.length * 60;
  });

  const [taskStarted, setTaskStarted] = useState(() => {
    const saved = localStorage.getItem('taskStarted');
    return saved === 'true';
  });

  const [taskEnded, setTaskEnded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isTextSelecting, setIsTextSelecting] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(() => {
  const stored = localStorage.getItem('questionStartTime');
  return stored ? parseInt(stored, 10) : Date.now();
});

useEffect(() => {
  localStorage.setItem('questionStartTime', questionStartTime.toString());
}, [questionStartTime]);

  const globalTimerRef = useRef(null);

  useEffect(() => {
    if (taskStarted) {
      globalTimerRef.current = setInterval(() => {
        setGlobalTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(globalTimerRef.current);
            handleAutoSubmit();
            return 0;
          }
          const newVal = prev - 1;
          localStorage.setItem('globalTimeLeft', newVal.toString());
          return newVal;
        });
      }, 1000);
      return () => clearInterval(globalTimerRef.current);
    }
  }, [taskStarted]);

  const [taskStartTimestamp, setTaskStartTimestamp] = useState(() => {
  const saved = localStorage.getItem('taskStartTimestamp');
  return saved ? parseInt(saved, 10) : null;
});

  useEffect(() => {
    localStorage.setItem('currentIndex', currentIndex.toString());
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
  }, [currentIndex, userAnswers]);

const startTask = () => {
  const startTime = Date.now();
  setTaskStarted(true);
  setQuestionStartTime(startTime);
  setTaskStartTimestamp(startTime);
  localStorage.setItem('taskStarted', 'true');
  localStorage.setItem('taskStartTimestamp', startTime.toString());
};

const [endClicked, setEndClicked] = useState(false);

const endTask = () => {
  if (!submitted) {
    setEndClicked(true); // ✅ flag end task manually triggered
    clearInterval(globalTimerRef.current);
    setTaskEnded(true);
    submitToBackend();
  }
};


  const handleAutoSubmit = () => {
    setTaskEnded(true);
    submitToBackend(true);
  };

  const currentSample = shuffledSamples[currentIndex];

  

  useEffect(() => {
    const key = currentSample?.id;
    if (key && userAnswers[key] === undefined) {
      setUserAnswers(prev => ({
        ...prev,
        [key]: {
          selectedAnswer: null, // Ensure controlled behavior
        },
      }));
    }
  }, [currentSample?.id]);



  const hasVisual = Array.isArray(currentSample?.visualExplanation);
  const hasText = Array.isArray(currentSample?.textExplanation);

 const handleAnswerChange = (option) => {
  const chartKey = currentSample.id;
  const prev = userAnswers[chartKey] || {};

  const duration = Math.floor((Date.now() - questionStartTime) / 1000);
  const prevTime = prev.timeTakenSeconds || 0;
  const totalTime = prevTime + duration;

  const newAnswers = {
    ...userAnswers,
    [chartKey]: {
      chartId: currentSample.id,
      questionType: currentSample.questionType,
      explanationType: currentSample.explanationType,
      selectedAnswer: option,
      correctAnswer: currentSample.answer,
      isCorrect: option === currentSample.answer,
      timeTakenSeconds: totalTime,
    },
  };

  setUserAnswers(newAnswers);
  setQuestionStartTime(Date.now()); // ✅ Reset for next timing interval
};



const recordTimeForCurrentQuestion = ({ allowIfUnanswered = false } = {}) => {
  const chartKey = currentSample.id;
  const prev = userAnswers[chartKey];

  const hasAnswered = prev && prev.selectedAnswer;

  if (!hasAnswered && !allowIfUnanswered) return;

  const duration = Math.floor((Date.now() - questionStartTime) / 1000);
  const totalTime = (prev?.timeTakenSeconds || 0) + duration;

  const updatedAnswer = {
    ...prev,
    chartId: currentSample.id,
    questionType: currentSample.questionType,
    explanationType: currentSample.explanationType,
    selectedAnswer: prev?.selectedAnswer || null,
    correctAnswer: currentSample.answer,
    isCorrect: prev?.selectedAnswer === currentSample.answer,
    timeTakenSeconds: totalTime,
  };

  setUserAnswers((prevAnswers) => ({
  ...prevAnswers,
  [chartKey]: updatedAnswer,
}));

};




const handleNext = () => {
  if (!visitedSamples.has(currentSample.id)) {
    // First time visiting → log time even if unanswered
    recordTimeForCurrentQuestion({ allowIfUnanswered: true });
    setVisitedSamples((prev) => {
      const newSet = new Set(prev).add(currentSample.id);
      localStorage.setItem('visitedSamples', JSON.stringify([...newSet]));
      return newSet;
    });
  } else {
    // Already visited → only count if answered
    recordTimeForCurrentQuestion({ allowIfUnanswered: false });
  }

  if (currentIndex < shuffledSamples.length - 1) {
    setCurrentIndex(currentIndex + 1);
    setHovered(null);
    setSelected(null);
    // setQuestionStartTime(Date.now());
  } else {
    endTask();
  }
};


const handleBack = () => {
  recordTimeForCurrentQuestion({ allowIfUnanswered: false });

  if (currentIndex > 0) {
    setCurrentIndex(currentIndex - 1);
    setHovered(null);
    setSelected(null);
    // setQuestionStartTime(Date.now());
  }
};



  const submitToBackend = async (auto = false) => {
  const chartResponses = Object.values(userAnswers).filter(r => r.selectedAnswer);
  const now = Date.now();

  // ✅ Use real taskStartTimestamp if available
  const startTimestamp = taskStartTimestamp || now;
  const totalTimeSeconds = Math.floor((now - startTimestamp) / 1000);

  const payload = {
    userId,
    startTime: new Date(startTimestamp),
    endTime: new Date(now),
    totalTimeSeconds,
    chartResponses,
    summary: {
      totalCharts: chartResponses.length,
      correctAnswers: chartResponses.filter((r) => r.isCorrect).length,
      wrongAnswers: chartResponses.filter((r) => !r.isCorrect).length,
    },
  };

  try {
    const res = await fetch('http://localhost:5000/api/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    await res.json();
    setSubmitted(true);
    localStorage.clear(); // ✅ Clear everything
    setTaskStartTimestamp(null); // ✅ Reset this too
    if (!auto) alert("✅ Your response has been submitted.");
  } catch (err) {
    console.error("❌ Failed to send response:", err);
  }
};


  const isExactMatch = (id) => selected === id || hovered === id;
  const isActiveStep = (stepId) => selected?.startsWith(`${stepId}`) || hovered?.startsWith(`${stepId}`);

  const getChartImage = () => {
    if (!currentSample) return '';
    let imageName = currentSample.chartImage;
    const key = selected || hovered;

    if (key && hasVisual) {
      const [stepIdx, subStepIdx] = key.split('-').map(Number);
      const step = currentSample.visualExplanation[stepIdx];
      const sub = step?.subSteps?.[subStepIdx];
      if (sub?.highlightedChartImage) imageName = sub.highlightedChartImage;
      else if (step?.highlightedChartImage) imageName = step.highlightedChartImage;
    }

    try {
      return chartImages(`./${imageName}`);
    } catch {
      return chartImages(`./${currentSample.chartImage}`);
    }
  };

  const renderFormula = (formula) => <MathJax>{`$$${formula}$$`}</MathJax>;

  useEffect(() => {
    const handleMouseDown = () => setIsTextSelecting(true);
    const handleMouseUp = () => {
      setTimeout(() => {
        if (window.getSelection().toString().length > 0) setHovered(null);
        setIsTextSelecting(false);
      }, 0);
    };
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
  localStorage.setItem('visitedSamples', JSON.stringify([...visitedSamples]));
}, [visitedSamples]);

useEffect(() => {
  setQuestionStartTime(Date.now());
}, [currentIndex]);



  if (!taskStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Chart QA Task</h1>
        <p className="mb-6 text-gray-700 max-w-xl text-center">
          In this task, you'll analyze charts, view clues/explanations if necessary, and answer mcq questions related to the chart. You will get 1 minute for answering each question. Click below when you're ready to begin.
        </p>
        <button
          onClick={startTask}
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700"
        >
          Start Task
        </button>
      </div>
    );
  }

  return (
    <MathJaxContext>
    
      <div className="flex flex-col min-h-screen">
      {!currentSample ? (
        <div className="flex justify-center items-center h-screen text-red-600 text-xl font-bold">
          ❌ No valid chart sample found. Please check your data or filters.
        </div>
      ) : (
        <div>
        {/* Top Navbar */}
        <div className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-6 py-3 flex justify-between items-center z-50">
          <div className="text-lg font-semibold">Chart QA Task - Textual First </div>
          <div className="flex items-center gap-6">
            <div className="text-orange-400 font-semibold text-md">
              ⏳ Time Left: {Math.floor(globalTimeLeft / 60)}:{String(globalTimeLeft % 60).padStart(2, '0')}
            </div>

            <button
            onClick={endTask}  disabled={submitted || endClicked}
            className={`px-3 py-1 rounded ${submitted || endClicked? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white' }`}>
            {submitted || endClicked ? 'Task Ended' : 'End Task'}
          </button>

          </div>
        </div>
        

        <div className="flex flex-col items-center p-6 pb-20 pt-20 min-h-screen">
          {/* Chart and Explanation Layout */}
          <div className="flex w-full max-w-[1500px] justify-center gap-4 mb-8">
            <div className="w-[65%] h-[500px] flex items-center justify-center border rounded shadow">
              <img src={getChartImage()} alt="Chart" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="w-[35%] h-[500px] overflow-y-auto border rounded shadow p-4 relative">
              {(hasVisual || hasText) && <h2 className="text-lg font-semibold mb-2">Explanation Steps</h2>}
              {hasVisual && selected && (
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-4 text-sm text-blue-600 hover:underline"
                >
                  Clear Selection
                </button>
              )}
              {hasVisual &&
                currentSample.visualExplanation.map((step, sIdx) => (
                  <div key={sIdx} className="mb-4">
                    <div
                      onMouseEnter={() => !isTextSelecting && setHovered(`${sIdx}`)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setSelected((prev) => (prev === `${sIdx}` ? null : `${sIdx}`))}
                      className={`cursor-pointer ${isActiveStep(`${sIdx}`) ? 'underline decoration-blue-400 decoration-2 underline-offset-4' : ''}`}
                    >
                      <span className="text-blue-600 font-semibold mr-1">{step.stepNumber}:</span>
                      <span className="font-semibold">{step.stepTitle}</span>
                      <div className="ml-4 mt-1">
                        <p>{step.stepDescription}</p>
                        {step.formula && <div>{renderFormula(step.formula)}</div>}
                        {step.example && <p className="text-sm italic mt-1">Example: {step.example}</p>}
                      </div>
                    </div>
                    {step.subSteps && (
                      <div className="ml-4 mt-2">
                        {step.subSteps.map((sub, subIdx) => {
                          const key = `${sIdx}-${subIdx}`;
                          const isSubActive = isExactMatch(key);
                          return (
                            <div
                              key={key}
                              onMouseEnter={() => !isTextSelecting && setHovered(key)}
                              onMouseLeave={() => setHovered(null)}
                              onClick={() => setSelected((prev) => (prev === key ? null : key))}
                              className={`cursor-pointer mb-2 ${isSubActive ? 'underline decoration-blue-400 decoration-2 underline-offset-4' : ''}`}
                            >
                              <div className="text-sm">
                                <span className="text-blue-600 mr-1">{sub.subStepNumber}:</span> {sub.subStepDescription}
                              </div>
                              {sub.formula && <div className="ml-4">{renderFormula(sub.formula)}</div>}
                              {sub.example && <p className="text-sm italic ml-4">Example: {sub.example}</p>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              {hasText &&
                currentSample.textExplanation.map((step, idx) => (
                  <div key={idx} className="mb-4">
                    <div>
                      <span className="text-blue-600 font-semibold mr-1">{step.stepNumber}:</span>
                      <span className="font-semibold">{step.stepTitle}</span>
                    </div>
                    <div className="ml-4">
                      <p>{step.stepDescription}</p>
                      {step.formula && <div>{renderFormula(step.formula)}</div>}
                      {step.example && <p className="text-sm italic mt-1">Example: {step.example}</p>}
                    </div>

              {/* Sub-steps (with formula + example support) */}

              {step.subSteps && (
              <div className="ml-6 mt-2">
                {step.subSteps.map((sub, subIdx) => (
                  <div key={subIdx} className="text-sm mb-3">
                    <p>
                      <span className="text-blue-500 mr-1">{sub.subStepNumber}.</span>
                      {sub.subStepDescription}
                    </p>
                    {sub.formula && (
                      <div className="ml-4">{renderFormula(sub.formula)}</div>
                    )}
                    {sub.example && (
                      <p className="text-sm italic ml-4">Example: {sub.example}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
                    
                 
                  </div>

              

                ))}
            </div>
          </div>

          {/* Q/A Section */}
          <div className="w-full max-w-5xl min-h-[150px]">
            <h2 className="text-lg font-semibold text-white text-center mb-2 pb-0.5 bg-gray-500 w-[1025px] rounded-sm">Question</h2>
            <h3 className="font-semibold mb-2">{currentSample.question}</h3>
            <form>
              {currentSample.options.map((option, idx) => (
                <label key={idx} className="block my-1">
                  <input
                    type="radio"
                    name={`question-${currentIndex}`}
                    value={option}
                    checked={userAnswers[currentSample.id]?.selectedAnswer === option}
                    onChange={() => handleAnswerChange(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </form>
          </div>

          {/* Navigation */}
          <div className="fixed bottom-10 w-full max-w-5xl px-6 z-50">
            <div className="flex justify-between items-center bg-white px-2">
              <button onClick={handleBack} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>
              <div className="text-sm text-gray-700">Progress: {currentIndex + 1} of {shuffledSamples.length}</div>
              <button
                onClick={handleNext}
                disabled={submitted || endClicked}
                className={`px-4 py-2 rounded ${submitted ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                {currentIndex === shuffledSamples.length - 1 ? (submitted || endClicked ? 'Submitted' : 'Submit') : 'Next'}

              </button>
            </div>
          </div>
        </div>
      </div>

      )}
    </div>
    </MathJaxContext>
  );
};

export default ChartQATaskApp;




