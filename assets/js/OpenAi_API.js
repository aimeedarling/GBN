var api_key = "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";

function OpenaiFetchAPI() {
    console.log("Calling GPT3")
    var url = "https://api.openai.com/v1/engines/davinci/completions";
    var bearer = 'Bearer ' + api_key
    const prompt = document.getElementById("prompt").value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": "Decide whether the statement's sentiment is positive, neutral, or negative.\n\nStatement: \""+ prompt + "\"\nSentiment:",
            "max_tokens": 10,
            "temperature": 0,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
            "stop": "\n"
        })


    }).then(response => {
        return response.json()
       
    }).then(data=>{
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))
        console.log(data['choices'][0].text)
        
    })
        .catch(error => {
            console.log('Something bad happened ' + error)
        });

}
