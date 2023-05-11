

$(function () {
   
    let userSearch = $('#user-input').val();

    $('.search-btn').click(function (e) {
        e.preventDefault();
        let storedSearches = localStorage.getItem('searches')
        console.log(storedSearches)
        let searches = JSON.parse(localStorage.getItem('userSearch') || []);
        searches.push(userSearch)

        let updatedSearches = JSON.stringify(searches)

        localStorage.setItem('searches', updatedSearches);
        console.log(userSearch)
    });

    $('.search-history').each(function(){
        let searches = JSON.parse(localStorage.getItem('userSearch'))
        if (userSearch){
            $(this).append($('<li>').text(searches));
        }
    })

});


// $(function () {
//     $('.search-btn').click(function (e) {
//         e.preventDefault();
//         let userSearch = $('#search-text').val();
//         let searches = JSON.parse(localStorage.getItem('searches')) || [];

//         searches.push(userSearch);

//         let updatedSearches = JSON.stringify(searches);

//         localStorage.setItem('searches', updatedSearches);
//         console.log(userSearch);
//     });

//     $('.search-history').each(function () {
//         let searches = JSON.parse(localStorage.getItem('searches')) || [];

//         searches.forEach(function (search) {
//             $(this).append($('<li>').text(search));
//         }, this);
//     });
// });