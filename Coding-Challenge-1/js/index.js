let setMealRecipeListeners = () => {
    let form = document.querySelector("#search");
    let main = document.querySelector("#main");

    form.addEventListener('submit', (event) =>{
        event.preventDefault();
        let searchTerm = document.querySelector('#query').value;

        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm)
            .then(response => response.json())
            .then(data => {
                main.innerHTML = `
                    DISCLAIMER: I uploaded this portion of the exam
                    about 15 minutes late, after you left the zoom chat
                    - the part that I didn't remember how to do and had 
                    to google was the first .then () in which we have to 
                    return response.json() to be able to consume the body 
                    of the request.

                    With that, displaying what you asked us to display
                    was straightforward - I hope you can count this for
                    a couple points, if not no problem, I know I'll have
                    to study a bit more next time! 🙌
                `
                if (!data.meals) {
                    main.innerHTML += "Error: No meals matched with that name"
                } else {
                    main.innerHTML += "<ul>"
                    for(let i = 0; i<data.meals.length; i++) {
                        main.innerHTML += "<li>Name: " + data.meals[i].strMeal  + "</li>";
                        main.innerHTML += "<img src='" + data.meals[i].strMealThumb + "' style='width: 50px; height: 50px;' />";
                        main.innerHTML += "<li>Area: " + data.meals[i].strArea  + "</li>";
                        main.innerHTML += "<li>Instructions: " + data.meals[i].strInstructions  + "</li>";
                        main.innerHTML += "</ul>"
                        main.innerHTML += "<p>---------------------------------------</p>"
                    }
                    main.innerHTML += "</ul>"
                }
            }).catch(err => {
                main.innerHTML = `
                    DISCLAIMER: I uploaded this portion of the exam
                    about 15 minutes late, after you left the zoom chat
                    - the part that I didn't remember how to do and had 
                    to google was the first .then () in which we have to 
                    return response.json() to be able to consume the body 
                    of the request.

                    With that, displaying what you asked us to display
                    was straightforward - I hope you can count this for
                    a couple points, if not no problem, I know I'll have
                    to study a bit more next time! 🙌
                `
                main.innerHTML += "Error: An error ocurred in the API"
            }); 
    })
}

let init = () => {
    setMealRecipeListeners();
}

init();