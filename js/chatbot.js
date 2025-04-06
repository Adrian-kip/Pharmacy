// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    // Toggle chatbot visibility
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', function() {
            chatbotContainer.classList.toggle('active');
        });
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
        });
    }
    
    // Initial bot message
    function showInitialMessage() {
        addBotMessage("Hello! I'm your pharmacy assistant. How can I help you today? Here are some things you can ask me:");
        
        // Add quick questions
        const quickQuestions = document.createElement('div');
        quickQuestions.className = 'quick-questions';
        quickQuestions.innerHTML = `
            <button class="quick-question">What are your operating hours?</button>
            <button class="quick-question">Do you deliver to my area?</button>
            <button class="quick-question">Can I order prescription medication?</button>
        `;
        chatbotMessages.appendChild(quickQuestions);
        
        // Add event listeners to quick questions
        document.querySelectorAll('.quick-question').forEach(button => {
            button.addEventListener('click', function() {
                const question = this.textContent;
                addUserMessage(question);
                this.remove();
                handleUserMessage(question);
            });
        });
    }
    
    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'chatbot-message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function addBotMessage(content) {
        addMessage(content, false);
    }
    
    function addUserMessage(content) {
        addMessage(content, true);
    }
    
    // Handle user messages
    function handleUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple response logic - can be expanded with more sophisticated NLP
        if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
            setTimeout(() => {
                addBotMessage("We're open Monday to Sunday from 8:00 AM to 10:00 PM. You can reach us anytime via WhatsApp at +254 799 250 399.");
            }, 500);
        } 
        else if (lowerMessage.includes('deliver') || lowerMessage.includes('area') || lowerMessage.includes('location')) {
            setTimeout(() => {
                addBotMessage("We offer same-day delivery in Nairobi for orders placed before 2PM, and nationwide delivery within 48 hours. Could you let me know your location so I can check exact delivery times?");
            }, 500);
        }
        else if (lowerMessage.includes('prescription') || lowerMessage.includes('medication') || lowerMessage.includes('drug')) {
            setTimeout(() => {
                addBotMessage("Yes, we can fulfill prescription medication orders. You can upload your prescription during checkout or send it to us via WhatsApp at +254 799 250 399. Our licensed pharmacists will review it before processing your order.");
            }, 500);
        }
        else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            setTimeout(() => {
                addBotMessage("Our prices are competitive and we regularly offer discounts. Delivery fee is KSh 200 within Nairobi. You can browse our products on the Products page for specific pricing.");
            }, 500);
        }
        else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
            setTimeout(() => {
                addBotMessage("You can reach us at:\n\nPhone: +254 799 250 399\nEmail: larkiptech@gmail.com\nWhatsApp: +254 799 250 399\n\nWe're available 24/7 for your health inquiries.");
            }, 500);
        }
        else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
            setTimeout(() => {
                addBotMessage("Hello! How can I assist you with your health and medication needs today?");
            }, 500);
        }
        else {
            setTimeout(() => {
                addBotMessage("I'm sorry, I didn't understand that. Could you please rephrase your question? Or you can contact our support team directly via WhatsApp at +254 799 250 399 for immediate assistance.");
            }, 500);
        }
    }
    
    // Send message when button is clicked
    if (chatbotSend) {
        chatbotSend.addEventListener('click', function() {
            const message = chatbotInput.value.trim();
            if (message) {
                addUserMessage(message);
                chatbotInput.value = '';
                handleUserMessage(message);
            }
        });
    }
    
    // Send message when Enter is pressed
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = chatbotInput.value.trim();
                if (message) {
                    addUserMessage(message);
                    chatbotInput.value = '';
                    handleUserMessage(message);
                }
            }
        });
    }
    
    // Show initial message when chatbot is opened
    if (chatbotContainer) {
        chatbotContainer.addEventListener('click', function(e) {
            if (e.target === this && chatbotMessages.children.length === 0) {
                showInitialMessage();
            }
        });
        
        // Also show initial message when toggle is clicked
        if (chatbotToggle) {
            chatbotToggle.addEventListener('click', function() {
                if (chatbotContainer.classList.contains('active') && chatbotMessages.children.length === 0) {
                    showInitialMessage();
                }
            });
        }
    }
    
    // Add some styles for quick questions
    const style = document.createElement('style');
    style.textContent = `
        .quick-questions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 15px;
        }
        
        .quick-question {
            background-color: rgba(42, 127, 186, 0.1);
            border: 1px solid rgba(42, 127, 186, 0.3);
            color: var(--primary-color);
            padding: 8px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
        }
        
        .quick-question:hover {
            background-color: rgba(42, 127, 186, 0.2);
        }
    `;
    document.head.appendChild(style);
});