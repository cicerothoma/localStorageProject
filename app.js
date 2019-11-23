// Variables
let form = document.getElementById('form'),
    tweet = document.getElementById('tweet'),
    input = document.getElementsByClassName('button'),
    div = document.getElementById('tweet-list');


// Event Listeners
eventListener();  

function eventListener() {
     // Form Submission
     document.querySelector('#form').addEventListener('submit', newTweet);

     // Load Content from Local Storage to the DOM

     document.addEventListener('DOMContentLoaded', loadDataFromLocalStorage)
}



// Functions

function newTweet(e) {
    e.preventDefault();
    let value = tweet.value;
 
 
    // Create the Remove Button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';

    div.addEventListener('click', removeTweet);
    
    // Create the element

    let li = document.createElement('li');

    li.textContent = value;

    // Add the remove button to the Div
    li.appendChild(removeBtn);

    // Add the li element to the div with tweet-list id
    div.appendChild(li);

    // Add tweet to Local Storage
    addTweetToLocalStorage(value);
    alert('Your Tweet has been added');
    this.reset();
}

// Removes the Tweet from the DOM

function removeTweet(e) {
    if (e.target.classList.contains('remove-tweet')) {
        e.target.parentElement.remove(); 
    };
    // Remove tweet from Local Storage

    removeTweetFromLocalStorage(e.target.parentElement.textContent)
};

// Add Tweet To Local Storage Function

function addTweetToLocalStorage(value){
   let tweets = getTweetsFromLocalStorage();

   // Add Tweet to the array
   tweets.push(value);

   // Convert the tweet Array to string and send to localStorage

   localStorage.setItem('tweet', JSON.stringify(tweets));
}    

function getTweetsFromLocalStorage() {
    let tweet;
    const tweetLS = localStorage.getItem('tweet');
    // Get the values if null is returned then we create an empty array

    if (tweetLS === null ) {
        tweet = [];
    } else {
       tweet = JSON.parse(tweetLS);
    }
    return tweet;
}

// Prints Data From Local Storage

function loadDataFromLocalStorage() {
    let tweets = getTweetsFromLocalStorage();

    console.log(tweets);
  // Loop through the array and print the Values
    tweets.forEach((list) => {
        // Create the Remove Button
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';

        div.addEventListener('click', removeTweet);
        
        // Create the element

        let li = document.createElement('li');

        li.textContent = list;

        // Add the remove button to the Div
        li.appendChild(removeBtn);

        // Add the li element to the div with tweet-list id
        div.appendChild(li);
    })
  
}

// Function That removes tweets from the local Storage

function removeTweetFromLocalStorage(tweet) {
    
    let tweets = getTweetsFromLocalStorage();
    // Remove the X from the tweet
    
    const stringDelete = tweet.substr(0, tweet.length - 1);

    // Loop through the tweets from Local Storage and delete the one strictly equal to the stringDelete value.

    tweets.forEach((tweetLS, index) => {
        if (stringDelete === tweetLS) {
            tweets.splice(index, 1);
        }
    })

    localStorage.setItem('tweet', JSON.stringify(tweets))
}
