const synonems =["hamim","sofik","kamal"];
const createElement =(arr)=>{
    // console.log(arr)
    // [ 'hamim', 'sofik', 'kamal' ]
    const htmlElement = arr.map(el => `<span class="btn">${el}</span>`)
    console.log(htmlElement.join(" "))
}

createElement(synonems)