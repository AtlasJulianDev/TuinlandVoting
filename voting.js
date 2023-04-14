// == Trello Power-Up: Voting/Polling ==

// Constants
var POLL_OPTION_CLASS = 'poll-option';
var POLL_VOTE_CLASS = 'poll-vote';
var POLL_VOTED_CLASS = 'poll-voted';

// Create Poll Option
function createPollOption(optionText) {
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
  
  pollOption.appendChild(pollVote);
  pollOption.appendChild(pollText);
  
  return pollOption;
}

// Handle Poll Vote
function handlePollVote(pollOption) {
  if (!pollOption.classList.contains(POLL_VOTED_CLASS)) {
    pollOption.classList.add(POLL_VOTED_CLASS);
    pollOption.querySelector('.' + POLL_VOTE_CLASS).textContent = 'Voted';
    // Perform additional actions when a vote is cast, e.g., update vote count, send data to backend, etc.
  }
}

// Initialize Power-Up
TrelloPowerUp.initialize({
  'card-badges': function(t, options) {
    var pollOptions = options['poll-options'] || [];
    var pollOptionElements = pollOptions.map(function(optionText) {
      return createPollOption(optionText);
    });
    return Promise.resolve({
      icon: '',
      text: '',
      items: pollOptionElements
    });
  },
  'card-detail-badges': function(t, options) {
    var pollOptions = options['poll-options'] || [];
    var pollOptionElements = pollOptions.map(function(optionText) {
      return createPollOption(optionText);
    });
    return Promise.resolve(pollOptionElements);
  }
});
