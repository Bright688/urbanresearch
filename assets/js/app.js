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

$(document).ready(function(){ 
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

$(document).ready(function(){
    const servicePrices = {
        academic_assistance: {
            pricePerPage: 10,
            subcategories: {
                Case_studies: { pricePerPage: 12 },
                Research_papers: { pricePerPage: 12 },
                Reports: { pricePerPage: 12 },
                Presentations: { pricePerPage: 12 },
                Project_proposals: { pricePerPage: 12 },
                Annotated_bibliographies: { pricePerPage: 12 },
                Literature_reviews: { pricePerPage: 12 },
                Data_analysis_assignments: { pricePerPage: 14 },
                Fieldwork_reports: { pricePerPage: 12 },
            },
        },
        personalized_writing_solutions: {
            pricePerPage: 14,
            subcategories: {
                Custom_essays: { pricePerPage: 10 },
                Personal_statements: { pricePerPage: 10 },
                Creative_writing: { pricePerPage: 10 },
                Business_plan: { pricePerPage: 12 },
                Marketing_plans: { pricePerPage: 12 },
                Web_contents: { pricePerPage: 10 },
                Newsletters: { pricePerPage: 10 },
                Speeches: { pricePerPage: 10 },
                Business_plan: { pricePerPage: 12 },
                Technical_documents: { pricePerPage: 12 },
                Grant_proposals: { pricePerPage: 12 },

            },
        },
        thesis_dissertation_support: {
            pricePerPage: 18,
            subcategories: {
                Proposal_development: { pricePerPage: 10 },
                Literature_review: { pricePerPage: 12 },
                Methodology: { pricePerPage: 10 },
                Data_analysis: { pricePerPage: 10 },
                Results_chapter: { pricePerPage: 10 },
                Discussion: { pricePerPage: 10 },
                Conclusion_and_recommendations: { pricePerPage: 10 },
                Editing_and_proofreading: { pricePerPage: 10 },
                Formatting: { pricePerPage: 10 },
            },
        },
        academic_coursework_assistance: {
            pricePerPage: 12,
            subcategories: {
                Essay_writing: { pricePerPage: 12 },
                Research_papers: { pricePerPage: 12 },
                Case_studies: { pricePerPage: 12 },
                Lab_reports: { pricePerPage: 12 },
                Presentations: { pricePerPage: 12 },
                Book_reviews: { pricePerPage: 12 },
                Annotated_biblographies: { pricePerPage: 10 },
                Course_projects: { pricePerPage: 12 },
                Group_assignments: { pricePerPage: 12 },
                Discussion_posts: { pricePerPage: 12 },
            },
        },
        professional_report_assistance: {
            pricePerPage: 16,
            subcategories: {
                Business_report: { pricePerPage: 10 },
                Technical_reports: { pricePerPage: 10 },
                Financial_reports: { pricePerPage: 10 },
                Project_reports: { pricePerPage: 10 },
                Market_research: { pricePerPage: 10 },
                Feasability: { pricePerPage: 10 },
                Annual_reports: { pricePerPage: 10 },
                Progress_reports: { pricePerPage: 10 },
                Environmental_impact_report: { pricePerPage: 10 },
            },
        },
        academic_essay_assistance: {
            pricePerPage: 11,
            subcategories: {
                Argumentative_essay: { pricePerPage: 10 },
                Descriptive_essay: { pricePerPage: 10 },
                Expository_essays: { pricePerPage: 10 },
                Narrative_essays: { pricePerPage: 10 },
                Persuasive_essays:  { pricePerPage: 10 },
                Comparative_essays: { pricePerPage: 10 },
                Analytical_essays: { pricePerPage: 10 },
                Cause_and_effect_essays: { pricePerPage: 10 },
                Critical_essays: { pricePerPage: 10 },
                Reflective_essays: { pricePerPage: 10 },
            },
        },
    };

    let exchangeRates = {
        USD: 1, // Default value for USD
    };

    const currencySymbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        AUD: 'A$',
        CAD: 'C$',
        JPY: '¥',
        INR: '₹',
        NGN: '₦',
    };

    // Function to fetch exchange rates for all specified currencies
    async function fetchExchangeRates() {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/2f58c223c4959e838ccc2c92/latest/USD`);
            const data = await response.json();

            // Map the exchange rates to the currency symbols
            exchangeRates = data.conversion_rates;

            populatePricingTable();
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
        }
    }

    // Function to populate pricing table
    function populatePricingTable() {
        const serviceSelect = document.getElementById('serviceSelect');
        const numPagesSelect = document.getElementById('numPages');
        const deadlineSelect = document.getElementById('deadlineDays');
        const currencySelect = document.getElementById('currencySelect');
        const pricingTable = document.getElementById('pricingTable').getElementsByTagName('tbody')[0];
    
        // Clear existing rows
        pricingTable.innerHTML = '';

        // Get selected values
        const selectedService = serviceSelect.value;
        const numPages = parseInt(numPagesSelect.value);
        const deadline = parseInt(deadlineSelect.value);
        const selectedCurrency = currencySelect.value;

        // Get the price per page in the selected currency
        const subcategories = servicePrices[selectedService].subcategories;
        const currencyRate = exchangeRates[selectedCurrency] || 1;
        const currencySymbol = currencySymbols[selectedCurrency] || '';

        // Calculate the price adjustment based on the deadline days
        

        // Deadline pricing adjustment logic
        let deadlineAdjustment = 0;

        if (deadline <= 3) {
            // If deadline is 1-3 days, increase price by 70%
            deadlineAdjustment = 1.7;
        } else if (deadline <= 6) {
            // If deadline is 4-6 days, increase price by 50%
            deadlineAdjustment = 1.5;
        } else if(deadline<=9){
            // If deadline is 9-6 days, increase price by 15%
            deadlineAdjustment = 1.15;
        }else if (deadline >= 10) {
            // If deadline is 10 and above days, use standard price (no change)
            deadlineAdjustment = 1;
        }
         
        

        // Iterate through subcategories and populate the table
        for (const [subcategory, details] of Object.entries(subcategories)) {
            const pricePerPage = details.pricePerPage;
            const totalPrice = deadlineAdjustment * pricePerPage * numPages * currencyRate;

            const row = document.createElement('tr');

            const serviceCell = document.createElement('td');
            serviceCell.classList.add('service-cell');
            serviceCell.textContent = subcategory.replace(/_/g, ' ');

            const pricePerPageCell = document.createElement('td');
            pricePerPageCell.textContent = `${currencySymbol}${(pricePerPage * currencyRate).toFixed(2)}`;

            const numPagesCell = document.createElement('td');
            numPagesCell.textContent = numPages;

            const deadlineCell = document.createElement('td');
            deadlineCell.textContent = `${deadline} Days`;

            const totalPriceCell = document.createElement('td');
            totalPriceCell.textContent = `${currencySymbol}${totalPrice.toFixed(2)}`;

            row.appendChild(serviceCell);
            row.appendChild(pricePerPageCell);
            row.appendChild(numPagesCell);
            row.appendChild(deadlineCell);
            row.appendChild(totalPriceCell);

            pricingTable.appendChild(row);
        }
    }

    
    $(document).ready(function(){
        const serviceSelect = document.getElementById('serviceSelect');
        const numPagesSelect = document.getElementById('numPages');
        const deadlineSelect = document.getElementById('deadlineDays');
        const currencySelect = document.getElementById('currencySelect');

        // Fetch exchange rates and populate the table after rates are fetched
        fetchExchangeRates();
        
        // Re-populate table on change of any inputs
        serviceSelect.addEventListener('change', populatePricingTable);
        numPagesSelect.addEventListener('change', populatePricingTable);
        deadlineSelect.addEventListener('change', populatePricingTable);
        currencySelect.addEventListener('change', populatePricingTable);
    });

    const serviceSelect = document.getElementById('id_service');
    const subServiceSelect = document.getElementById('id_sub_service');
    const numPagesInput = document.getElementById('id_num_pages');
    const deadlineDateInput = document.getElementById('id_deadline_date');
    const deadlineDaysInput = document.getElementById('id_deadline_days');
    const currencySelect = document.getElementById('id_currency');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const submitButton = document.getElementById('submitButton');
     
     

    async function fetchSubservices(service) {
        const response = await fetch(`/get-subservices/?service=${service}`);
        const data = await response.json();
        const subservices = data.subservices;

        subServiceSelect.innerHTML = '';
        subservices.forEach(([value, text]) => {
            const option = document.createElement('option');
            option.value = value;
            option.text = text;
            subServiceSelect.appendChild(option);
        });
    }

    function updateDeadlineDays() {
        const deadlineDate = new Date(deadlineDateInput.value);
        const today = new Date();
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        deadlineDaysInput.value = Math.max(diffDays, 0);
    }

    termsCheckbox.addEventListener('change', function() {
        submitButton.disabled = !termsCheckbox.checked;
    });

    // Initialize
    fetchSubservices(serviceSelect.value);

    $(document).ready(function(){
        // Function to update the subservice dropdown
        function updateSubserviceDropdown() {
            const serviceSelect = document.getElementById('id_service');
            const subserviceSelect = document.getElementById('id_sub_service');
            const selectedService = serviceSelect.value;

            // Clear out any existing options in the subservice dropdown
            subserviceSelect.innerHTML = '<option value="">Select a sub-service</option>';

            // If a service is selected and it has subcategories, populate subservice dropdown
            if (selectedService && servicePrices[selectedService]) {
                const subcategories = servicePrices[selectedService].subcategories;

                // Loop through subcategories and add options to subservice dropdown
                for (const subcategory in subcategories) {
                    const option = document.createElement('option');
                    option.value = subcategory;
                    option.textContent = subcategory.replace(/_/g, ' '); // Replace underscores with spaces for display
                    subserviceSelect.appendChild(option);
                }
            }
        }

        // Add event listener to the service dropdown to trigger subservice update
        document.getElementById('id_service').addEventListener('change', updateSubserviceDropdown);

        // Ensure subservices are updated on page load if a service is already selected
        window.addEventListener('load', updateSubserviceDropdown);
        
    });

    $(document).ready(function () {
        const serviceElement = document.getElementById('id_service');
        const subServiceElement = document.getElementById('id_sub_service');
        const numPagesElement = document.getElementById('id_num_pages');
        const currencyElement = document.getElementById('id_currency');
        
        const calculatedPriceElement = document.getElementById('calculatedPrice');
        const submitButton = document.getElementById('submitButton');
        const form = document.getElementById('orderForm');
        const termsCheckbox = document.getElementById('termsCheckbox');
         
        const deadlineInput = document.getElementById('id_deadline_date');
        const deadlineDaysField = document.getElementById('id_deadline_days'); // Hidden field for deadline days
        const displayDeadlineDays = document.getElementById('displayDeadlineDays'); // Visible field for showing the days
    
        // Function to calculate the difference in days between two dates
        function calculateDeadlineDays(selectedDate) {
            const currentDate = new Date(); // Current date
            const selected = new Date(selectedDate); // Selected deadline date
    
            // Calculate the difference in time
            const timeDiff = selected.getTime() - currentDate.getTime();
    
            // Convert time difference from milliseconds to days (rounding up)
            const diffInDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            
            return diffInDays > 0 ? diffInDays : 1; // Minimum of 1 day if past
            
        }

    
        // Function to update both the deadline days field and the visible display
        function updateDeadlineDays() {
            const selectedDate = deadlineInput.value;
    
            if (selectedDate) {
                var days = calculateDeadlineDays(selectedDate);
                
                deadlineDaysField.value = days;  // Update the hidden field (form)
                displayDeadlineDays.textContent = days;  // Update the visible span
                calculatePrice(days)
            }
        }

        

        // Calculate price based on selected service, sub-service, and number of pages
        function calculatePrice(days) {
            const service = serviceElement.value;
            const subService = subServiceElement.value;
            const numPages = parseInt(numPagesElement.value) || 0;
            const deadlineDate = new Date(document.getElementById('id_deadline_date').value);
            currency = currencyElement.value;
            // Default price to 0 if no valid service or sub-service is selected
            let pricePerPage = 0;

            // Check if the service exists in the servicePrices object
            if (service && servicePrices[service]) {
                // Check if a sub-service is selected and exists under the service
                if (subService && servicePrices[service].subcategories[subService]) {
                    // Use sub-service specific price
                    pricePerPage = servicePrices[service].subcategories[subService].pricePerPage;
                } else {
                    // Fallback to the base service price if no sub-service price is found
                    pricePerPage = servicePrices[service].pricePerPage;
                }
            }


            let deadline_adjustment = 1
            if (days <= 3){
               deadline_adjustment = 1.7
            }
            else if (days<=6){
               deadline_adjustment = 1.5
            }
                
            else if (days <= 9){
               deadline_adjustment = 1.15
            }
            
            
            // Calculate the total price based on the price per page and the number of pages
            let totalPrice = pricePerPage * numPages * deadline_adjustment;

            // Convert to selected currency
            var convertedPrice = totalPrice * exchangeRates[currency];

            // Handle NaN or invalid conversion result
            if (isNaN(convertedPrice)) {
                convertedPrice = 0; // Fallback to 0 if conversion fails
            }
            
            calculatedPriceElement.innerText = `${currencySymbols[currency]}${convertedPrice.toFixed(2)}`; // Update the text content
            
            payment(convertedPrice);
        }

        $(document).ready(function () {

            // Add event listeners
            serviceElement.addEventListener('change', function() { updateDeadlineDays(); });
            subServiceElement.addEventListener('change', function() { updateDeadlineDays(); });
            numPagesElement.addEventListener('input', function() { updateDeadlineDays(); });
            
            // Listen for changes in the currency field
            currencyElement.addEventListener('change', function() { updateDeadlineDays(); });
            
            // Listen for changes in the deadline date field
            deadlineInput.addEventListener('change', function() {
                updateDeadlineDays(); // Call the update function when the date changes
            });
            
            calculatePrice(days)
            
            // Initialize exchange rates
            fetchExchangeRates();
        });
        
        
    
        
        function payment(totalprice){
            const form = document.getElementById('orderForm');
            const submitButton = document.getElementById('submitButton');
            const paymentMethodSelect = document.querySelector('select[name="payment_method"]');
            const termsCheckbox = document.getElementById('termsCheckbox');
            // Select the total price element
            const totalPriceElement = document.getElementById('calculatedPrice'); // Correctly reference the total price element
            const currencyElement = document.getElementById('id_currency').value; // Get selected currency

            // Function to check if a payment method is selected and terms checkbox is checked
            function checkFormValidity() {
                const paymentMethodSelected = paymentMethodSelect.value !== '';
                const termsAccepted = termsCheckbox.checked;
        
                // Enable submit button if both payment method is selected and terms checkbox is checked
                submitButton.disabled = !(paymentMethodSelected && termsAccepted);
            }
        
            // Listen for changes in payment method dropdown and terms checkbox
            paymentMethodSelect.addEventListener('change', checkFormValidity);
            termsCheckbox.addEventListener('change', checkFormValidity);
        
            // Initial check on page load
            checkFormValidity();

            
            // Remove any non-numeric characters and get the numerical value of the total price
            let totalAmount = parseFloat(totalPriceElement.innerText.replace(/[^0-9.-]+/g,""));

            if (isNaN(totalAmount)) {
                alert("Unable to retrieve total amount. Please check the form.");
                return;
            }

            // Convert the totalAmount to the smallest unit for the selected currency
            if (currencyElement === 'NGN') {
                totalAmount = Math.round(totalAmount * 100); // Convert to kobo for NGN
            } else {
                // Keep the amount as-is for currencies where Paystack does not require conversion to the smallest unit
                totalAmount = Math.round(totalAmount);
            }
            // Handle form submission
            form.addEventListener('submit', function (e) {
                e.preventDefault(); // Prevent default submission
                if (!submitButton.disabled) {
                    // Determine the payment method selected
                    const selectedPaymentMethod = paymentMethodSelect.value;
        
                    // Redirect based on the selected payment method
                    if (selectedPaymentMethod === 'paystack') {
                        // Redirect based on the selected payment method
                        if (selectedPaymentMethod === 'paystack') {
                            // Calculate price and initiate Paystack
                            const email = document.getElementsByName("email")[0].value;
                            
                            let handler = PaystackPop.setup({
                                key: 'pk_test_47eb4974bbc5b6b27486fe4030560c501e1811c9',  // Use the Paystack public key from context
                                email: email,
                                amount: totalAmount,  // Amount in kobo
                                currency: currencyElement,
                                callback: function(response) {
                                    // Handle response and redirect to a verification URL with the reference
                                    window.location.href = "/payment/verify?reference=" + response.reference;
                                },
                                onClose: function() {
                                    alert('Transaction was not completed, window closed.');
                                }
                            });
                            handler.openIframe();  // Open Paystack payment modal
                        } else if (selectedPaymentMethod === 'crypto') {
                            window.location.href = '/order/proceed-to-payment/crypto'; // Redirect to Cryptocurrency
                        }
                    } else if (selectedPaymentMethod === 'crypto') {
                        window.location.href = '/order/proceed-to-payment/crypto'; // Redirect to Cryptocurrency
                    }
                }
            });
        }
    });

});

$(document).ready(function () {
    
});










    


