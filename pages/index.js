import Head from 'next/head';
// import Image from 'next/image';
import { useState } from 'react';

const Home = () => {
  const [userInputHobbies, setUserInputHobbies] = useState('');
  const [userInputUser, setUserInputUser] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling AI21...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInputHobbies, userInputUser }),
    });
  
    const data = await response.json();
    const { text } = data;
    console.log("AI21 replied...", text)
  
    setApiOutput(`${text}`);
    setIsGenerating(false);
  }

  const onUserChangedTextHobbies = (event) => {
    // console.log(event.target.value);
    setUserInputHobbies(event.target.value);
  };

  const onUserChangedTextUser = (event) => {
    // console.log(event.target.value);
    setUserInputUser(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Talk About</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Talk About</h1>
          </div>
          <div className="header-subtitle">
            <h2>Make meetings more productive by finding common points to talk about!</h2>
            <p>Everything you put below is anonymous and is not kept. Please do not enter your names, etc. Just use 'I' in place of your names.</p>
          </div>
        </div>
        
        <div className="prompt-container">
          <div className="header">
            <div className="header-subtitle">
              <h2>Please provide the 6 digit id of the person whom you are meeting:</h2>
            </div>
          </div>
          <textarea placeholder="e.g. try 123456 or 654321 if you want to test. " className="prompt-box-user" value={userInputUser} onChange={onUserChangedTextUser} />
          {/* New code I added here */}
          <div className="header">
            <div className="header-subtitle">
              <h2>Tell me more about your hobbies or activities you love to do in your own words.</h2>
            </div>
          </div>
          <textarea placeholder="e.g. I like to... " className="prompt-box" value={userInputHobbies} onChange={onUserChangedTextHobbies} />
          {/* New code I added here */}
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {/* New code I added here */}
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>To talk about based on the following recommendations... </h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://bit.ly/talkabout"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Powered by Metagineers Tech Using AI21 instruct completion engine</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
