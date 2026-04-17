// Interactivity and Data Rendering for Aura Beauty

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const heroContent = document.querySelector('.hero-content');
    
    // 1. Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Hero entrance animation
    if (heroContent) {
        setTimeout(() => {
            const elements = heroContent.querySelectorAll('h1, p, .hero-cta');
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    // 3. Scroll Reveal Observer
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 4. Render Products Function with Filtering
    function renderProducts(categoryFilter = 'all') {
        const grid = document.getElementById('new-arrivals-grid');

        if (!grid || typeof products === 'undefined') return;

        grid.innerHTML = '';
        
        const filteredProducts = categoryFilter === 'all' 
            ? products 
            : products.filter(p => p.category === categoryFilter);

        filteredProducts.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <div class="product-img" style="background-image: url('${p.image}')"></div>
                <div class="product-info-minimal">
                    <h3>${p.name}</h3>
                    <p class="price">${p.price}</p>
                    <p style="font-size: 0.85rem; color: #777; margin: 1rem 0;">${p.description.substring(0, 60)}...</p>
                    <a href="product.html?id=${p.id}" class="btn btn-outline" style="padding: 0.7rem 1.5rem; font-size: 0.9rem; margin: 0;">عرض التفاصيل</a>
                </div>
            `;

            grid.appendChild(card);
            
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.8s ease-out';
            observer.observe(card);
        });
    }

    renderProducts();

    // 4.1. Category Card Click Handling
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            if (cat) {
                renderProducts(cat);
                // Scroll to products section
                document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 5. Observe static elements
    document.querySelectorAll('.category-card, .about-content, .about-image, .tip-card, #contact form, #contact > div:last-child').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // 6. AI Chatbot Logic
    const chatToggle = document.getElementById('ai-chat-toggle');
    const chatWindow = document.getElementById('ai-chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendButton = document.getElementById('send-chat');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggle) {
        chatToggle.addEventListener('click', () => {
            chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        });

        closeChat.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });

        const addMessage = (text, isUser = false) => {
            const msg = document.createElement('div');
            msg.style.cssText = `
                background: ${isUser ? 'var(--accent-color)' : 'white'};
                color: ${isUser ? 'white' : 'var(--text-main)'};
                padding: 1rem 1.5rem;
                border-radius: ${isUser ? '15px 15px 0 15px' : '15px 15px 15px 0'};
                align-self: ${isUser ? 'flex-end' : 'flex-start'};
                max-width: 85%;
                font-size: 0.95rem;
                box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                margin-bottom: 0.5rem;
            `;
            msg.innerText = text;
            chatMessages.appendChild(msg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const getAIResponse = (userText) => {
            const input = userText.toLowerCase();
            if (input.includes('بشرة') || input.includes('سيروم') || input.includes('ترطيب')) {
                return `لدينا مجموعة رائعة من منتجات العناية بالبشرة. أرشح لكِ "سيروم النضارة الفائق" فهو الأكثر مبيعاً لدينا. هل تودين معرفة المزيد عنه؟`;
            } else if (input.includes('مكياج') || input.includes('أحمر شفاه')) {
                return `تشكيلة المكياج لدينا تتميز بجودتها العالية ومكوناتها الطبيعية. هل تفضلين الألوان الهادئة أم الجريئة؟`;
            } else if (input.includes('سعر') || input.includes('بكم')) {
                return `تبدأ أسعارنا من 32$ (ما يعادل 46,000 د.ع) وتصل إلى 85$. هل هناك منتج محدد ترغبين بمعرفة سعره بالدقيق؟`;
            } else if (input.includes('توصيل') || input.includes('شحن')) {
                return `نوفر شحنًا مجانيًا للطلبات فوق 300 ر.س، ويستغرق التوصيل عادةً 2-4 أيام عمل.`;
            } else if (input.includes('شكرا')) {
                return `على الرحب والسعة! يسعدنا دائماً خدمتكِ في أورا بيوتي. ✨`;
            } else {
                return `سؤال رائع! لكي أستطيع مساعدتكِ بشكل أفضل، هل تبحثين عن روتين للعناية اليومية أم منتجات لمناسبة خاصة؟`;
            }
        };

        const handleSend = () => {
            const text = chatInput.value.trim();
            if (text) {
                addMessage(text, true);
                chatInput.value = '';
                setTimeout(() => {
                    addMessage(getAIResponse(text));
                }, 1000);
            }
        };

        sendButton.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    // 7. Global Cart Logic
    const cartIcon = document.getElementById('cart-icon');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotal = document.getElementById('cart-total');

    let cart = JSON.parse(localStorage.getItem('aura_cart')) || [];

    function updateCartUI() {
        if (!cartItemsList) return;
        
        cartItemsList.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p style="text-align: center; color: #999; margin-top: 2rem;">السلة فارغة حالياً</p>';
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div style="flex: 1;">
                        <h4 style="font-size: 0.9rem;">${item.name}</h4>
                        <p style="font-size: 0.8rem; color: var(--accent-color);">${item.price} × ${item.quantity}</p>
                    </div>
                    <span onclick="removeFromCart(${index})" style="cursor: pointer; color: #ff4d4d; font-size: 1.2rem;">✕</span>
                `;
                cartItemsList.appendChild(itemDiv);
                
                // Extraction of numeric price (simplified for demo)
                const priceNum = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
                total += priceNum * item.quantity;
                count += parseInt(item.quantity);
            });
        }

        cartCount.innerText = count;
        cartTotal.innerText = total.toLocaleString() + ' د.ع/تقريباً';
        localStorage.setItem('aura_cart', JSON.stringify(cart));
    }

    window.addToCart = function(product, quantity = 1) {
        const existing = cart.find(p => p.id === product.id);
        if (existing) {
            existing.quantity = parseInt(existing.quantity) + parseInt(quantity);
        } else {
            cart.push({ ...product, quantity: parseInt(quantity) });
        }
        updateCartUI();
        openCart();
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.style.display = 'block';
    }

    function toggleCart() {
        cartDrawer.classList.toggle('open');
        cartOverlay.style.display = cartOverlay.style.display === 'block' ? 'none' : 'block';
    }

    if (cartIcon) cartIcon.addEventListener('click', toggleCart);
    if (closeCart) closeCart.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // Initial load
    updateCartUI();

    // Hook into product page add button if on that page
    const pageAddToCartBtn = document.getElementById('add-to-cart-btn');
    if (pageAddToCartBtn && typeof productId !== 'undefined') {
        pageAddToCartBtn.addEventListener('click', () => {
            const product = products.find(p => p.id == productId);
            const qty = document.getElementById('quantity-input').value;
            if (product) addToCart(product, qty);
        });
    }
});
