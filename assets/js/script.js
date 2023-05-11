


$(function () {
    $('.search-btn').click(function (e) {
        e.preventDefault();
        let userSearch = $('#user-input').val();
        // let storedSearches = localStorage.getItem('searches')
        let searches = JSON.parse(localStorage.getItem('searches') || '[]');
        searches.push(userSearch)

        let updatedSearches = JSON.stringify(searches)
        localStorage.setItem('searches', updatedSearches);

        const ulEl = $('.search-history')

        searches.forEach(function (item) {
            let liEl = $('<li>').text(item);
            ulEl.append(liEl)
        })
    });

    let searches = JSON.parse(localStorage.getItem('searches'))
    const ulEl = $('.search-history')
    searches.forEach(function (item) {
        let liEl = $('<li>').text(item);
        ulEl.append(liEl)
    })

});