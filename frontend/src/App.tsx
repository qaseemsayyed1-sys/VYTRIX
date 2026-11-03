function SentinelChat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I am SENTINEL. I can analyze your financial health, seller risks, and checkout integrity. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let botReply = "Based on your current profile, you can afford this purchase, but keep an eye on hidden checkout fees.";
      if (input.toLowerCase().includes('laptop') || input.toLowerCase().includes('afford')) {
        botReply = "Your disposable income is ₹60,000. The laptop costs ₹65,000. Buying it will drop your savings to -₹15,000. I recommend proceeding with caution.";
      } else if (input.toLowerCase().includes('seller') || input.toLowerCase().includes('risk')) {
        botReply = "The seller's domain is secure (HTTPS verified), but their contact information is missing. This is a medium risk indicator.";
      }
      
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col pt-16 lg:pt-0 pb-10 animate-fade-in-up">
      <div className="mb-4 md:mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 text-[#F3EFE6]">
          <Bot className="text-[#C4A484]" /> SENTINEL AI
        </h2>
        <p className="text-[#A69F96] text-sm">Chat with your unified purchase intelligence engine.</p>
      </div>
      
      <div className="bg-[#26211E] flex-1 rounded-2xl border border-[#3B332F] p-4 md:p-6 flex flex-col justify-end overflow-hidden shadow-xl">
        <div className="space-y-4 mb-4 overflow-y-auto pr-2">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`p-3 md:p-4 rounded-xl max-w-[85%] text-sm md:text-base animate-fade-in-up ${
                msg.isBot 
                  ? 'bg-[#1C1816] text-[#F3EFE6] border border-[#3B332F]' 
                  : 'bg-[#C4A484]/10 border border-[#C4A484]/30 text-[#F3EFE6] ml-auto shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask SENTINEL anything..." 
            className="flex-1 bg-[#1C1816] border border-[#3B332F] rounded-lg px-4 py-3 text-[#F3EFE6] focus:outline-none focus:border-[#C4A484] text-sm md:text-base transition-colors" 
          />
          <button type="submit" className="bg-[#C4A484] px-4 md:px-6 rounded-lg font-bold text-[#1C1816] hover:bg-[#D4B494] shrink-0 transition-all shadow-lg shadow-[#C4A484]/20">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
