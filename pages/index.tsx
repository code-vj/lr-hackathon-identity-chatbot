import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';

import { Message } from '@/types/chat';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import logo from './logo.svg';
import  mainstyles from '../styles/main.module.css';
import Card from '@/components/ui/Card';
import ChatCard from '@/components/ui/ChatCard';
import { Avatar, Button, IconButton, InputAdornment, Typography } from '@mui/material';
import constantVaribles from '@/constants';
import ChatTextField from '@/components/ui/TextField'


export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
    ],
    history: [],
  });
 
  const { messages, history } = messageState;

  const messageListRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textAreaRef.current?.focus();
    
     
    // var aScript = document.createElement('script');
    // aScript.type = 'text/javascript';
    // aScript.src = "/test.js";

    // document.head.appendChild(aScript);
    // aScript.onload = () => {

    // };
    //stripe_load();
  }, []);

  //handle form submission
  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    const question = query.trim();

    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));

    setLoading(true);
    setQuery('');
    messageListRef.current?.scrollTo({ top:messageListRef.current.scrollHeight, behavior: 'smooth' });
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });
      const data = await response.json();
      console.log('data', data);
      
      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          history: [...state.history, [question, data.text]],
        }));
      }
      console.log('messageState', messageState);

      setLoading(false);

      
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  //prevent empty submissions
  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

 
        
 

  return (
    <>
      {/* <Layout>
        <div className="mx-auto flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-center">
            LoginRadius Identity ChatBot
          </h1>
          <main className={styles.main}>
            <div className={styles.cloud}>
              <div ref={messageListRef} className={styles.messagelist}>
                {messages.map((message, index) => {
                  let icon;
                  let className;
                  if (message.type === 'apiMessage') {
                    icon = (
                      <Image
                        key={index}
                        src="/bot-image.png"
                        alt="AI"
                        width="40"
                        height="40"
                        className={styles.boticon}
                        priority
                      />
                    );
                    className = styles.apimessage;
                  } else {
                    icon = (
                      <Image
                        key={index}
                        src="/usericon.png"
                        alt="Me"
                        width="30"
                        height="30"
                        className={styles.usericon}
                        priority
                      />
                    );
                    // The latest message sent by the user will be animated while waiting for a response
                    className =
                      loading && index === messages.length - 1
                        ? styles.usermessagewaiting
                        : styles.usermessage;
                  }
                  return (
                    <> */}



    <div className={mainstyles.App}>
      <div className={mainstyles.mainDiv}>
        <div className={mainstyles.leftDiv}>
          <div className={mainstyles.leftHeaderDiv}>
            <div className={mainstyles.imageDiv}>
              <img src="./assets/images/loginradius-horizontal-logo.png" alt="logo" width="60%" height="100%" />
            </div>
            <div className={mainstyles.leftDivCard}>
              <Card label="+ New Chat" ></Card>
              <Card label="Chat History" ></Card>
            </div>
          </div>
          <div className={mainstyles.leftFooterDiv}>
            <Avatar alt="Name" src='./assets/images/people.png' sx={{ width: 76, height: 76 }}/>
            <Typography color="#FFF">Name</Typography>
          </div>
      </div>
        <div className={mainstyles.rightDiv}>
          {/* <div className={mainstyles.rightHeaderDiv}>
            <Button variant="text" className={mainstyles.loginButton}>LOGIN</Button>
            <img src="./assets/images/search.png" alt="logo" width="5%" />
          </div> */}
          <div className={mainstyles.rightBodyDiv} ref={messageListRef}>
            {/* <div className={mainstyles.rightHeaderDiv}>
             <div className={mainstyles.rightStickyDiv}> */}
            <div className='' style={{display: "flex", justifyContent: "center"}}>
            <img src="./assets/images/logo.png" alt="logo" height="20%" width="10%"/>
            </div>
            <Typography variant='h3' fontWeight={900} marginTop="-20px">{constantVaribles.APP_TITLE}</Typography>
            <Typography variant='h5' >
              {constantVaribles.APP_DESCRIPTION}</Typography>
            {/* </div>
            </div> */}
            <div className={mainstyles.rightChatDiv}>
              <Typography variant='h6'>
                {constantVaribles.ASK_QUESTION}
              </Typography>
              <div className={mainstyles.rightChatWindow} >
              {messages.length === 0 ?
              <div >
                <ChatCard  >
                  <p className={mainstyles.question}
                   onClick={() => setQuery("What is identity and access management?")}>
                    What is identity and access management?
                </p>
                   </ChatCard>
                <ChatCard >
                  <p className={mainstyles.question}
                  onClick={() => setQuery("Benefits of passwordless authentication")}>
                  Benefits of passwordless authentication
                  </p>
                  </ChatCard>
                <ChatCard >
                  <p  className={mainstyles.question}
                  onClick={() => setQuery("How does two-factor authentication (2FA) work?")}>
                  How does two-factor authentication (2FA) work?
                  </p>
               </ChatCard>
                </div> : 
               
                <div >
                  {messages.map((message, index) => {
             
                      return (
                        <div >
                   
                    {message.type !== "apiMessage" && <ChatCard >
                        <p className={mainstyles.question}>
                          {message.message}
                        </p>
                        {messages[index + 1]?.type === "apiMessage" && 
                        <p className={mainstyles.answers}>
                          {message.message}
                        </p>}
                          {error && (
              
                            <p className={mainstyles.answers}>
                          {error}
                        </p>
                          )}
                      </ChatCard>}
                  
                    </div>
                    // }
                    );
                    })}
                <div style={{ marginBottom: 100 }} ></div>
                  </div>
                }
               

              </div>
              
            </div>
          </div>
            <div className={mainstyles.rightBottomDiv}>
              <div className={mainstyles.rightTextFieldMainDiv}>
                <div className={mainstyles.rightTextFieldDiv}>

                  <ChatTextField
                    // size='large'
                    sx={{ width: "90%" }}
                    placeholder={constantVaribles.ASK_ME}
                    variant="standard"
                    disabled={loading}
                    onKeyDown={handleEnter}
                    value={query}
                    // ref={textAreaRef}
                    onChange={(e) => setQuery(e.target.value)}

                  />
                  <div style={{ width: "10%" }} >
                    {loading ? (
                      <div style={{width: "100%", height: "100%", display: "flex", alignContent: "center" }}>
                        <LoadingDots color="#FFF" />
                      </div>
                    ) 
                    : 
                    <Button
                      style={{ height: "100%" }}
                      onClick={handleSubmit}
                    >
                      <img src="./assets/images/send.png" alt="logo" width="90%" />
                    </Button>
                    }
                  </div>
                </div>
              </div>
                  <div className={mainstyles.rightFooterDiv}>
                    <p>
                      Terms of use
                    </p>
                    <p>
                      Privacy Statement
                    </p>
                  </div>

              </div>
        </div>
      </div>
    </div>

{/* 
                      <div key={`chatMessage-${index}`} className={className}>
                        {icon}
                        <div className={styles.markdownanswer}>
                          <ReactMarkdown linkTarget="_blank">
                            {message.message}
                          </ReactMarkdown>
                        </div>
                      </div>
                      {message.sourceDocs && (
                        <div
                          className="p-5"
                          key={`sourceDocsAccordion-${index}`}
                        >
                          <Accordion
                            type="single"
                            collapsible
                            className="flex-col"
                          >
                            {message.sourceDocs.map((doc, index) => (
                              <div key={`messageSourceDocs-${index}`}>
                                <AccordionItem value={`item-${index}`}>
                                  <AccordionTrigger>
                                    <h3>Source {index + 1}</h3>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <ReactMarkdown linkTarget="_blank">
                                      {doc.pageContent}
                                    </ReactMarkdown>
                                    <p className="mt-2">
                                      <b>Source:</b> {doc.metadata.source}
                                    </p>
                                  </AccordionContent>
                                </AccordionItem>
                              </div>
                            ))}
                          </Accordion>
                        </div>
                      )} */}
                    {/* </>
                  );
                })}
              </div>
            </div>
            <div className={styles.center}>
              <div className={styles.cloudform}>
                <form onSubmit={handleSubmit}>
                <div className="words" >
        <p id="p"></p>
    </div>
                  <textarea
                    disabled={loading}
                    onKeyDown={handleEnter}
                    ref={textAreaRef}
                    autoFocus={false}
                    rows={1}
                    maxLength={512}
                    id="userInput"
                    name="userInput"
                    placeholder={
                      loading
                        ? 'Waiting for response...'
                        : 'What is this for customer identity?'
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.textarea}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={styles.generatebutton}
                  >
                    {loading ? (
                      <div className={styles.loadingwheel}>
                        <LoadingDots color="#000" />
                      </div>
                    ) : (
                      // Send icon SVG in input field
                      <svg
                        viewBox="0 0 20 20"
                        className={styles.svgicon}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                    )}
                  </button>
                 
                </form>
              </div>
            </div>
            {error && (
              <div className="border border-red-400 rounded-md p-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </main>
        </div>
        <footer className="m-auto p-4">
          <a href="https://twitter.com/mayowaoshin">
            Powered by LoginRadius.
          </a>
        </footer>
      </Layout> */}
    </>
  );
}
