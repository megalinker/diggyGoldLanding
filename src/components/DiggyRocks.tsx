import React, { useEffect, useRef, useState } from 'react';
import Piedra1 from '/assets/Piedra7.webp';
import Piedra2 from '/assets/Piedra2.webp';
import Piedra3 from '/assets/Piedra7.webp';
import Piedra4 from '/assets/Piedra2.webp';
import Piedra5 from '/assets/Piedra7.webp';
import Piedra6 from '/assets/Piedra2.webp';
import Piedra7 from '/assets/Piedra7.webp';
import Piedra8 from '/assets/Piedra2.webp';

import Monedas1 from '/assets/Monedas.webp';
import Monedas2 from '/assets/Monedas2.webp';

import DiggyCoin1 from './DiggyCoin/DiggyCoin.tsx';
import DiggyCoin2 from './DiggyCoin/DiggyCoin.tsx';
import DiggyCoin3 from './DiggyCoin/DiggyCoin.tsx';
import DiggyCoin4 from './DiggyCoin/DiggyCoin.tsx';

import DiggyCoin5 from './DiggyCoin/DiggyCoin.tsx';

import DiggyCoin6 from './DiggyCoin/DiggyCoin.tsx';
import DiggyCoin7 from './DiggyCoin/DiggyCoin.tsx';

import DiggyG from './DiggyG.tsx';

import MiddleMessage from './MiddleMessage/MiddleMessage.tsx';

import LeftCoins from '/assets/leftCoins.webp';
import RightCoins from '/assets/rightCoins.webp';

import LeftCart from '/assets/leftCart.webp';
import RightCart from '/assets/rightCart.webp';

import { useMediaQuery } from 'react-responsive';

interface DiggyRocksProps {
  iframeVisible: boolean;
  setIframeVisible: (visible: boolean) => void;
  setDiggycoinAmount: (amount: string) => void
  setIsModal2Open: (open: boolean) => void;
  hasClaimed: string;
  setHasClaimed: (amount: string) => void
  setPrincipal: (amount: string) => void
}

