import React from "react";
import {createRef,useEffect, useRef, useState} from 'react'

const TypingBox = ({ words }) => {
  const [currWordIndex, setCurrWordIndex] = useState(0)
  const [currCharIndex, setCurrCharIndex] = useState(0);
  
  const wordSpanRef = Array(words.length).fill(0).map(i=>createRef());
  
  const textInputRef = useRef(null);
  const handleKeyDown =(e)=>{
    let allSpans = wordSpanRef[currWordIndex].current.querySelectorAll('span')

    //-->logic for the backspace
    if(e.keyCode===32){
      if(allSpans.length<=currCharIndex){
        allSpans[currCharIndex-1].className = allSpans[currCharIndex-1].className.replace('right','');
      }else{
        allSpans[currCharIndex].className = allSpans[currCharIndex-1].className.replace('current','');
      }
      wordSpanRef[currWordIndex+1].current.querySelectorAll('span')[0].className='char current';
      setCurrWordIndex(currWordIndex+1);
      setCurrCharIndex(0);
    }

    //---> logic for backspace
    if(e.keyCode===8){

      if(currCharIndex!==0){

          if(currCharIndex===allSpans.length){
              if(allSpans[currCharIndex-1].className.includes("extra")){
                  allSpans[currCharIndex-1].remove();
                  allSpans[currCharIndex-2].className+=' right';
              }
              else{
                  allSpans[currCharIndex-1].className = 'char current';
              }
              setCurrCharIndex(currCharIndex-1);
              return;
          }

          wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex].className = 'char';
          wordSpanRef[currWordIndex].current.querySelectorAll('span')[currCharIndex-1].className = 'char current';
          setCurrCharIndex(currCharIndex-1);
      }

      return;
  }

    // --> **for the wrong spelling added incrementing Span** 
    if(currCharIndex === allSpans.length){
      let newSpan = document.createElement('span');
      newSpan.innerHTML=e.key;
      newSpan.className = 'char incorrect right extra';
      allSpans[currCharIndex-1].className= allSpans[currCharIndex-1].className.replace('right','');
      wordSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex+1);
      return;
    }

    //---> wrond letter entered in a span
    let key =e.key;
    console.log('key Pressed-', key);
    console.log("current character", allSpans[currCharIndex].innerText);
    let currentCharacter = allSpans[currCharIndex].innerText;
    if(key ===currentCharacter){
      console.log('correct key pressed');
      allSpans[currCharIndex].className="char correct"
    }else{
      console.log("incorrect key pressed");
      allSpans[currCharIndex].className ="char incorrect"
    }

    // ---> getting the cursor in the right at the end of the word span 
    if(currCharIndex+1 === allSpans.length){
      allSpans[currCharIndex].className +='right';
    }else{
      allSpans[currCharIndex].className='char current'
    }
    setCurrCharIndex(currCharIndex+1)

    //
  }
  const  handleKeyUp = (e)=>{

  }
   const focusInput = ()=>{
    textInputRef.current.focus();
  }
  useEffect(()=>{
    focusInput();
    wordSpanRef[0].current.querySelectorAll('span')[0].className = 'char current';
  },[]);

  return (
    <>
      <div className="type-box">
        <div className="words">

          {words.map((word, index) => {
            return (
              <span className="word">
                {word.split("").map((char, ind) => {
                  return <span className="char">{char}</span>;
                })}
              </span>
            );
          })}

        </div>
      </div>
      <input type="text" 
      className='hidden-input'
      ref={textInputRef}
      onKeyDown={(e)=> handleKeyDown(e)} 
      onKeyUp={(e)=> handleKeyUp(e)} />
    </>
  );
};

export default TypingBox;
