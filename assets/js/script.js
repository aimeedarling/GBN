



//function of search button

// let searchbtn = document.querySelector(".search-btn")
// let userInput = document.querySelector(".input")
// let savedContent

// searchbtn.addEventListener("click", function () {
//     let userSearch = userInput.value


// })

$(function () {
    $('.search-btn').click(function (e) {
        e.preventDefault()
        let userSearch = $('#searchText').val
        let searches = JSON.parse(localStorage.getItem('searches')) || [];
     
        searches.push(userSearch)

        let updatedSearches = JSON.stringify(searches)

        localStorage.setItem('searches', JSON.stringify(userSearch));

    });

    $('.search-history').each(function(){
        if (userSearches){
            $(this).find('li').cal(searches)
        }
    })

});