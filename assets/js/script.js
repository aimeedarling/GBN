$(function () {

  function handleNewSearch(userSearch){

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

      liEl.on('click', function () {
        handleNewSearch(searches[i])
      })
      ulEl.append(liEl)
    }


    let url = "https://gnews.io/api/v4/search?q=" + userSearch + "&lang=en&country=us&max=10&apikey=c167ea3e7370c8a8771c880aa1c0d815";

    //function if user search is not empty then --
    if (userSearch !== "") {

      $.ajax({

        url: url,
        method: "GET",
        dataType: "json",

        beforeSend: function () {
          $("#loader").show();
        },

        complete: function () {
          $("#loader").hide();
        },

        success: function (news) {
          let output = "";
          let latestNews = news.articles;

          const container = document.querySelector('#sentiment');
          removeAllChildNodes(container);


          for (var i in latestNews) {
            console.log("Calling GPT3")
            var api_key = "sk-xrq2wvrWdRUN7qKuurB";
            var api_key2 = "RT3BlbkFJCJ5D851A6QNwmmO8y82Q"
            var url = "https://api.openai.com/v1/engines/davinci/completions";
            var bearer = 'Bearer ' + api_key + api_key2;
            var prompt = latestNews[i].content;
            OpenaiFetchAPI(url, bearer, prompt).then(response => {
              return response.json()

            }).then(data => {
              console.log(data)
              console.log(typeof data)
              console.log(Object.keys(data))
              console.log(data['choices'][0].text);
              // Create a new HTML element to display the data

              var responseText = data['choices'][0].text;
              var responseEl = $('<div>').text(responseText);

              // Append the element to a container in the HTML (e.g., "#sentiment")
              $('#sentiment').append(responseEl);
            }).catch(error => {
              console.log('Something bad happened ' + error)
            });

            output += `
              <div class="col l6 m6 s12">
              <h4>${latestNews[i].title}</h4>
              <img src="${latestNews[i].image}" class="img-fluid">
              <p>${latestNews[i].description}</p>
              <p>${latestNews[i].content}</p>
              <p>Published on: ${latestNews[i].publishedAt}</p>
              <a href="${latestNews[i].url}" class="btn">Read more</a>
              </div>
            `;
          }

          if (output !== "") {
            $("#newsResults").html(output);
            M.toast({
              html: "There you go, nice reading",
              classes: 'green'
            });

          } else {
            let noNews = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This news isn't available. Sorry about that.<br>Try searching for something else </div>`;
            $("#newsResults").html(noNews);
            M.toast({
              html: "This news isn't available",
              classes: 'red'
            });
          }

        },

        error: function () {
          let internetFailure = `
          <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
          <img src="img/internet.png" class="responsive-img">
          </div>`;

          $("#newsResults").html(internetFailure);
          error.modal({
            html: "We encountered an error, please try again",
            classes: 'red'
          });
        }


      });

    } else {
      let missingVal = `<div style="font-size:34px; text-align:center; margin-top:40px;">Please enter any search term in the search engine</div>`;
      $("#newsResults").html(missingVal);
      M.toast({
        html: "Please enter something",
        classes: 'red'
      });
    }
  }

  $("#searchbtn").on("click", function (e) {
    e.preventDefault()
    let userSearch = $('#user-input').val();
    $('#user-input').val('')
    handleNewSearch(userSearch)

  });

});

function OpenaiFetchAPI(url, bearer, prompt) {

  return fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      "prompt": "Decide whether the statement's sentiment is positive, neutral, or negative.\n\nStatement: \"" + prompt + "\"\nSentiment:",
      "max_tokens": 10,
      "temperature": 0,
      "top_p": 1,
      "n": 1,
      "stream": false,
      "logprobs": null,
      "stop": "\n"

    })
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*
function consensusSentiment() {
  var sentimentElement = document.getElementById("sentiment");
  var countPlus = 0;
  var countNeg = 0;

  for (var i = 0; i < sentimentElement.children.length; i++) {
    var childElement = sentimentElement.children[i];

    if (childElement.textContent.includes("Negative")) {
      countNeg++;
    }

    if (childElement.textContent.includes("Positive")) {
      countPlus++;
    }
  }

  if (countPlus > countNeg) {
    document.getElementById("generalSentiment").innerText = "Mostly Positive";
  }
  else if (countNeg > countPlus) {
    document.getElementById("generalSentiment").innerText = "Mostly Negative";
  }
  else {
    document.getElementById("generalSentiment").innerText = "Neutral";
  }
}
*/