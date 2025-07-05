// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotIcon = document.querySelector('.chatbot-icon');
    const chatbotPopup = document.getElementById('chatbot-popup');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const chatMessages = document.getElementById('chatbot-messages');
    const typingIndicator = document.getElementById('typing-indicator');
    const chatbotWidget = document.getElementById('chatbot');

    // Welcome message
    const welcomeMessage = {
        delay: 500,
        messages: [
            "👋 Hello! Welcome to the Indian Museums Guide.",
            "I'm your virtual assistant, here to help you discover India's rich cultural heritage.",
            "You can ask me about museum locations, timings, ticket prices, or any specific exhibits!"
        ]
    };

    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator.classList.add('active');
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.classList.remove('active');
    }

    // Add message to chat
    function addMessage(sender, text, isDelayed = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
        
        if (isDelayed) {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        } else {
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Show welcome messages
    function showWelcomeMessages() {
        welcomeMessage.messages.forEach((message, index) => {
            setTimeout(() => {
                addMessage('bot', message, true);
            }, welcomeMessage.delay * (index + 1));
        });
    }

    // Toggle chatbot
    chatbotIcon.addEventListener('click', () => {
        console.log('Chatbot icon clicked'); // Debugging line
        const isActive = chatbotPopup.classList.contains('active');
        chatbotPopup.classList.toggle('active');
        
        console.log('Chatbot popup active state:', !isActive); // Debugging line
        if (!isActive) {
            showWelcomeMessages();
        }
        
        // Toggle minimized state
        chatbotWidget.classList.toggle('minimized', !isActive);
    });

    closeChat.addEventListener('click', () => {
        chatbotPopup.classList.remove('active');
    });

    // Enable/disable send button based on input
    chatInput.addEventListener('input', () => {
        console.log('Input changed:', chatInput.value); // Debugging line
        sendMessage.disabled = !chatInput.value.trim();
    });

    // Send message function
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('user', message);
            chatInput.value = '';
            sendMessage.disabled = true;
            
            // Simulate bot response
            showTypingIndicator();
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                hideTypingIndicator();
                addMessage('bot', botResponse);
            }, 1000);
        }
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendChatMessage);

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && chatInput.value.trim()) {
            e.preventDefault();
            sendChatMessage();
        }
    });

    // Get bot response
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('ticket') || message.includes('price') || message.includes('cost')) {
            return "🎫 Ticket prices vary by museum:\n\n" +
                   "• National Museums: ₹20 for Indians, ₹500 for foreigners\n" +
                   "• Science Museums: ₹30 for adults, ₹15 for children\n" +
                   "• Art Galleries: ₹10-50 depending on exhibitions\n\n" +
                   "Many museums offer student discounts and free entry for children under 5!";
        }
        else if (message.includes('timing') || message.includes('hours') || message.includes('open')) {
            return "⏰ Most museums operate on these timings:\n\n" +
                   "• Tuesday to Sunday: 10:00 AM - 5:00 PM\n" +
                   "• Closed on Mondays and national holidays\n" +
                   "• Last entry: 1 hour before closing\n\n" +
                   "Some museums may have special hours during peak season or festivals.";
        }
        else if (message.includes('location') || message.includes('address') || message.includes('where')) {
            return "🗺️ Please specify which museum you're interested in, and I'll provide:\n\n" +
                   "• Exact location and landmarks\n" +
                   "• Nearest public transport options\n" +
                   "• Parking availability\n" +
                   "• Recommended route from your location";
        }
        else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "👋 Hello! How can I help you explore India's museums today?";
        }
        else if (message.includes('exhibit') || message.includes('collection') || message.includes('display')) {
            return "🖼️ Our museums house incredible collections! Which interests you?\n\n" +
                   "• Ancient artifacts and archaeology\n" +
                   "• Modern and contemporary art\n" +
                   "• Science and technology\n" +
                   "• Cultural heritage\n\n" +
                   "Let me know your preference for specific details!";
        }
        else if (message.includes('guide') || message.includes('tour')) {
            return "🎯 We offer several tour options:\n\n" +
                   "• Self-guided tours with audio guides\n" +
                   "• Expert-led group tours (2 hours)\n" +
                   "• Customized private tours\n" +
                   "• Virtual tours for select exhibitions\n\n" +
                   "Would you like more information about any of these?";
        }
        else {
            return "I'm here to help you discover Indian museums! You can ask about:\n\n" +
                   "• Ticket prices and timings\n" +
                   "• Museum locations and directions\n" +
                   "• Current exhibitions\n" +
                   "• Guided tours\n" +
                   "• Facilities and accessibility";
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll animation for museum cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.museum-card').forEach(card => {
        observer.observe(card);
    });

    let currentSlide = 0;

    function changeSlide(direction) {
        const slides = document.querySelectorAll('.slide');
        slides[currentSlide].classList.remove('active'); // Remove active class from current slide

        currentSlide += direction; // Update current slide index

        // Loop back to the first slide if at the end
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        // Loop back to the last slide if at the beginning
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        slides[currentSlide].classList.add('active'); // Add active class to new current slide
        const offset = -currentSlide * 100; // Calculate offset for sliding effect
        document.querySelector('.slides').style.transform = `translateX(${offset}%)`; // Apply transform
    }

    // FAQ Dropdown Functionality
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            // Toggle the active class
            item.classList.toggle('active');

            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                // Set the max-height to the scrollHeight to allow for smooth transition
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                // Reset max-height to 0 when not active
                answer.style.maxHeight = 0;
            }
        });
    });
}); 
