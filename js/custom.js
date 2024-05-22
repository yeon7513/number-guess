"use strict";

// 결과
let result = document.querySelector(".result-wrap ol");

// 팝업
let popupWrap = document.querySelector(".pop-wrap");
let clear = document.querySelector(".pop.clear");
let fail = document.querySelector(".pop.fail");

// 클리어 여부
let isClear = false;

// 총 도전 기회
const MAX_COUNT = 10;
let count = 0;

// 각 버튼의 숫자를 클릭하면 가져와서 배열에 담기.
let selectNumber = [];

// 버튼을 클릭하면 그에 해당하는 숫자를 선택 배열에 넣기
document.querySelectorAll(".num-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    let numbers = parseInt(btn.textContent);
    // 중복선택 방지
    if (!selectNumber.includes(numbers)) {
      selectNumber.push(numbers);
      checkAnswer();
    } else {
      alert("이미 선택된 숫자입니다.");
    }
  });
});


// 랜덤 숫자 3개를 만들어 배열에 담기
function mixNumber() {
  let randomNumbers = [];
  let answerNumber = 0;
  for (let i = 0; i <= 2; i++) {
    answerNumber = parseInt(Math.random() * (10 - 1) + 1);
    if (randomNumbers.indexOf(answerNumber) === -1) {
      randomNumbers.push(answerNumber);
    } else {
      i--;
    }
  }

  // console.log(randomNumbers);

  return randomNumbers;
};


// 결과 화면 팝업
function popUp() {
  popupWrap.style.display = "block";

  if (isClear) {
    clear.style.display = "flex";
    fail.style.display = "none";
  } else {
    clear.style.display = "none";
    fail.style.display = "flex";
  }

};


// reset game
function reset() {
  selectNumber = [];
  count = 0;
  result.innerHTML = "";
  clear.style.display = "none";
  fail.style.display = "none";
  popupWrap.style.display = "none";
  randomNumbers = mixNumber();
  isClear = false;
};


// 랜덤 숫자와 클릭한 숫자들의 비교
function checkAnswer() {

  if (selectNumber.length == 3 && count < MAX_COUNT) {
    count++;
    
    let numberList = document.createElement("li");

    // 숫자 비교 & 결과 확인 출력
    for (let i = 0; i < selectNumber.length; i++) {
      let span = document.createElement("span");
      span.textContent = selectNumber[i];
      
      if (selectNumber[i] === randomNumbers[i]) {
        span.classList.add("correct");
      } else if (randomNumbers.includes(selectNumber[i])) {
        span.classList.add("partial");
      } else {
        span.classList.add("incorrect");
      }
      numberList.appendChild(span);
    }
    result.appendChild(numberList);

    // 게임 클리어 팝업  
    let correct = selectNumber.every(function(num, idx) {
      return num === randomNumbers[idx];
    });
    
    if (!correct && count == MAX_COUNT) {
      // 실패
      isClear = false;
      popUp();

      // 정답 공개
      let gameResult = document.querySelector(".pop.fail p");
      gameResult.innerHTML = `답은 ${randomNumbers.join(", ")} 였습니다.`;

    } else if (correct) {
      // 클리어
      isClear = true;
      popUp();
    }

    // 선택한 숫자가 들어가 있는 배열을 초기화
    selectNumber = [];

  }

}

// 렌더링 시 랜덤숫자 뽑기
let randomNumbers = mixNumber();