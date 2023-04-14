// ... (existing code)

var pollOptions = []; // Initialize pollOptions as an empty array

// Create Poll Option
function createPollOption(optionText, voteCount) {
  var pollOption = document.createElement('div');
  pollOption.className = POLL_OPTION_CLASS;

  var pollVote = document.createElement('button');
  pollVote.className = POLL_VOTE_CLASS;
  pollVote.textContent = 'Vote';
  pollVote.addEventListener('click', function() {
    handlePollVote(pollOption);
  });

  var pollText = document.createElement('span');
  pollText.textContent = optionText;

  var pollVoteCount = document.createElement('span');
  pollVoteCount.className = POLL_VOTE_COUNT_CLASS;
  pollVoteCount.textContent = 'Votes: ' + voteCount;

  pollOption.appendChild(pollVote);
  pollOption.appendChild(pollText);
  pollOption.appendChild(pollVoteCount);

  return pollOption;
}

// Update Poll Vote Count
function updatePollVoteCount(pollOption, voteCount) {
  pollOption.querySelector('.' + POLL_VOTE_COUNT_CLASS).textContent = 'Votes: ' + voteCount;
}

// ... (existing code)

// Handle Poll Vote
function handlePollVote(pollOption) {
  if (!pollOption.classList.contains(POLL_VOTED_CLASS)) {
    pollOption.classList.add(POLL_VOTED_CLASS);
    pollOption.querySelector('.' + POLL_VOTE_CLASS).textContent = 'Voted';
    var voteCount = parseInt(pollOption.querySelector('.' + POLL_VOTE_COUNT_CLASS).textContent.split(' ')[1]);
    voteCount++;
    updatePollVoteCount(pollOption, voteCount);
    // Perform additional actions when a vote is cast, e.g., update vote count, send data to backend, etc.
  }
}

// ... (existing code)

// Initialize Power-Up
window.TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    return t.card('id', 'name', 'desc') // Get card information
      .then(function(card) {
        var pollOptionElements = pollOptions.map(function(optionText) {
          var voteCount = options['poll-votes'][optionText] || 0; // Get vote count from shared board data
          return createPollOption(optionText, voteCount);
        });
        return [{
          icon: '',
          text: '',
          items: pollOptionElements
        }];
      });
  },
  'card-buttons': function(t, options) {
    return [{
      text: 'Create Poll',
      callback: function(t) {
        handleCreatePoll(t);
      }
    }];
  }
});