const DiggyRocks: React.FC<DiggyRocksProps> = ({ iframeVisible, setIframeVisible, setDiggycoinAmount, setIsModal2Open, hasClaimed, setHasClaimed, setPrincipal }) => {

  const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });

  const [isLoading, setIsLoading] = useState(false);

  const [cycle, setCycle] = useState(1);


  useEffect(() => {
    const timer = setTimeout(() => {
      setCycle(2);
    }, 14000);
    return () => clearTimeout(timer);
  }, []);

  const monedas1PositionX = isSmallScreen ? 570 : 260;
  const monedas2PositionX = isSmallScreen ? 833 : 1293;

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(350px); }
          to { transform: translateY(0); }
        }

       /* FIRST CYCLE (14s) */
  @keyframes monedasAnimationFirst {
    0%, 17.86% { transform: translateY(500px); }
    21.43% { transform: translateY(0); }
    35.71% { transform: translateY(0); }
    39.29%, 100% { transform: translateY(500px); }
  }

  @keyframes diggyGAnimationFirst {
    0%, 39.29% { transform: translateY(450px); }
    42.86% { transform: translateY(0); }
    57.14% { transform: translateY(0); }
    60.71%, 100% { transform: translateY(450px); }
  }

  @keyframes diggyCoin2AnimationFirst {
    0%, 60.71% { transform: translateY(400px); }
    64.29% { transform: translateY(0); }
    83.93% { transform: translateY(0); }
    87.5%, 100% { transform: translateY(400px); }
  }

  @keyframes diggyCoin4AnimationFirst {
    0%, 62.5% { transform: translateY(400px); }
    66.07% { transform: translateY(0); }
    85.71% { transform: translateY(0); }
    89.29%, 100% { transform: translateY(400px); }
  }

  @keyframes diggyCoin1AnimationFirst {
    0%, 64.29% { transform: translateY(400px); }
    67.86% { transform: translateY(0); }
    87.5% { transform: translateY(0); }
    91.07%, 100% { transform: translateY(400px); }
  }

  @keyframes diggyCoin3AnimationFirst {
    0%, 66.07% { transform: translateY(400px); }
    69.64% { transform: translateY(0); }
    89.29% { transform: translateY(0); }
    92.86%, 100% { transform: translateY(400px); }
  }

  @keyframes diggyCoinMainAnimationFirst {
    0%, 66.07% { transform: translateY(600px); }
    69.64% { transform: translateY(0); }
    89.29% { transform: translateY(0); }
    92.86%, 100% { transform: translateY(600px); }
  }
    @keyframes diggyCoinMainLeftAnimationFirst {
    0%, 66.07% { transform: translateY(-10px) translateX(425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
    69.64% { transform: translateY(0) translateX(0) rotateX(-22deg) rotateY(33deg); opacity: 1;}
    89.29% { transform: translateY(0) translateX(0) rotateX(-22deg) rotateY(33deg); opacity: 1;}
    92.86%, 100% { transform: translateY(-10px) translateX(425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
  }

  @keyframes diggyCoinMainRightAnimationFirst {
    0%, 66.07% { transform: translateY(10px) translateX(-425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
    69.64% { transform: translateY(0) translateX(0) rotateX(22deg) rotateY(33deg); opacity: 1; }
    89.29% { transform: translateY(0) translateX(0) rotateX(22deg) rotateY(33deg); opacity: 1;}
    92.86%, 100% { transform: translateY(10px) translateX(-425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
  }

  /* SUBSEQUENT CYCLES (11s) */

  @keyframes monedasCycle {
    0% { transform: translateY(500px); }
    4.55% { transform: translateY(0); }
    22.73% { transform: translateY(0); }
    27.27% { transform: translateY(500px); }
    100% { transform: translateY(500px); }
  }

  @keyframes diggyGCycle {
    0%, 27.27% { transform: translateY(450px); }
    31.82% { transform: translateY(0); }
    50% { transform: translateY(0); }
    54.55% { transform: translateY(450px); }
    100% { transform: translateY(450px); }
  }

  @keyframes diggyCoin2Cycle {
    0%, 54.55% { transform: translateY(400px); }
    59.09% { transform: translateY(0); }
    84.09% { transform: translateY(0); }
    88.64% { transform: translateY(400px); }
    100% { transform: translateY(400px); }
  }

  @keyframes diggyCoin4Cycle {
    0%, 56.82% { transform: translateY(400px); }
    61.36% { transform: translateY(0); }
    86.36% { transform: translateY(0); }
    90.91% { transform: translateY(400px); }
    100% { transform: translateY(400px); }
  }

  @keyframes diggyCoin1Cycle {
    0%, 59.09% { transform: translateY(400px); }
    63.64% { transform: translateY(0); }
    88.64% { transform: translateY(0); }
    93.18% { transform: translateY(400px); }
    100% { transform: translateY(400px); }
  }

  @keyframes diggyCoin3Cycle {
    0%, 61.36% { transform: translateY(400px); }
    65.91% { transform: translateY(0); }
    90.91% { transform: translateY(0); }
    95.45% { transform: translateY(400px); }
    100% { transform: translateY(400px); }
  }

    @keyframes diggyCoinMainCycle {
    0%, 61.36% { transform: translateY(600px); }
    65.91% { transform: translateY(0); }
    90.91% { transform: translateY(0); }
    95.45% { transform: translateY(600px); }
    100% { transform: translateY(600px); }
  }

   @keyframes diggyCoinMainLeftCycle {
    0%, 61.36% { transform: translateY(-10px) translateX(425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
    65.91% { transform: translateY(0) translateX(0) rotateX(-22deg) rotateY(33deg); opacity: 1;}
    90.91% { transform: translateY(0) translateX(0) rotateX(-22deg) rotateY(33deg); opacity: 1;}
    95.45% { transform: translateY(-10px) translateX(425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
    100% { transform: translateY(-10px) translateX(425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
  }

   @keyframes diggyCoinMainRightCycle {
    0%, 61.36% { transform: translateY(10px) translateX(-425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
    65.91% { transform: translateY(0) translateX(0) rotateX(22deg) rotateY(33deg);  opacity: 1;}
    90.91% { transform: translateY(0) translateX(0) rotateX(22deg) rotateY(33deg); opacity: 1; }
    95.45% { transform: translateY(10px) translateX(-425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
    100% { transform: translateY(10px) translateX(-425px) rotateX(0deg) rotateY(0deg); opacity: 0;}
  }

          @keyframes leftCoinsAnimationCycle0 {
0%, 14.29% {
            transform: translateX(400px);
            opacity: 0;
          }
          21.43%, 35.71% {
            transform: translateX(0);
            opacity: 1;
          }
          42.86%, 100% {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        @keyframes rightCoinsAnimationCycle0 {
     0%, 14.29% {
            transform: translateX(-400px);
            opacity: 0;
          }
          21.43%, 35.71% {
            transform: translateX(0);
            opacity: 1;
          }
          42.86%, 100% {
            transform: translateX(-400px);
            opacity: 0;
          }
        }

        @keyframes leftCoinsAnimationCycle1 {
     0% {
            transform: translateX(400px);
            opacity: 0;
          }
          9.09%, 18.18%{
              transform: translateX(0);
            opacity: 1;
          }  
          27.27%, 100% {
            transform: translateX(400px);
            opacity: 0;
          }
        }
        

        @keyframes rightCoinsAnimationCycle1 {
          0% {
            transform: translateX(-400px);
            opacity: 0;
          }
             9.09%, 18.18%{
            transform: translateX(0);
            opacity: 1;
          }
          27.27%, 100% {
            transform: translateX(-400px);
            opacity: 0;
          }
}
                    @keyframes leftCartAnimationCycle0 {
0%, 39.3% {
            transform: translateX(475px);
            opacity: 0;
          }
          46.42%, 57.15% {
            transform: translateX(0);
            opacity: 1;
          }
          64.28%, 100% {
            transform: translateX(475px);
            opacity: 0;
          }
        }

        @keyframes rightCartAnimationCycle0 {
     0%, 39.3% {
            transform: translateX(-475px);
            opacity: 0;
          }
          46.42%, 57.15% {
            transform: translateX(0);
            opacity: 1;
          }
          64.28%, 100% {
            transform: translateX(-475px);
            opacity: 0;
          }
        }

        @keyframes leftCartAnimationCycle1 {
     0%, 27.27% {
            transform: translateX(475px);
            opacity: 0;
          }
          36.36%, 54.55%{
              transform: translateX(0);
            opacity: 1;
          }  
          63.64%, 100% {
            transform: translateX(475px);
            opacity: 0;
          }
        }

        @keyframes rightCartAnimationCycle1 {
          0%, 27.27% {
            transform: translateX(-475px);
            opacity: 0;
          }
             36.36%, 54.55%{
            transform: translateX(0);
            opacity: 1;
          }
          63.64%, 100% {
            transform: translateX(-475px);
            opacity: 0;
          }
        }

         @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`}</style>
      {isLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
          <div style={{ border: '15px solid #f3f3f3', borderTop: '15px solid #e99546', borderRadius: '50%', width: '100px', height: '100px', animation: 'spin 2s linear infinite' }}></div>
        </div>
      )}
      <svg
        id="DiggyLayer"
        data-name="Diggy Layer"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      >
        {!isSmallScreen && (
          <>
            <image href={LeftCoins} x="450" y="333" width="250" height="250" style={{ pointerEvents: 'none', animation: cycle === 1 ? 'leftCoinsAnimationCycle0 14s infinite' : 'leftCoinsAnimationCycle1 11s infinite' }} />
            <image href={RightCoins} x="1220" y="333" width="250" height="250" style={{ pointerEvents: 'none', animation: cycle === 1 ? 'rightCoinsAnimationCycle0 14s infinite' : 'rightCoinsAnimationCycle1 11s infinite' }} />

            <foreignObject x="430" y="340" width="80" height="80" style={{ overflow: 'visible' }}>
              <div style={{ transformStyle: 'preserve-3d', animation: cycle === 1 ? 'diggyCoinMainLeftAnimationFirst 14s infinite' : 'diggyCoinMainLeftCycle 11s infinite' }}>
                <DiggyCoin7 size="200px" />
              </div>
            </foreignObject>
            <foreignObject x="1290" y="320" width="80" height="80" style={{ overflow: 'visible' }}>
              <div style={{ transformStyle: 'preserve-3d', animation: cycle === 1 ? 'diggyCoinMainRightAnimationFirst 14s infinite' : 'diggyCoinMainRightCycle 11s infinite' }}>
                <DiggyCoin6 size="200px" />
              </div>
            </foreignObject>

            <image href={LeftCart} x="375" y="333" width="250" height="250" style={{ pointerEvents: 'none', animation: cycle === 1 ? 'leftCartAnimationCycle0 14s infinite' : 'leftCartAnimationCycle1 11s infinite' }} />
            <image href={RightCart} x="1295" y="305" width="250" height="250" style={{ pointerEvents: 'none', animation: cycle === 1 ? 'rightCartAnimationCycle0 14s infinite' : 'rightCartAnimationCycle1 11s infinite' }} />

          </>

        )}

        {isSmallScreen && (
          <>
            <foreignObject x="830" y="550" width="80" height="80" style={{ overflow: 'visible' }}>
              <div style={{ animation: cycle === 1 ? 'diggyCoinMainAnimationFirst 14s infinite' : 'diggyCoinMainCycle 11s infinite', }}>
                <DiggyCoin5 size="250px" />
              </div>
            </foreignObject>
          </>
        )}

        <image href={Monedas2} x={monedas2PositionX} y="515" width="567" height="567" style={{ pointerEvents: 'none', animation: cycle === 1 ? 'monedasAnimationFirst 14s infinite' : 'monedasCycle 11s infinite', }} />
        <image href={Monedas1} x={monedas1PositionX} y="610" width="400" height="400" style={{ pointerEvents: 'none', animation: cycle === 1 ? 'monedasAnimationFirst 14s infinite' : 'monedasCycle 11s infinite', }} />

        <foreignObject x="1400" y="870" width="80" height="80" style={{ overflow: 'visible' }}>
          <div style={{ transform: 'translateY(300px)', animation: cycle === 1 ? 'diggyCoin4AnimationFirst 14s infinite' : 'diggyCoin4Cycle 11s infinite', }}>
            <DiggyCoin4 size="80px" />
          </div>
        </foreignObject>
        <foreignObject x="1050" y="810" width="133" height="133" style={{ overflow: 'visible' }}>
          <div style={{ transform: 'translateY(300px)', animation: cycle === 1 ? 'diggyCoin3AnimationFirst 14s infinite' : 'diggyCoin3Cycle 11s infinite', }}>
            <DiggyCoin3 size="133px" />
          </div>
        </foreignObject>

        <foreignObject x="800" y="610" width="350" height="350" style={{ overflow: 'visible', pointerEvents: 'none' }}>
          <div style={{ transform: 'translateY(300px)', animation: cycle === 1 ? 'diggyGAnimationFirst 14s infinite' : 'diggyGCycle 11s infinite', }}>
            <DiggyG />
          </div>
        </foreignObject>

        <foreignObject x="680" y="800" width="115" height="115" style={{ overflow: 'visible' }}>
          <div style={{ transform: 'translateY(300px)', animation: cycle === 1 ? 'diggyCoin2AnimationFirst 14s infinite' : 'diggyCoin2Cycle 11s infinite', }}>
            <DiggyCoin2 size="115px" />
          </div>
        </foreignObject>
        <foreignObject x="440" y="830" width="100" height="100" style={{ overflow: 'visible' }}>
          <div style={{ transform: 'translateY(300px)', animation: cycle === 1 ? 'diggyCoin1AnimationFirst 14s infinite' : 'diggyCoin1Cycle 11s infinite', }}>
            <DiggyCoin1 size="100px" />
          </div>
        </foreignObject>

        <g transform="translate(1990,845) scale(-1,1)">
          <image href={Piedra8} x="0" y="0" width="367" height="367" style={{ pointerEvents: 'none', animation: 'slideUp 0.5s ease both', animationDelay: '1.5s' }} />
        </g>
        <image href={Piedra7} x="1370" y="797" width="420" height="420" style={{ pointerEvents: 'none', animation: 'slideUp 0.5s ease both', animationDelay: '0.5s' }} />
        <g transform="translate(1515,755) scale(-1,1)">
          <image href={Piedra6} x="0" y="0" width="500" height="425" style={{ pointerEvents: 'none', animation: 'slideUp 0.5s ease both', animationDelay: '1.25s' }} />
        </g>
        <g transform="translate(1195,795) scale(-1,1)">
          <image href={Piedra5} x="0" y="0" width="425" height="425" style={{ pointerEvents: 'none', animation: 'slideUp 0.5s ease both', animationDelay: '0.25s' }} />
        </g>
        <image href={Piedra4} x="678" y="848" width="275" height="350" style={{ pointerEvents: 'none', animation: 'slideUp 0.5s ease both', animationDelay: '0.75s' }} />
        <image href={Piedra3} x="398" y="793" width="425" height="425" style={{ pointerEvents: 'none', animation: 'slideUp 0.5s ease both', animationDelay: '1.75s' }} />
        <image href={Piedra1} x="-125" y="790" width="375" height="375" style={{ pointerEvents: 'none', animation: 'slideUp 0.5s ease both', animationDelay: '1s' }} />
        <image href={Piedra2} x="132" y="750" width="425" height="425" style={{ pointerEvents: 'none', animation: 'slideUp 0.5s ease both', animationDelay: '0s' }} />

        <foreignObject
          x="710"
          y="390"
          width="800"
          height="100"
          transform="translate(-150, -50)"
          style={{ overflow: 'visible' }}
        >
          <div>
            <MiddleMessage iframeVisible={iframeVisible} setIframeVisible={setIframeVisible} setIsLoading={setIsLoading} setDiggycoinAmount={setDiggycoinAmount} setIsModal2Open={setIsModal2Open} hasClaimed={hasClaimed} setHasClaimed={setHasClaimed} setPrincipal={setPrincipal} />
          </div>
        </foreignObject>
      </svg>
    </>
  );
};

export default DiggyRocks;