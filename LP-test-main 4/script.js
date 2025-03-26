document.addEventListener('DOMContentLoaded', function() {
    // AOSの初期化
    AOS.init({
        duration: 800,
        once: true
    });

    // ヘッダーのスクロール制御
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // 下スクロール
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // 上スクロール
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // スクロールトップボタン
    const scrollTopButton = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // FAQのアコーディオン
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // 他のFAQを閉じる
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                }
            });
            
            // クリックされたFAQの開閉
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
}); 

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;
    let autoScrollInterval; // 自動スクロール用の変数を追加

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // 自動スクロールを開始する関数
    function startAutoScroll() {
        // 2秒(2000ミリ秒)ごとに次のスライドへ移動
        autoScrollInterval = setInterval(nextSlide, 2000);
    }

    // 自動スクロールを停止する関数
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    nextButton.addEventListener('click', () => {
        nextSlide();
        // ユーザーがボタンをクリックしたら一時的に自動スクロールを停止し、再開する
        stopAutoScroll();
        startAutoScroll();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        // ユーザーがボタンをクリックしたら一時的に自動スクロールを停止し、再開する
        stopAutoScroll();
        startAutoScroll();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showSlide(currentIndex);
            // ユーザーがドットをクリックしたら一時的に自動スクロールを停止し、再開する
            stopAutoScroll();
            startAutoScroll();
        });
    });

    // スライダーにマウスが乗ったら自動スクロールを停止（オプション）
    const slider = document.querySelector('.slider-container'); // スライダーのコンテナ要素
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);
    }

    showSlide(currentIndex);
    startAutoScroll(); // ページ読み込み時に自動スクロールを開始
});

