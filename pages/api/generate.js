import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Give me 5 interview questions asked during a job interview for the following position. Where possible ask questions that are specific to the position. If an organisation is given, include questions specific to the organisation.

Position:        
`;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 500,
  });
  
  const basePromptOutput = await baseCompletion.data.choices.pop();

  console.log(basePromptOutput.text);

    // Add your second prompt here
    const secondPrompt = `
    Take the interview questions and the position of the job below and generate answers for each questions. Go deep into each one. Include the questions for each answers.

    Position: ${req.body.userInput}

    Interview Questions: ${basePromptOutput.text}

    Interview Qestions with the respective answers:
    `;

    console.log(secondPrompt);
    
    // I call the OpenAI API a second time with Prompt #2
    const secondPromptCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${secondPrompt}`,
      // I set a higher temperature for this one. Up to you!
      temperature: 0.85,
      // I also increase max_tokens.
      max_tokens: 1250,
    });
    
    // Get the output
    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    // Send over the Prompt #2's output to our UI instead of Prompt #1's.
    res.status(200).json({ output: secondPromptOutput });
};


export default generateAction;