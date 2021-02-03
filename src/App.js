// 0. Install fingerpose npm install fingerpose
// 1. Add Use State
// 2. Import emojis and finger pose import * as fp from "fingerpose";
// 3. Setup hook and emoji object
// 4. Update detect function for gesture handling
// 5. Add emoji display to the screen

///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";
// import victory from "./victory.png";
// import thumbs_up from "./thumbs_up.png";
import A from "./Alphabets/A.PNG";
import B from "./Alphabets/B.PNG";
import C from "./Alphabets/C.PNG";
import D from "./Alphabets/D.PNG";
import E from "./Alphabets/E.PNG";
import F from "./Alphabets/A.PNG";
import G from "./Alphabets/G.PNG";
import H from "./Alphabets/H.PNG";
import I from "./Alphabets/I.PNG";
import J from "./Alphabets/J.PNG";
import K from "./Alphabets/K.PNG";
import L from "./Alphabets/L.PNG";
import M from "./Alphabets/M.PNG";
import N from "./Alphabets/N.PNG";
import O from "./Alphabets/O.PNG";
import P from "./Alphabets/P.PNG";
import Q from "./Alphabets/Q.PNG";
import R from "./Alphabets/R.PNG";
import S from "./Alphabets/S.PNG";
import T from "./Alphabets/T.PNG";
import U from "./Alphabets/U.PNG";
import V from "./Alphabets/V.PNG";
import W from "./Alphabets/W.PNG";
import X from "./Alphabets/X.PNG";
import Y from "./Alphabets/Y.PNG";
import Z from "./Alphabets/Z.PNG";

import {aSign} from "./Asign.js";
import {bSign} from "./Bsign.js";
import {cSign} from "./Csign.js";
import {dSign} from "./Dsign.js";
import {eSign} from "./Esign.js";
import {fSign} from "./Fsign.js";
import {gSign} from "./Gsign.js";
import {hSign} from "./Hsign.js";
import {iSign} from "./Isign.js";
import {jSign} from "./Jsign.js";
import {kSign} from "./Ksign.js";
import {lSign} from "./Lsign.js";
import {mSign} from "./Msign.js";
import {nSign} from "./Nsign.js";
import {oSign} from "./Osign.js";
import {pSign} from "./Psign.js";
import {qSign} from "./Qsign.js";
import {rSign} from "./Rsign.js";
import {sSign} from "./Ssign.js";
import {tSign} from "./Tsign.js";
import {uSign} from "./Usign.js";
import {vSign} from "./Vsign.js";
import {wSign} from "./Wsign.js";
import {xSign} from "./Xsign.js";
import {ySign} from "./Ysign.js";
import {zSign} from "./Zsign.js";
///////// NEW STUFF IMPORTS

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  ///////// NEW STUFF ADDED STATE HOOK
  const [emoji, setEmoji] = useState(null);
  const images = { A:A,B:B,C:C,D:D,E:E,F:F,G:G,H:H,I:I,J:J,K:K,
  L:L,M:M,N:N,O:O,P:P,Q:Q,R:R,S:S,T:T,U:U,W:W,V:V,X:X,Y:Y,Z:Z };
  ///////// NEW STUFF ADDED STATE HOOK

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,
          // fp.Gestures.ThumbsUpGesture,
          aSign,bSign,cSign,dSign,eSign,fSign,gSign,hSign,
          iSign,jSign,kSign,lSign,mSign,nSign,oSign,pSign,
          qSign,rSign,sSign,tSign,uSign,vSign,wSign,xSign,
          ySign,zSign
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          // console.log(gesture.gestures[maxConfidence].name);
          setEmoji(gesture.gestures[maxConfidence].name);
          console.log(emoji);
        }
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{runHandpose()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        {/* NEW STUFF */}
        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}

        {/* NEW STUFF */}
      </header>
    </div>
  );
}

export default App;
