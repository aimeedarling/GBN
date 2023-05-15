var pastSearches = [];

if (localStorage["pastSearches"]) {
    pastSearches = JSON.parse(localStorage["pastSearches"]);
}
if (pastSearches.indexOf(search) == -1) {
    pastSearches.unshift(search);
    if (pastSearches.length > 5) {
        pastSearches.pop();
    }
    localStorage["pastSearches"] = JSON.stringify(pastSearches);
}
function drawPastSearches() {
    if (pastSearches.length) {
        var html = pastSearchesTemplate({ search: pastSearches });
        $("#pastSearches").html(html);
    }
}

$(document).on("click", ".pastSearchLink", function (e) {
    e.preventDefault();
    var search = $(this).text();
    doSearch(search);
});