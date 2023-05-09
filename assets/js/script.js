
GET https://newsapi.org/v2/everything?q=Apple&from=2023-05-09&sortBy=popularity&apiKey=633e9fc1f7394f1a90b345edcdbd4892

var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2023-05-09&' +
          'sortBy=popularity&' +
          'apiKey=633e9fc1f7394f1a90b345edcdbd4892';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })