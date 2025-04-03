document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    }
    
    // Send message on button click or Enter key
    chatbotSend.addEventListener('click', sendMessage);
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick questions
    quickQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const text = this.textContent;
            addMessage(text, 'user');
            
            setTimeout(() => {
                const botResponse = getBotResponse(text);
                addMessage(botResponse, 'bot');
            }, 1000);
        });
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate bot responses
    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('prescription') || lowerMessage.includes('refill')) {
            return "To refill a prescription, you can upload it on our Orders page or bring it to our physical location. Would you like me to direct you to our prescription refill page?";
        } else if (lowerMessage.includes('delivery') || lowerMessage.includes('ship')) {
            return "We offer same-day delivery for local orders placed before 2pm. For other areas, delivery typically takes 2-3 business days. All deliveries are discreetly packaged.";
        } else if (lowerMessage.includes('product') || lowerMessage.includes('item')) {
            return "You can browse all our products on the 'Our Products' page. Is there a specific product you're looking for information about?";
        } else if (lowerMessage.includes('pharmacist') || lowerMessage.includes('talk')) {
            return "I can connect you with one of our licensed pharmacists. Please call (800) 555-1234 for immediate assistance or would you like me to schedule a callback?";
        } else if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
            return "Our pharmacy is open Monday-Friday from 8:00 AM to 10:00 PM, and Saturday-Sunday from 9:00 AM to 8:00 PM. Our online services are available 24/7.";
        } else if (lowerMessage.includes('insurance') || lowerMessage.includes('cover')) {
            return "We accept most major insurance plans including Aetna, Blue Cross Blue Shield, Cigna, and Medicare Part D. You can enter your insurance information during checkout.";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return "Prices vary depending on the product and your insurance coverage. For prescription medications, the cost will be calculated after we receive your prescription details.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
            return "You can reach us by phone at (800) 555-1234, by email at help@elixirpharma.com, or visit our location at 123 Health Street, NY. Our team is available 24/7 to assist you.";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! I'm your virtual pharmacy assistant. How can I help you today?";
        } else {
            return "I'm sorry, I didn't understand your question. Could you please rephrase it or choose from these common questions: prescription refill, delivery options, product information, or talk to a pharmacist?";
        }
    }
    
    // Initial welcome message
    setTimeout(() => {
        addMessage("Hello! I'm your virtual pharmacy assistant. How can I help you today?", 'bot');
    }, 1000);
});