const createElement =(arr)=>{
    // console.log(arr)
    // [ 'hamim', 'sofik', 'kamal' ]
    const htmlElement = arr.map(el => `<span class="btn">${el}</span>`)
    return(htmlElement.join(" "))
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const displayLessons = (lessons) => {
  // console.log(lessons)
  // 1. get the container and empty it
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2.get into every lesson
  for (let lesson of lessons) {
    // console.log(lesson)
    //3. create a div
    const levelDiv = document.createElement("div");
    levelDiv.innerHTML = `
          <button id="lesson-btn-${lesson.level_no}"
           onclick="loadWords(${lesson.level_no})" href="" 
           class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book"></i>
                Lesson - ${lesson.level_no}
                </button>
        `;
    // 4. append the div to the container
    levelContainer.appendChild(levelDiv);
  }
};

const loadWords = (id) => {
  // console.log(id)
  removeActive();
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn)
      clickBtn.classList.add("active");
      displayLevelWords(json.data);
    });
};
const displayLevelWords = (words) => {
  // console.log(words);
  //1.get the container and empty it
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  //empty words work
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div
        class="text-center col-span-full space-y-5 bg-white shadow-2xl py-10 rounded-lg"
      >
    <img src="./assets/alert-error.png" class="mx-auto" alt="">
        <p class="text-xl font-medium text-gray-400">
    এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h3 class="text-4xl font-bold">নেক্সট Lesson এ যান</h3>
      </div>
    `;
    return;
  }

  for (let word of words) {
    //2. create a div
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
           <div
        class="bg-white p-5 rounded-lg shadow-xl text-center py-10 px-5 space-y-4"
      >
        <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium bangla-font">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"</div>
        <div class="flex items-center justify-between">
          <button 
            onclick="loadWordDetails(${word.id})"
             class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
        `;
    //3. append the div to the container
    wordContainer.appendChild(wordDiv);
  }
};
const removeActive = () => {
  const lessonsButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonsButtons);
  lessonsButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadWordDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url)
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordDetails(data.data));
};

const displayWordDetails = (word) => {
  // console.log(word)
  const detailsBox = document.getElementById("details-container");
  // console.log(detailsBox)
  // detailsBox.innerHTML="hello i am form js";
  detailsBox.innerHTML = `
  <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word}( <i class="fa-regular fa-microphone"></i> :${word.pronunciation})
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
          <div>
          ${createElement(word.synonyms)}
          </div>
          </div>
  `;
  document.getElementById("word_model").showModal();
};
loadLessons();
