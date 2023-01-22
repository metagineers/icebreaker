import axios from 'axios';

//import sdk from 'api';
const basePromptPrefix = `prompt:\n
`;

const incomingUser = 'User1'
const sampleUsers = {
  '123456': {
    name: 'User2',
    hobbies: 'I like to play video games and watch movies. I like to go to the gym and play basketball. I like to go to the beach and swim. I like to go to the park and play with my dog. I like to go to the mall and shop.',
  },
  '654321': {
    name: 'User3',
    hobbies: 'I like to travel around the world. I like to do charity work. I like to ride horses. I like to play rugby. I like to watch read books. I likw to play computer games. I love generating art using Midjourney.',
  },
}

// Instructions.. very important. one \n missing might means a lot!
// const instruction = 'Tell me what ' + incomingUser +  ' have in common with '+ sampleUsers['123456'].name +'.\n';
const instruction = 'Tell User1 what ' + incomingUser +  ' he or she have in common with '+ sampleUsers['123456'].name +'.\n';

const generateAction = async (req, res) => {
  

  // if the req userInputUsers is not 123456 or 654321, then return error Please enter a valid user id
  if (req.body.userInputUser !== '123456' && req.body.userInputUser !== '654321') {
    const data = { text: 'ERROR: Please enter a valid user id. Try 123456 or 654321 for testing.'};
    return res.status(400).send(data);
  } 

  const userInputUser = req.body.userInputUser;
  // 
  let promptToSend = basePromptPrefix + incomingUser +': ' + req.body.userInputHobbies + '\n\n' + sampleUsers[userInputUser].name + ': ' + sampleUsers[userInputUser].hobbies + '\n\n' + instruction;

  // Run prompt
  console.log(`sending prompt: ${promptToSend}`)

  try {

    // and then return the response to the client
    const response = await axios.post('https://api.ai21.com/studio/v1/experimental/j1-grande-instruct/complete', {
      prompt: promptToSend,
      numResults: 1,
      maxTokens: 250,
      temperature: 0.73,
      topKReturn: 0,
      topP: 1,
      countPenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false
      },
      frequencyPenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false
      },
      presencePenalty: {
        scale: 0,
        applyToNumbers: false,
        applyToPunctuations: false,
        applyToStopwords: false,
        applyToWhitespaces: false,
        applyToEmojis: false
      },
      stopSequences: []
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI21_API_KEY}`
      }
    });
    console.dir(response.data.completions[0].data);
    return res.status(200).send(response.data.completions[0].data)
  } catch (error) {
    console.log(error);
    return  res.status(500).send(error); 
  }
};

export default generateAction;