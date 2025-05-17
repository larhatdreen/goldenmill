const path = document.location.pathname

const getDocumentElement = (id: string) => {
  if (typeof document === 'undefined') return null;
  return document.getElementById(id);
}

const getDocumentElements = (className: string) => {
  if (typeof document === 'undefined') return null;
  return document.getElementsByClassName(className);
}

const getDocumentQuerySelector = (selector: string) => {
  if (typeof document === 'undefined') return null;
  return document.querySelector(selector);
}

const getWindowScroll = () => {
  if (typeof window === 'undefined') return;
  window.scrollTo(0, 0);
}

export function onPointerEnterCircle(circleId: string) {
  const elements = document.getElementsByClassName(circleId) as HTMLCollectionOf<HTMLElement>
  const circle = document.getElementById(circleId) as HTMLElement
  const textElement = document.getElementById(`${circleId}text`) as HTMLElement

  for (let i = 0; i < elements.length; i++) {
    const childElement = elements[i] as HTMLElement
    if (childElement) {
      // if (childElement.style.fill) {
      //     childElement.style.fill = "white";
      // } else {
      //     childElement.style.stroke = "white";
      // }
      childElement.style.fill = 'white'
      childElement.style.stroke = 'white'
    }
  }
  circle.style.width = '70px'
  circle.style.height = '70px'
  circle.style.backgroundColor = '#544B3C'
  circle.style.color = 'white'

  if (circleId === 'circle3' && path === '/shell') {
    textElement.style.fill = 'white'
    textElement.style.color = 'white'
  } else {
    textElement.style.fill = 'white'
    textElement.style.color = 'white'
  }
}

export function onPointerLeaveCircle(circleId: string) {
  const elements = document.getElementsByClassName(circleId) as HTMLCollectionOf<HTMLElement>
  const circle = document.getElementById(circleId) as HTMLElement
  const textElement = document.getElementById(`${circleId}text`) as HTMLElement

  for (let i = 0; i < elements.length; i++) {
    const childElement = elements[i] as HTMLElement

    if (childElement) {
      // if (childElement.style.fill) {
      //     childElement.style.fill = "#605C53";
      // } else {
      //     childElement.style.stroke = "#605C53";
      // }
      if (circleId === 'circle3' && path === '/shell') {
        childElement.style.fill = 'black'
        childElement.style.stroke = 'black'
      } else {
        childElement.style.fill = '#605C53'
        childElement.style.stroke = '#605C53'
      }
    }
  }
  circle.style.width = '54px'
  circle.style.height = '54px'
  circle.style.backgroundColor = '#292929'
  circle.style.color = '#767676'

  if (circleId === 'circle3' && path === '/shell') {
    textElement.style.fill = 'black'
    textElement.style.color = 'black'
  } else {
    textElement.style.fill = '#605C53'
    textElement.style.color = '#605C53'
  }
}

export function onInputFocus(inputId: string) {
  const input = document.getElementById(inputId) as HTMLElement
  if (input) {
    input.focus()
  }
}

window.onbeforeunload = function () {
  getWindowScroll()
}

