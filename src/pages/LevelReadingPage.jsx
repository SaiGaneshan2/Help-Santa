import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SQLChatbot from "../components/SQLChatbot";
import LogoutButton from "../components/auth/LogoutButton";

export default function LevelReadingPage() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [iframeError, setIframeError] = useState(false);
  const htmlFile = `/document/level${levelId}.html`;
  const iframeRef = useRef(null);

  // Make iframe content background transparent
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          if (iframeDoc && iframeDoc.body) {
            // Make body and html transparent with better styling
            iframeDoc.documentElement.style.background = 'transparent';
            iframeDoc.body.style.background = 'transparent';
            iframeDoc.body.style.padding = '20px';
            iframeDoc.body.style.margin = '0';
            iframeDoc.body.style.color = '#9a2828ff';
            
            // Style links to be more visible
            const links = iframeDoc.querySelectorAll('a');
            links.forEach(link => {
              link.style.color = '#60d5ff';
            });
            
            // Style headings
            const headings = iframeDoc.querySelectorAll('h1, h2, h3');
            headings.forEach(heading => {
              heading.style.color = '#ffffff';
              heading.style.textShadow = '2px 2px 4px rgba(0,0,0,0.8)';
            });
          }
        } catch (e) {
          console.log('Cannot access iframe content (same-origin policy):', e);
        }
      };
    }
  }, [levelId]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-start text-white px-4 py-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/imagebackground.png')",
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="fixed top-4 right-4 z-50">
        <LogoutButton />
      </div>
      
      <div className="relative z-10 w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-cyan-300 drop-shadow-lg">
          Level {levelId} Preparation
        </h1>
        <p className="mb-6 text-lg md:text-xl max-w-3xl text-center mx-auto text-white drop-shadow-md">
          Please read the instructions and information below before starting Level {levelId}. This will help you understand the challenge and succeed in the game!
        </p>
        
        <div 
          className="w-full mb-8 rounded-lg shadow-2xl overflow-hidden border-2 border-cyan-400/50 relative bg-black/40 backdrop-blur-sm"
        >
          {iframeError ? (
            <div className="p-8 text-center text-red-600 font-bold bg-black/60 backdrop-blur-md">
              Document not found. Please check that <br />
              <code>public/document/level{levelId}.html</code> exists and is accessible.
            </div>
          ) : (
            <div className="p-6 md:p-8 bg-transparent">
              <iframe
                ref={iframeRef}
                src={htmlFile}
                title={`Level ${levelId} Content`}
                className="w-full h-[450px] md:h-[550px] border-none bg-transparent"
                style={{ background: 'transparent' }}
                onError={() => setIframeError(true)}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            className="px-8 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-xl text-xl font-bold hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 transition shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transform border-2 border-cyan-400/30"
            onClick={() => navigate(`/level/${levelId}`)}
          >
            🎮 Play Now - Level {levelId}
          </button>
        </div>
      </div>
      
      <SQLChatbot />
    </div>
  );
}