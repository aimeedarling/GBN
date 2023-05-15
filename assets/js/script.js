
//! this code functions to store search items in localStorage, render them to the page with the most current at the top, and limits the list to 10 searches

$(function () {
    $('.search-btn').click(function (e) {
        e.preventDefault()

        let userSearch = $('#user-input').val();
        $('#user-input').val('')

        let searches = JSON.parse(localStorage.getItem('searches') || '[]');
        searches.push(userSearch)


        let updatedSearches = JSON.stringify(searches)
        localStorage.setItem('searches', updatedSearches);

        const ulEl = $('.search-history')
        ulEl.empty()

        if (searches.length > 10) {
            searches = searches.slice(-10)
        }

        for (let i = searches.length - 1; i >= 0; i--) {
            let liEl = $('<li>').text(searches[i])
            ulEl.append(liEl)

        }
    });

});