// window.addEventListener('load', function () {
//     const section1 = document.getElementById('section1') as HTMLElement;
//     const section1stroke = document.getElementsByClassName('section1stroke') as HTMLCollectionOf<HTMLElement>;
//     const section1fill = document.getElementsByClassName('section1fill') as HTMLCollectionOf<HTMLElement>;
//
//     const section2 = document.getElementById('section2') as HTMLElement;
//     const section2stroke = document.getElementsByClassName('section2stroke') as HTMLCollectionOf<HTMLElement>;
//     const section2fill = document.getElementsByClassName('section2fill') as HTMLCollectionOf<HTMLElement>;
//     const section2stroke_width = document.getElementsByClassName('section2stroke-width') as HTMLCollectionOf<HTMLElement>;
//
//     const section3 = document.getElementById('section3') as HTMLElement;
//     const section3stroke = document.getElementsByClassName('section3stroke') as HTMLCollectionOf<HTMLElement>;
//     const section3fill = document.getElementsByClassName('section3fill') as HTMLCollectionOf<HTMLElement>;
//
//
//     const startAnimationTrigger1 = section1.getBoundingClientRect().top - window.innerHeight;
//     const endAnimationTrigger1 = section1.getBoundingClientRect().top + section1.getBoundingClientRect().height;
//     const maxAnimationTrigger1 = (startAnimationTrigger1 + endAnimationTrigger1) / 2
//
//     const startAnimationTrigger2 = section2.getBoundingClientRect().top - window.innerHeight;
//     const endAnimationTrigger2 = section2.getBoundingClientRect().top + section2.getBoundingClientRect().height;
//     const maxAnimationTrigger2 = (startAnimationTrigger2 + endAnimationTrigger2) / 2;
//
//     const startAnimationTrigger3 = section3.getBoundingClientRect().top - window.innerHeight;
//     const endAnimationTrigger3 = section3.getBoundingClientRect().top + section3.getBoundingClientRect().height;
//     const maxAnimationTrigger3 = (startAnimationTrigger3 + endAnimationTrigger3) / 2;
//
//
//     const startColor = '#544B3C';
//     const finishColor = '#ffa749';
//
//     const startStrokeWidth = 2;
//     const finishStrokeWidth = 8;
//
//     window.addEventListener('scroll', () => {
// //Section1
//         for (let i = 0; i < section1stroke.length; i++) {
//             if (scrollY <= startAnimationTrigger1 || scrollY >= endAnimationTrigger1) {
//                 section1stroke[i].style.stroke = startColor;
//             } else if (scrollY <= maxAnimationTrigger1) {
//                 const interpolation: number = (scrollY - startAnimationTrigger1) / (maxAnimationTrigger1 - startAnimationTrigger1);
//                 section1stroke[i].style.stroke = interpolateColor(startColor, finishColor, interpolation);
//             } else if (scrollY <= endAnimationTrigger1) {
//                 const interpolation: number = (scrollY - maxAnimationTrigger1) / (endAnimationTrigger1 - maxAnimationTrigger1);
//                 section1stroke[i].style.stroke = interpolateColor(finishColor, startColor, interpolation);
//             }
//         }
//         for (let i = 0; i < section1fill.length; i++) {
//             if (scrollY <= startAnimationTrigger1 || scrollY >= endAnimationTrigger1) {
//                 section1fill[i].style.fill = startColor;
//             } else if (scrollY <= maxAnimationTrigger1) {
//                 const interpolation: number = (scrollY - startAnimationTrigger1) / (maxAnimationTrigger1 - startAnimationTrigger1);
//                 section1fill[i].style.fill = interpolateColor(startColor, finishColor, interpolation);
//             } else if (scrollY <= endAnimationTrigger1) {
//                 const interpolation: number = (scrollY - maxAnimationTrigger1) / (endAnimationTrigger1 - maxAnimationTrigger1);
//                 section1fill[i].style.fill = interpolateColor(finishColor, startColor, interpolation);
//             }
//         }
// //Section2
//         for (let i = 0; i < section2stroke.length; i++) {
//             if (scrollY <= startAnimationTrigger2 || scrollY >= endAnimationTrigger2) {
//                 section2stroke[i].style.stroke = startColor;
//             } else if (scrollY <= maxAnimationTrigger2) {
//                 const interpolation: number = (scrollY - startAnimationTrigger2) / (maxAnimationTrigger2 - startAnimationTrigger2);
//                 section2stroke[i].style.stroke = interpolateColor(startColor, finishColor, interpolation);
//             } else if (scrollY <= endAnimationTrigger2) {
//                 const interpolation: number = (scrollY - maxAnimationTrigger2) / (endAnimationTrigger2 - maxAnimationTrigger2);
//                 section2stroke[i].style.stroke = interpolateColor(finishColor, startColor, interpolation);
//             }
//         }
//         for (let i = 0; i < section2fill.length; i++) {
//             if (scrollY <= startAnimationTrigger2 || scrollY >= endAnimationTrigger2) {
//                 section2fill[i].style.fill = startColor;
//             } else if (scrollY <= maxAnimationTrigger2) {
//                 const interpolation: number = (scrollY - startAnimationTrigger2) / (maxAnimationTrigger2 - startAnimationTrigger2);
//                 section2fill[i].style.fill = interpolateColor(startColor, finishColor, interpolation);
//             } else if (scrollY <= endAnimationTrigger2) {
//                 const interpolation: number = (scrollY - maxAnimationTrigger2) / (endAnimationTrigger2 - maxAnimationTrigger2);
//                 section2fill[i].style.fill = interpolateColor(finishColor, startColor, interpolation);
//             }
//         }
//         for (let i = 0; i < section2stroke_width.length; i++) {
//             if (scrollY <= startAnimationTrigger2 || scrollY >= endAnimationTrigger2) {
//                 section2stroke_width[i].style.strokeWidth = startStrokeWidth.toString();
//             } else if (scrollY <= maxAnimationTrigger2) {
//                 const interpolation: number = (scrollY - startAnimationTrigger2) / (maxAnimationTrigger2 - startAnimationTrigger2);
//                 const strokeWidth: number = Math.round(startStrokeWidth + (finishStrokeWidth - startStrokeWidth) * interpolation);
//                 section2stroke_width[i].style.strokeWidth = strokeWidth.toString();
//             } else if (scrollY <= endAnimationTrigger2) {
//                 const interpolation: number = (scrollY - maxAnimationTrigger2) / (endAnimationTrigger2 - maxAnimationTrigger2);
//                 const strokeWidth: number = Math.round(finishStrokeWidth + (startStrokeWidth - finishStrokeWidth) * interpolation);
//                 section2stroke_width[i].style.strokeWidth = strokeWidth.toString();
//             }
//         }
// //Section3
//         for (let i = 0; i < section3stroke.length; i++) {
//             if (scrollY <= startAnimationTrigger3 || scrollY >= endAnimationTrigger3) {
//                 section3stroke[i].style.stroke = startColor;
//             } else if (scrollY <= maxAnimationTrigger3) {
//                 const interpolation: number = (scrollY - startAnimationTrigger3) / (maxAnimationTrigger3 - startAnimationTrigger3);
//                 section3stroke[i].style.stroke = interpolateColor(startColor, finishColor, interpolation);
//             } else if (scrollY <= endAnimationTrigger3) {
//                 const interpolation: number = (scrollY - maxAnimationTrigger3) / (endAnimationTrigger3 - maxAnimationTrigger3);
//                 section3stroke[i].style.stroke = interpolateColor(finishColor, startColor, interpolation);
//             }
//         }
//         for (let i = 0; i < section3fill.length; i++) {
//             if (scrollY <= startAnimationTrigger3 || scrollY >= endAnimationTrigger3) {
//                 section3fill[i].style.fill = startColor;
//             } else if (scrollY <= maxAnimationTrigger3) {
//                 const interpolation: number = (scrollY - startAnimationTrigger3) / (maxAnimationTrigger3 - startAnimationTrigger3);
//                 section3fill[i].style.fill = interpolateColor(startColor, finishColor, interpolation);
//             } else if (scrollY <= endAnimationTrigger3) {
//                 const interpolation: number = (scrollY - maxAnimationTrigger3) / (endAnimationTrigger3 - maxAnimationTrigger3);
//                 section3fill[i].style.fill = interpolateColor(finishColor, startColor, interpolation);
//             }
//         }
//     })
// })
//
// function interpolateColor(color1: string, color2: string, ratio: number): string {
//     const hex = (c: number): string => {
//         const hex: string = c.toString(16);
//         return hex.length === 1 ? '0' + hex : hex;
//     };
//
//     const r1: number = parseInt(color1.substring(1, 3), 16);
//     const g1: number = parseInt(color1.substring(3, 5), 16);
//     const b1: number = parseInt(color1.substring(5, 7), 16);
//
//     const r2: number = parseInt(color2.substring(1, 3), 16);
//     const g2: number = parseInt(color2.substring(3, 5), 16);
//     const b2: number = parseInt(color2.substring(5, 7), 16);
//
//     const r: number = Math.round(r1 + (r2 - r1) * ratio);
//     const g: number = Math.round(g1 + (g2 - g1) * ratio);
//     const b: number = Math.round(b1 + (b2 - b1) * ratio);
//
//     return `#${hex(r)}${hex(g)}${hex(b)}`;
// }
//
// const observeUrlChange = () => {
//     let oldHref = document.location.href;
//     const body = document.querySelector("body") as Node;
//     const observer = new MutationObserver(() => {
//         if (oldHref !== document.location.href) {
//             oldHref = document.location.href;
//
//             const startColor = '#544B3C';
//             const finishColor = '#ffa749';
//
//             const section1stroke01rect = document.querySelector('.section1stroke01rect') as HTMLElement;
//             const section1stroke01 = document.getElementsByClassName('section1stroke01') as HTMLCollectionOf<HTMLElement>;
//             const section1stroke02rect = document.querySelector('.section1stroke02rect') as HTMLElement;
//             const section1stroke02 = document.getElementsByClassName('section1stroke02') as HTMLCollectionOf<HTMLElement>;
//             const section1stroke03rect = document.querySelector('.section1stroke03rect') as HTMLElement;
//             const section1stroke03 = document.getElementsByClassName('section1stroke03') as HTMLCollectionOf<HTMLElement>;
//             const section1stroke04rect = document.querySelector('.section1stroke04rect') as HTMLElement;
//             const section1stroke04 = document.getElementsByClassName('section1stroke04') as HTMLCollectionOf<HTMLElement>;
//             const section1stroke05rect = document.querySelector('.section1stroke05rect') as HTMLElement;
//             const section1stroke05 = document.getElementsByClassName('section1stroke05') as HTMLCollectionOf<HTMLElement>;
//             const section1stroke06rect = document.querySelector('.section1stroke06rect') as HTMLElement;
//             const section1stroke06 = document.getElementsByClassName('section1stroke06') as HTMLCollectionOf<HTMLElement>;
//
//             if (section1stroke01rect) {
//                 section1stroke01rect.addEventListener('mouseover', () => {
//                     section1stroke01rect.style.stroke = finishColor;
//                     for (let i = 0; i < section1stroke01.length; i++) {
//                         section1stroke01[i].style.stroke = finishColor;
//                     }
//                 })
//                 section1stroke01rect.addEventListener('mouseleave', () => {
//                     section1stroke01rect.style.stroke = startColor;
//                     for (let i = 0; i < section1stroke01.length; i++) {
//                         section1stroke01[i].style.stroke = startColor;
//                     }
//                 })
// //02
//                 section1stroke02rect.addEventListener('mouseover', () => {
//                     section1stroke02rect.style.stroke = finishColor;
//                     for (let i = 0; i < section1stroke02.length; i++) {
//                         section1stroke02[i].style.stroke = finishColor;
//                     }
//                 })
//                 section1stroke02rect.addEventListener('mouseleave', () => {
//                     section1stroke02rect.style.stroke = startColor;
//                     for (let i = 0; i < section1stroke02.length; i++) {
//                         section1stroke02[i].style.stroke = startColor;
//                     }
//                 })
// //03
//                 section1stroke03rect.addEventListener('mouseover', () => {
//                     section1stroke03rect.style.stroke = finishColor;
//                     for (let i = 0; i < section1stroke03.length; i++) {
//                         section1stroke03[i].style.stroke = finishColor;
//                     }
//                 })
//                 section1stroke03rect.addEventListener('mouseleave', () => {
//                     section1stroke03rect.style.stroke = startColor;
//                     for (let i = 0; i < section1stroke03.length; i++) {
//                         section1stroke03[i].style.stroke = startColor;
//                     }
//                 })
// //04
//                 section1stroke04rect.addEventListener('mouseover', () => {
//                     section1stroke04rect.style.stroke = finishColor;
//                     for (let i = 0; i < section1stroke04.length; i++) {
//                         section1stroke04[i].style.stroke = finishColor;
//                     }
//                 })
//                 section1stroke04rect.addEventListener('mouseleave', () => {
//                     section1stroke04rect.style.stroke = startColor;
//                     for (let i = 0; i < section1stroke04.length; i++) {
//                         section1stroke04[i].style.stroke = startColor;
//                     }
//                 })
// //05
//                 section1stroke05rect.addEventListener('mouseover', () => {
//                     section1stroke05rect.style.stroke = finishColor;
//                     for (let i = 0; i < section1stroke05.length; i++) {
//                         section1stroke05[i].style.stroke = finishColor;
//                     }
//                 })
//                 section1stroke05rect.addEventListener('mouseleave', () => {
//                     section1stroke05rect.style.stroke = startColor;
//                     for (let i = 0; i < section1stroke05.length; i++) {
//                         section1stroke05[i].style.stroke = startColor;
//                     }
//                 })
// //06
//                 section1stroke06rect.addEventListener('mouseover', () => {
//                     section1stroke06rect.style.stroke = finishColor;
//                     for (let i = 0; i < section1stroke06.length; i++) {
//                         section1stroke06[i].style.stroke = finishColor;
//                     }
//                 })
//                 section1stroke06rect.addEventListener('mouseleave', () => {
//                     section1stroke06rect.style.stroke = startColor;
//                     for (let i = 0; i < section1stroke06.length; i++) {
//                         section1stroke06[i].style.stroke = startColor;
//                     }
//                 })
//             }
//         }
//     });
//     observer.observe(body, { childList: true, subtree: true });
// };
//
// window.onload = observeUrlChange;

export const handleScroll = () => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  
  const elements = getDocumentElements(circleId) as HTMLCollectionOf<HTMLElement>;
  const circle = getDocumentElement(circleId) as HTMLElement;
  const textElement = getDocumentElement(`${circleId}text`) as HTMLElement;
  
  // ... rest of the code ...
};
