document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('DOMContentLoaded', function () {
        var toggler = document.querySelector('.navbar-toggler');
    
        toggler.addEventListener('click', function () {
            this.classList.toggle('open');
        });
    });
    
    
    const servicesDropdown = document.querySelector('#servicesDropdown');
    const arrowIcon = servicesDropdown.querySelector('.arrow-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    servicesDropdown.addEventListener('mouseover', function(event) {
        event.preventDefault();
        dropdownMenu.classList.toggle('show');
        arrowIcon.classList.toggle('rotate');
        servicesDropdown.classList.toggle('active');
        // Check media query
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        
        if (mediaQuery.matches) {
            // Apply white background and padding when the dropdown is shown and the viewport is above 768px
            if (dropdownMenu.classList.contains('show')) {
              
                servicesDropdown.style.fontWeight = '900';
                servicesDropdown.style.backgroundColor = 'rgb(200, 218, 217, 0.3)';
                servicesDropdown.style.color = 'black';

            } else {
                servicesDropdown.style.backgroundColor = '';
                servicesDropdown.style.padding = '';
            }
        } else {
            // Remove background and padding for smaller viewports
            servicesDropdown.style.backgroundColor = '';
            servicesDropdown.style.padding = '';
        }
        // Remove active class if dropdown is open
        if (dropdownMenu.classList.contains('show')) {
            servicesDropdown.classList.remove('active');
           
            
        } else {
            servicesDropdown.classList.add('active');
            servicesDropdown.style.backgroundColor = '';
        }
    });


    // Close dropdown if clicking outside the dropdown menu
    document.addEventListener('click', function(event) {
        if (!servicesDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            arrowIcon.classList.remove('rotate');
            servicesDropdown.classList.remove('active');
            servicesDropdown.style.backgroundColor = '';
        }
    });    

});

//Pricing Calculator
document.addEventListener('DOMContentLoaded', function() {
    const serviceType = document.querySelector('#serviceType');
    const numPages = document.querySelector('#numPages');
    const deadline = document.querySelector('#deadline');
    const totalPrice = document.querySelector('#totalPrice');

    // Base price per page in dollars
    const basePricePerPage = 6;

    // Deadline multipliers
    const deadlineMultiplier = {
        10: 1,
        9: 1.1,
        8: 1.2,
        7: 1.3,
        6: 1.4,
        5: 1.5,
        4: 1.6,
        3: 1.7,
        2: 1.8,
        1: 2
    };

    function calculateTotalPrice() {
        const pages = parseInt(numPages.value) || 0;
        const multiplier = deadlineMultiplier[parseInt(deadline.value)] || 1;
        const total = basePricePerPage * pages * multiplier;
        totalPrice.value = `$${total.toFixed(2)}`;
        console.log(total);
    }

    serviceType.addEventListener('change', calculateTotalPrice);
    numPages.addEventListener('change', calculateTotalPrice);
    deadline.addEventListener('change', calculateTotalPrice);
    
    //feature section animation
    const features = document.querySelectorAll('.feature');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    features.forEach(feature => {
        observer.observe(feature);
    });

    
});

//EXPERTS
document.addEventListener('DOMContentLoaded', function() {
    const experts = [
        { name: 'John Doe', field: 'Psychology', img: 'expert1.jpg' },
        { name: 'Jane Smith', field: 'Literature', img: 'expert2.jpg' },
        { name: 'Michael Johnson', field: 'Sociology', img: 'expert3.jpg' },
        { name: 'Sarah Williams', field: 'English', img: 'expert4.jpg' },
        { name: 'David Brown', field: 'Mathematics', img: 'expert5.jpg' },
        { name: 'Emily Davis', field: 'Physics', img: 'expert6.jpg' },
        { name: 'Robert Lee', field: 'Statistics', img: 'expert7.jpg' },
        { name: 'Mary Thompson', field: 'Chemistry', img: 'expert8.jpg' },
        { name: 'Andrew Robinson', field: 'Economics', img: 'expert9.jpg' },
        { name: 'Laura Garcia', field: 'Spanish', img: 'expert10.jpg' }
    ];
    const carousel = document.getElementById('expert-carousel');
            const totalSlides = experts.length;
            const slidesPerRow = 6;
            let currentIndex = 0;
            let autoSlideTimeout;

            // Function to create HTML for slides
            function createSlides() {
                let html = '';
                experts.forEach(expert => {
                    html += `
                        <div class="slide">
                            <div class="card text-center">
                                <img src="${expert.img}" class="card-img-top" alt="${expert.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${expert.name}</h5>
                                    <p class="card-text">${expert.field}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
                return html;
            }

            // Initial setup
            carousel.innerHTML = createSlides();

            // Function to slide carousel
            function slideCarousel(index) {
                const offset = -index * (100 / slidesPerRow) + '%';
                carousel.style.transform = `translateX(${offset})`;
                currentIndex = index;
                resetAutoSlide();
            }

            // Auto slide functionality
            function autoSlide() {
                currentIndex = (currentIndex + 1) % totalSlides;
                slideCarousel(currentIndex);
            }

            function resetAutoSlide() {
                clearTimeout(autoSlideTimeout);
                autoSlideTimeout = setTimeout(autoSlide, 5000);
            }

            // Event listeners for buttons
            document.getElementById('prev-btn').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                slideCarousel(currentIndex);
            });

            document.getElementById('next-btn').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalSlides;
                slideCarousel(currentIndex);
            });

            // Start auto sliding
            resetAutoSlide();
 });

 //statistics
 $(document).ready(function() {
    // Init ScrollMagic controller
    var controller = new ScrollMagic.Controller();

    // Loop through each statistic
    $('.statistic').each(function() {
        var tween = gsap.fromTo(this, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 });

        // Create a scene for each statistic
        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.8,  // Adjust as needed
            reverse: false
        })
        .setTween(tween)
        .addTo(controller);
    });

    // Function to animate numbers
    function animateNumbers(targetElement, startValue, endValue, duration) {
        $({value: startValue}).animate({value: endValue}, {
            duration: duration,
            easing: 'swing',
            step: function() {
                $(targetElement).text(Math.ceil(this.value));
            }
        });
    }

    // Call the function to animate numbers on page load
    animateNumbers('#order-completed', 0, 21694, 3000); // 3 seconds duration
    animateNumbers('#happy-clients', 0, 18606, 2500);   // 2.5 seconds duration
    animateNumbers('#returning-ratio', 0, 92, 2000);    // 2 seconds duration
}); 

$$(document).ready(function(){
    $('.testimonial-carousel').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});