const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const displayLessons = (lessons) =>{
    // console.log(lessons)
    // 1. get the container and empty it
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML ='';
    // 2.get into every lesson
    for(let lesson of lessons){
        // console.log(lesson)
        //3. create a div
        const levelDiv = document.createElement('div');
        levelDiv.innerHTML = `
          <button href="" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book"></i>
                Lesson - ${lesson.level_no}
                </button>
        `
        // 4. append the div to the container
        levelContainer.appendChild(levelDiv);
    }
}


loadLessons();