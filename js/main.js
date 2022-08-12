(() => {

  let yOffset = 0; // = window.pageYOffset
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene이 시작된 순간 true

  const sceneInfo = [
    {
      // 0
      type: 'sticky', // sticky로 동작하는 기능 이 있는 구간
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0, 
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d')
      },
      values: {
        messageA_opacity: [0, 1]
      }
    },
    {
      // 1
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0, 
      objs: {
        container: document.querySelector('#scroll-section-1')
      }
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0, 
      objs: {
        container: document.querySelector('#scroll-section-2')
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0, 
      objs: {
        container: document.querySelector('#scroll-section-3')
      }
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      console.log(window.innerHeight);
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px` // ${내부에는 변수 사용 가능}
    }
    // console.log(sceneInfo);

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset ) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id',`show-scene-${currentScene}`);
  }
  
  // opacity의 시작값 끝값, 현재 구간 내에서 얼마나 스크롤 됐는지
  function calcValues(values, currentYOffset) {
    // 현재 구간에서 스크롤된 범위를 비율로 구하기
    let rv;
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    console.log(currentScene);

    switch (currentScene) {
      case 0:
        // console.log('0 play');
        let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset);
        objs.messageA.style.opacity = messageA_opacity_in;
        console.log(messageA_opacity_in);
        break;

      case 1:
        // console.log('1 play');
        break;
        
      case 2:
        // console.log('2 play');
        break;

      case 3:
        // console.log('3 play');
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    // console.log(prevScrollHeight);

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true; // 새 구간으로 바뀔 때 위치가 마이너스로 뜨는 것을 방지
      currentScene++;
      document.body.setAttribute('id',`show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0 ) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      currentScene--;
      document.body.setAttribute('id',`show-scene-${currentScene}`);
    }

    if (enterNewScene) return;
    // currentScene에 맞춰서 id 세팅
    // document.body.setAttribute('id', `show-scene-${currentScene}`);
    // console.log(currentScene);

    playAnimation();

  }
  
  window.addEventListener('resize', setLayout);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  // window.addEventListener('DOMContentLoaded', setLayout);
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
  setLayout();

})();