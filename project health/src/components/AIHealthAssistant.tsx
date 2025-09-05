import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Mic, MicOff, Heart, AlertCircle, Info, Lightbulb } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  category?: 'info' | 'warning' | 'suggestion' | 'emergency';
}

const AI_RESPONSES = {
  symptoms: [
    "Based on your symptoms, I recommend consulting with a healthcare provider. However, here are some general suggestions:",
    "These symptoms could indicate various conditions. It's important to get a proper medical evaluation.",
    "I understand you're concerned about these symptoms. Let me provide some general information:"
  ],
  medication: [
    "Regarding medications, always consult your doctor or pharmacist for personalized advice.",
    "Medication management is crucial for your health. Here's what I can tell you:",
    "It's important to take medications as prescribed. Here are some general guidelines:"
  ],
  lifestyle: [
    "Great question about lifestyle and health! Here are some evidence-based recommendations:",
    "Lifestyle changes can significantly impact your health. Consider these suggestions:",
    "I'm glad you're thinking about healthy lifestyle choices. Here's what research shows:"
  ],
  general: [
    "I'm here to help with your health questions. Let me provide some information:",
    "That's an interesting health-related question. Here's what I can share:",
    "Thanks for reaching out about your health concern. Here's some helpful information:"
  ]
};

const SAMPLE_RESPONSES = {
  "headache": {
    category: 'warning' as const,
    content: "Headaches can have various causes including dehydration, stress, eye strain, or lack of sleep. Try drinking water, resting in a dark room, and applying a cold compress. If headaches persist, worsen, or are accompanied by fever, vision changes, or neck stiffness, please consult a healthcare provider immediately."
  },
  "blood pressure": {
    category: 'info' as const,
    content: "Normal blood pressure is typically below 120/80 mmHg. High blood pressure (hypertension) is often called the 'silent killer' because it usually has no symptoms. Regular monitoring, a healthy diet low in sodium, regular exercise, and stress management can help maintain healthy blood pressure levels."
  },
  "diabetes": {
    category: 'warning' as const,
    content: "Diabetes management involves monitoring blood sugar levels, following a balanced diet, regular exercise, and taking medications as prescribed. Key symptoms include frequent urination, excessive thirst, unexplained weight loss, and fatigue. If you suspect diabetes, please see a healthcare provider for proper testing and diagnosis."
  },
  "medication": {
    category: 'suggestion' as const,
    content: "Always take medications exactly as prescribed by your healthcare provider. Set up reminders, use pill organizers, and never skip doses. Don't stop medications suddenly without consulting your doctor. If you experience side effects, contact your healthcare provider rather than stopping the medication on your own."
  },
  "chest pain": {
    category: 'emergency' as const,
    content: "⚠️ EMERGENCY: Chest pain can be a sign of a heart attack or other serious condition. If you're experiencing chest pain, especially with shortness of breath, sweating, nausea, or pain radiating to your arm or jaw, call emergency services (911) immediately. Don't drive yourself - have someone else take you or call an ambulance."
  }
};

const AIHealthAssistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI Health Assistant. I can help answer general health questions, provide wellness tips, and offer guidance on when to seek medical care. Please note that I'm not a replacement for professional medical advice. How can I help you today?",
      timestamp: new Date(),
      category: 'info'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): { content: string; category: Message['category'] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for emergency keywords
    if (lowerMessage.includes('chest pain') || lowerMessage.includes('heart attack') || lowerMessage.includes('can\'t breathe')) {
      return SAMPLE_RESPONSES['chest pain'];
    }
    
    // Check for specific topics
    for (const [key, response] of Object.entries(SAMPLE_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Generate contextual response based on message content
    let responseType = 'general';
    if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('feel')) {
      responseType = 'symptoms';
    } else if (lowerMessage.includes('medication') || lowerMessage.includes('pill') || lowerMessage.includes('drug')) {
      responseType = 'medication';
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('diet') || lowerMessage.includes('lifestyle')) {
      responseType = 'lifestyle';
    }
    
    const responses = AI_RESPONSES[responseType as keyof typeof AI_RESPONSES];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      content: `${randomResponse} For specific medical concerns, please consult with a qualified healthcare provider who can properly evaluate your individual situation.`,
      category: 'info'
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const { content, category } = generateResponse(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
        category
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category?: Message['category']) => {
    switch (category) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'emergency': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'suggestion': return <Lightbulb className="h-4 w-4 text-green-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const getCategoryBadge = (category?: Message['category']) => {
    switch (category) {
      case 'warning': return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Warning</Badge>;
      case 'emergency': return <Badge variant="destructive">Emergency</Badge>;
      case 'suggestion': return <Badge variant="secondary" className="bg-green-100 text-green-800">Suggestion</Badge>;
      case 'info': return <Badge variant="outline">Info</Badge>;
      default: return null;
    }
  };

  const quickQuestions = [
    "How to manage high blood pressure?",
    "What are symptoms of diabetes?",
    "When should I see a doctor?",
    "How to improve sleep quality?",
    "What's a healthy diet?",
    "How much water should I drink daily?"
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bot className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-3xl font-bold">AI Health Assistant</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant answers to health questions, wellness tips, and guidance on when to seek medical care
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Health Assistant Chat
                  </CardTitle>
                  <CardDescription>
                    Ask questions about health, symptoms, medications, and wellness
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ● Online
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      
                      <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}>
                          <div className="flex items-start gap-2">
                            {message.type === 'bot' && getCategoryIcon(message.category)}
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          {message.category && getCategoryBadge(message.category)}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              {/* Quick Questions */}
              <div className="border-t p-4">
                <p className="text-sm font-medium mb-3">Quick Questions:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputValue(question)}
                      className="text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about symptoms, medications, health tips..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleVoiceInput}
                    disabled={isListening}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    This AI assistant provides general information only and is not a substitute for professional medical advice.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIHealthAssistant;