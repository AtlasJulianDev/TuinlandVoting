// == Trello Power-Up: Polling/Voting ==

// Constants
var POLL_OPTION_CLASS = 'poll-option';
var POLL_VOTE_CLASS = 'poll-vote';
var POLL_VOTED_CLASS = 'poll-voted';

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

  function updatePollVoteCount(pollOption, voteCount) {
    pollOption.querySelector('.' + POLL_VOTE_COUNT_CLASS).textContent = 'Votes: ' + voteCount;
  }

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

// Handle Create Poll
function handleCreatePoll(t) {
    t.popup({
      title: 'Create Poll',
      items: [
        {
          text: 'Accept',
          callback: function(t) {
            addPollOption(t, 'Accept');
          }
        },
        {
          text: 'Decline',
          callback: function(t) {
            addPollOption(t, 'Decline');
          }
        }
        // Add more options as needed
      ]
    });
  }
  
  // Add Poll Option
  function addPollOption(t, optionText) {
    var pollOptions = t.get('board', 'shared', 'poll-options') || [];
    pollOptions.push(optionText);
    t.set('board', 'shared', 'poll-options', pollOptions)
      .then(function() {
        t.closePopup();
      });
  }
  
  // Initialize Power-Up
  window.TrelloPowerUp.initialize({
    'card-badges': function(t, options) {
        return t.card('id', 'name', 'desc') // Get card information
          .then(function(card) {
            var pollOptions = options['poll-options'] || [];
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
  
