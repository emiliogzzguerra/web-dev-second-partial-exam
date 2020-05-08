let setMealRecipeListeners = () => {
    let form = document.querySelector("#search");

    form.addEventListener('submit', (event) =>{
        event.preventDefault();
        let searchTerm = document.querySelector('#query').value;
        
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm).then((res) => {
            console.log(res.body)
            console.log("Since I wasn't able to install body parser in the index.js (I didn't know that 'require()' doesn't work in the browser I wasn't able to see the body of the request)")
        })
    })
}

let init = () => {
    setMealRecipeListeners();
}

init();