document.addEventListener('DOMContentLoaded', function () {
    // --- 1. LANGUAGE TRANSLATION DATA (Unchanged) ---
    const translations = {
        brandName: { en: 'Kitchen<span>Pulse</span>', bn: 'কিচেন<span>পালস</span>', ar: 'مطبخ<span>نبض</span>' },
        navHome: { en: 'Home', bn: 'হোম', ar: 'الرئيسية' },
        navServices: { en: 'Services', bn: 'সেবা', ar: 'خدماتنا' },
        navGallery: { en: 'Gallery', bn: 'গ্যালারি', ar: 'المعرض' },
        navReviews: { en: 'Reviews', bn: 'মতামত', ar: 'الآراء' },
        navContact: { en: 'Contact', bn: 'যোগাযোগ', ar: 'اتصل بنا' },
        headline: { en: 'Your Dream Modern Kitchen is Now Within Reach', bn: 'আপনার স্বপ্নের আধুনিক কিচেন এখন আপনার হাতের নাগালে', ar: 'مطبخ أحلامك الحديث الآن في متناول يدك' },
        subheadline: { en: 'We provide modern modular kitchens, cabinets, and all types of kitchen appliance services in Tabuk, Saudi Arabia. Our service is unique in its combination of quality, design, and price.', bn: 'আমরা সৌদি আরবের তাবুক শহরে আধুনিক ডিজাইনের মডুলার কিচেন, কিচেন ক্যাবিনেট, ও সকল ধরনের কিচেন অ্যাপ্লায়েন্স সার্ভিস দিয়ে থাকি। মান, ডিজাইন ও দামের সমন্বয়ে আমাদের সেবা অনন্য।', ar: 'نحن نقدم خدمات المطابخ الحديثة، وخزائن المطبخ، وجميع أنواع أجهزة المطبخ في مدينة تبوك بالمملكة العربية السعودية. خدمتنا فريدة من نوعها في الجمع بين الجودة والتصميم والسعر.' },
        ctaButton: { en: '📞 Contact Us Now — Give Your Kitchen a New Look!', bn: '📞 এখনই যোগাযোগ করুন — আপনার কিচেনকে নতুন রূপ দিন!', ar: '📞 اتصل الآن - امنح مطبخك مظهرًا جديدًا!' },
        servicesTitle: { en: 'Our Services', bn: 'আমাদের সেবা', ar: 'خدماتنا' },
        service1: { en: 'Modular Kitchen Design & Installation', bn: 'মডুলার কিচেন ডিজাইন ও ইনস্টলেশন', ar: 'تصميم وتركيب المطابخ الحديثة' },
        service2: { en: 'Kitchen Cabinet & Drawer Design', bn: 'কিচেন ক্যাবিনেট ও ড্রয়ার ডিজাইন', ar: 'تصميم خزائن وأدراج المطبخ' },
        service3: { en: 'Hood, Stove & Appliance Installation', bn: 'হুড, চুলা ও অ্যাপ্লায়েন্স ইনস্টলেশন', ar: 'تركيب الشفاطات والمواقد والأجهزة' },
        service4: { en: 'Appliance Sales & Service', bn: 'অ্যাপ্লায়েন্স বিক্রয় ও সার্ভিস', ar: 'بيع وخدمة الأجهزة' },
        service5: { en: 'Old Kitchen Renovation', bn: 'পুরাতন কিচেন সংস্কার', ar: 'تجديد المطابخ القديمة' },
        service6: { en: 'Free Design Consultation', bn: 'বিনামূল্যে ডিজাইন পরামর্শ', ar: 'استشارة تصميم مجانية' },
        callNowButton: { en: '📞 Call Now for a Free Consultation', bn: '📞 বিনামূল্যে পরামর্শের জন্য এখনই কল করুন', ar: '📞 اتصل الآن للحصول على استشارة مجانية' },
        galleryTitle: { en: 'Gallery', bn: 'গ্যালারি', ar: 'المعرض' },
        reviewsTitle: { en: 'What Our Customers Say', bn: 'গ্রাহক মতামত', ar: 'آراء العملاء' },
        review1Text: { en: '"They completely redesigned my home kitchen. Great work!"', bn: '"আমার বাড়ির কিচেন নতুনভাবে সাজিয়ে দিয়েছে। দারুণ কাজ!"', ar: '"لقد أعادوا تصميم مطبخ منزلي بالكامل. عمل رائع!"' },
        review1Author: { en: '– Fatima, Tabuk', bn: '– ফাতিমা, তাবুক', ar: '– فاطمة، تبوك' },
        review2Text: { en: '"Finished the work on time and the design is outstanding."', bn: '"সময়ের মধ্যে কাজ শেষ করেছে এবং ডিজাইন অসাধারণ।"', ar: '"أنهوا العمل في الوقت المحدد والتصميم رائع."' },
        review2Author: { en: '– Ahmed, Tabuk', bn: '– আহমেদ, তাবুক', ar: '– أحمد، تبوك' },
        review3Text: { en: '"Very professional team and high-quality materials. Highly recommended."', bn: '"খুব পেশাদার দল এবং উচ্চ মানের উপকরণ। অত্যন্ত সুপারিশ করছি।"', ar: '"فريق محترف للغاية ومواد عالية الجودة. موصى به للغاية."' },
        review3Author: { en: '– Aisha, Tabuk', bn: '– আয়েশা, তাবুক', ar: '– عائشة، تبوك' },
        addReviewTitle: { en: 'Add Your Review', bn: 'আপনার মতামত দিন', ar: 'أضف رأيك' },
        formName: { en: 'Name', bn: 'নাম', ar: 'الاسم' },
        formLocation: { en: 'Location (e.g., Tabuk)', bn: 'অবস্থান (যেমন, তাবুক)', ar: 'الموقع (مثال: تبوك)' },
        formRating: { en: 'Rating', bn: 'রেটিং', ar: 'التقييم' },
        formReview: { en: 'Review', bn: 'মতামত', ar: 'مراجعتك' },
        formPhoto: { en: 'Upload a Photo', bn: 'ছবি আপলোড করুন', ar: 'تحميل صورة' },
        formSubmit: { en: 'Submit Review', bn: 'মতামত জমা দিন', ar: 'إرسال المراجعة' },
        contactFormTitle: { en: 'Send Us a Request', bn: 'আমাদের একটি অনুরোধ পাঠান', ar: 'أرسل لنا طلباً' },
        formPlaceholderName: { en: 'Your Name', bn: 'আপনার নাম', ar: 'اسمك' },
        formPlaceholderEmail: { en: 'Your Professional Email', bn: 'আপনার প্রফেশনাল ইমেইল', ar: 'بريدك الإلكتروني الاحترافي' },
        formPlaceholderMessage: { en: 'Tell us about your project goals...', bn: 'আপনার প্রকল্পের লক্ষ্য সম্পর্কে আমাদের বলুন...', ar: 'أخبرنا عن أهداف مشروعك...' },
        formButtonSend: { en: 'SEND REQUEST', bn: 'অনুরোধ পাঠান', ar: 'إرسال الطلب' },
        aboutTitle: { en: 'About Us', bn: 'আমাদের সম্পর্কে', ar: 'من نحن' },
        aboutText: { en: 'We are "International Kitchen Service – Tabuk", working on modern kitchen design, appliances, and installation in Tabuk, Saudi Arabia. Customer satisfaction is our first priority. We do every job with honesty, skill, and love.', bn: 'আমরা "International Kitchen Service – Tabuk" সৌদি আরবের তাবুক শহরে আধুনিক কিচেন ডিজাইন, অ্যাপ্লায়েন্স ও ইনস্টলেশন নিয়ে কাজ করি। গ্রাহকের সন্তুষ্টি আমাদের প্রথম অগ্রাধিকার। প্রতিটি কাজ আমরা করি সততা, দক্ষতা ও ভালোবাসা দিয়ে।', ar: 'نحن "خدمة المطابخ الدولية - تبوك"، نعمل في تصميم المطابخ الحديثة والأجهزة والتركيب في تبوك بالمملكة العربية السعودية. رضا العملاء هو أولويتنا الأولى. نقوم بكل عمل بأمانة ومهارة وحب.' },
        contactLocation: { 
            en: '🏢 <strong>Location:</strong> Harez Market, Tabuk, Saudi Arabia', 
            bn: '🏢 <strong>লোকেশন:</strong> হারেয মার্কেট, তাবুক, সৌদি আরব', 
            ar: '🏢 <strong>الموقع:</strong> سوق حريز، تبوك، المملكة العربية السعودية' 
        },
        contactMobile: {
            en: '📱 <strong>Mobile:</strong> <a href="tel:+966571165463">+96 6571165463</a>',
            bn: '📱 <strong>মোবাইল:</strong> <a href="tel:+966571165463">+96 6571165463</a>',
            ar: '📱 <strong>الجوال:</strong> <a href="tel:+966571165463" dir="ltr">+96 6571165463</a>'
        },
        contactWhatsapp: {
            en: '🟢 <strong>WhatsApp:</strong> <a href="https://wa.me/+966571165463" target="_blank">+96 6571165463</a>',
            bn: '🟢 <strong>WhatsApp:</strong> <a href="https://wa.me/+966571165463" target="_blank">+96 6571165463</a>',
            ar: '🟢 <strong>واتساب:</strong> <a href="https://wa.me/+966571165463" target="_blank" dir="ltr">+96 6571165463</a>'
        },
        contactEmail: {
            en: '📧 <strong>Email:</strong> <a href="mailto:mdh058278@gmail.com">mdh058278@gmail.com</a>',
            bn: '📧 <strong>ইমেইল:</strong> <a href="mailto:mdh058278@gmail.com">mdh058278@gmail.com</a>',
            ar: '📧 <strong>البريد الإلكتروني:</strong> <a href="mailto:mdh058278@gmail.com">mdh058278@gmail.com</a>'
        },
        contactHours: { en: '⏰ <strong>Service:</strong> 24/7', bn: '⏰ <strong>সার্ভিস:</strong> ২৪/৭', ar: '⏰ <strong>الخدمة:</strong> 24/7' },
    };

    // --- 2. LANGUAGE SWITCHER (Unchanged) ---
    const langButtons = document.querySelectorAll('.language-switcher button');
    window.changeLanguage = function(lang) {
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.body.classList.toggle('ar', lang === 'ar');
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[key] && translations[key][lang]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[key][lang];
                } else if (el.tagName === 'BUTTON') {
                    el.innerHTML = translations[key][lang];
                } else {
                    el.innerHTML = translations[key][lang];
                }
            }
        });
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.textContent.toLowerCase().startsWith(lang));
        });
    }
    
    // --- 3. SMOOTH SCROLL & ACTIVE NAV LINK (Unchanged) ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.content-section');
    const navbarHeight = 70;
    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 50;
            if (window.scrollY >= sectionTop) { current = section.getAttribute('id'); }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) { link.classList.add('active'); }
        });
    });
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) { window.scrollTo({ top: targetElement.offsetTop - navbarHeight, behavior: 'smooth' }); }
        });
    });
    
    // --- 4. DYNAMIC FORM HANDLING (Bugs fixed previously) ---
    const reviewForm = document.getElementById('reviewForm');
    const contactForm = document.getElementById('contactForm');
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.getElementById('rating');
    const photoInput = document.getElementById('photo');
    const imagePreview = document.getElementById('image-preview');

    function showNotification(message, status) {
        const notification = document.getElementById('notification-popup');
        if (!notification) return;
        notification.textContent = message;
        notification.classList.remove('success', 'error');
        notification.classList.add(status);
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const value = star.getAttribute('data-value');
                ratingInput.value = value;
                stars.forEach(s => { s.classList.toggle('selected', s.getAttribute('data-value') <= value); });
            });
        });
    }

    if (photoInput) {
        photoInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => { imagePreview.src = e.target.result; };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    function addNewReview(reviewData) {
        const reviewsGrid = document.getElementById('reviews-grid');
        if (!reviewsGrid) return;
        const newReviewCard = document.createElement('div');
        newReviewCard.className = 'review-card';
        const photoSrc = reviewData.photo_path ? reviewData.photo_path : 'https://i.pravatar.cc/80';
        const starsHTML = '★'.repeat(reviewData.rating) + '☆'.repeat(5 - reviewData.rating);
        newReviewCard.innerHTML = `
            <img src="${photoSrc}" alt="${reviewData.name}">
            <div>
                <div class="review-stars">${starsHTML}</div>
                <p>"${reviewData.review_text}"</p>
                <b>– ${reviewData.name}, ${reviewData.location}</b>
            </div>
        `;
        reviewsGrid.prepend(newReviewCard);
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch('form_handler.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
                return response.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    showNotification(data.message, data.status);
                    if (data.status === 'success') {
                        addNewReview(data.review);
                        reviewForm.reset();
                        if(imagePreview) imagePreview.src = '';
                        stars.forEach(s => s.classList.remove('selected'));
                        ratingInput.value = 0;
                    }
                } catch (e) {
                    console.error('Failed to parse JSON response:', text);
                    showNotification('An error occurred. Check console.', 'error');
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                showNotification('An unexpected error occurred.', 'error');
            });
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            fetch('form_handler.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
                return response.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    showNotification(data.message, data.status);
                    if (data.status === 'success') {
                        contactForm.reset();
                    }
                } catch (e) {
                    console.error('Failed to parse JSON response:', text);
                    showNotification('An error occurred. Check console.', 'error');
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                showNotification('An unexpected error occurred.', 'error');
            });
        });
    }

    // --- 5. DYNAMIC GALLERY LOGIC (Unchanged) ---
    // --- !! CACHE-BUSTING FIX IS HERE !! ---
    function populateGallery(galleryData) {
        const videoContainer = document.querySelector('.video-slider-container');
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!videoContainer || !galleryGrid) {
            console.error('Gallery containers not found!');
            return;
        }

        videoContainer.innerHTML = '';
        galleryGrid.querySelectorAll('img').forEach(img => img.remove());
        
        const cacheBuster = '?v=' + new Date().getTime(); // Create a unique timestamp

        const keys = Object.keys(galleryData);
        keys.forEach(key => {
            const path = galleryData[key];
            if (key.startsWith('video_')) {
                const video = document.createElement('video');
                video.src = path + cacheBuster; // Add cache-buster
                video.controls = true;
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                videoContainer.appendChild(video);
            } else if (key.startsWith('image_')) {
                const img = document.createElement('img');
                img.src = path + cacheBuster; // Add cache-buster
                img.alt = "Kitchen Gallery Image";
                galleryGrid.appendChild(img);
            }
        });

        initializeVideoSlider();
    }
    // --- END OF CACHE-BUSTING FIX ---

    function initializeVideoSlider() {
        const videoContainer = document.querySelector('.video-slider-container');
        const videoSlides = document.querySelectorAll('.video-slider-container video');
        const prevBtn = document.getElementById('video-prev');
        const nextBtn = document.getElementById('video-next');

        if (videoContainer && videoSlides.length > 0 && prevBtn && nextBtn) {
            let currentVideoIndex = 0;
            function showVideo(index) {
                videoSlides.forEach((video, i) => {
                    video.pause();
                    video.currentTime = 0;
                    if (i === index) {
                        video.play().catch(error => {
                            console.warn("Autoplay was prevented for video " + index, error);
                        });
                    }
                });
                videoContainer.style.transform = `translateX(-${index * 100}%)`;
            }
            nextBtn.addEventListener('click', () => {
                currentVideoIndex = (currentVideoIndex + 1) % videoSlides.length;
                showVideo(currentVideoIndex);
            });
            prevBtn.addEventListener('click', () => {
                currentVideoIndex = (currentVideoIndex - 1 + videoSlides.length) % videoSlides.length;
                showVideo(currentVideoIndex);
            });
            showVideo(0);
        }
    }

    // --- !! CACHE-BUSTING FIX #2 IS HERE !! ---
    // We also add a cache-buster to the data fetch itself
    fetch('get_data.php?t=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                populateGallery(data.gallery);
            } else {
                console.error('Failed to load gallery:', data.message);
            }
        })
        .catch(error => console.error('Error fetching gallery:', error));
    // --- END OF CACHE-BUSTING FIX ---

    // --- 6. SET DEFAULT LANGUAGE (Unchanged) ---
    changeLanguage('ar');
});