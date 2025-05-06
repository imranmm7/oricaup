// Add this to your existing script.js
document.addEventListener("DOMContentLoaded", function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Load gallery data
    fetch('gallery.json')
        .then(response => response.json())
        .then(data => {
            const galleryGrid = document.querySelector('.gallery-grid');
            data.forEach(item => {
                galleryGrid.innerHTML += `
                    <div class="gallery-item">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                `;
            });
        });

    // Load downloads data
    fetch('downloads.json')
        .then(response => response.json())
        .then(data => {
            const downloadsGrid = document.querySelector('.downloads-grid');
            data.forEach(item => {
                downloadsGrid.innerHTML += `
                    <div class="download-item">
                        <div class="download-info">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                        </div>
                        <a href="${item.file}" class="download-link" download>Download</a>
                    </div>
                `;
            });
        });

    // calls-news slider code:
    fetch('calls-news.json')
        .then(response => response.json())
        .then(data => {
            const callsList = document.querySelector('.calls-list');
            data.forEach(item => {
                callsList.innerHTML += `
                <div class="call-item">
                    <div class="call-date">${item.date}</div>
                    <h3 class="call-title">${item.title}</h3>
                    <p class="call-description">${item.description}</p>
                    ${item.link ? `<a href="${item.link}" class="call-link">Read more →</a>` : ''}
                </div>
            `;
            });
        });

});




//loading content from content.json
document.addEventListener("DOMContentLoaded", function () {
    fetch("content.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("about-intro-text").textContent = data.about_intro || "o data available";
            document.getElementById("introduction-text").textContent = data.introduction || "No data available";
            document.getElementById("mission-text").textContent = data.mission || "No data available";
            document.getElementById("vision-text").textContent = data.vision || "No data available";
        })
        .catch(error => console.error("Error loading JSON:", error));
});


//news section
// News Slider
let currentNewsIndex = 0;
let newsInterval;

fetch('news.json')
    .then(response => response.json())
    .then(data => {
        const slider = document.getElementById('news-slider');
        const dotsContainer = document.getElementById('news-dots');

        // Create slides
        data.forEach((item, index) => {
            const imageContent = item.image
                ? `<img src="${item.image}" alt="${item.title}">`
                : `<div class="no-image">ORIC</div>`;

            slider.innerHTML += `
        <div class="news-slide">
          <div class="news-slide-image">
            ${imageContent}
          </div>
          <div class="news-slide-content">
            <h3 class="news-slide-title">${item.title}<span class="news-slide-date">(${item.date})</span></h3>
            <p class="news-slide-summary">${item.summary}</p>
          </div>
        </div>
      `;

            // Create dots
            dotsContainer.innerHTML += `
        <div class="news-dot" data-index="${index}"></div>
      `;
        });

        const slides = document.querySelectorAll('.news-slide');
        const dots = document.querySelectorAll('.news-dot');

        // Initialize
        updateSlider();

        // Auto-rotate
        newsInterval = setInterval(nextNews, 5000);

        // Button controls
        document.querySelector('.news-prev').addEventListener('click', prevNews);
        document.querySelector('.news-next').addEventListener('click', nextNews);

        // Dot controls
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentNewsIndex = parseInt(dot.dataset.index);
                updateSlider();
                resetInterval();
            });
        });

        function nextNews() {
            currentNewsIndex = (currentNewsIndex + 1) % slides.length;
            updateSlider();
        }

        function prevNews() {
            currentNewsIndex = (currentNewsIndex - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function updateSlider() {
            slider.scrollTo({
                left: currentNewsIndex * slider.offsetWidth,
                behavior: 'smooth'
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentNewsIndex);
            });
        }

        function resetInterval() {
            clearInterval(newsInterval);
            newsInterval = setInterval(nextNews, 5000);
        }
    });




// Load Contacts
fetch('contacts.json')
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('contact-grid');

        // Team members
        data.team.forEach(contact => {
            grid.innerHTML += `
        <div class="contact-card">
          <img src="${contact.image}" alt="${contact.name}">
          <h3>${contact.name}</h3>
          <p><strong>Designation:</strong> ${contact.designation}</p>
          <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>
        </div>
      `;
        });

        // General contact
        const general = data.general;
        document.querySelector('.oric-contact').innerHTML = `
      <h3>General Contact</h3>
      <p>${general.description}</p>
      <p><strong>Email:</strong> <a href="mailto:${general.email}">${general.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${general.phone}">${general.phone}</a></p>
    `;
    })
    .catch(error => console.error('Error loading contacts:', error));


//funding links part
fetch('funding-links.json')
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('funding-grid');
        data.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.name;
            a.className = 'funding-link';
            a.target = '_blank'; // open in new tab
            grid.appendChild(a);
        });
    })
    .catch(error => {
        console.error('Error loading funding links:', error);
    });


// Load Policies (runs on index.html)
fetch('policies.json')
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('policy-grid');
        data.forEach(policy => {
            grid.innerHTML += `
        <div class="policy-card">
          <h4>${policy.title}</h4>
          <div class="policy-content">
            <p>${policy.summary}</p>
          </div>
          <a href="${policy.link}" class="download-btn" target="_blank">Download</a>
        </div>
      `;
        });
    })
    .catch(error => console.error('Error loading policies:', error));


// Load Collaborations
fetch('collaborations.json')
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('collab-grid');
        data.forEach(item => {
            grid.innerHTML += `
        <div class="collab-card">
          <h4>${item.type}</h4>
          <div class="collab-content">
            <p>${item.description}</p>
          </div>
          <!-- Removed button since no links exist -->
        </div>
      `;
        });
    })


// Modify service cards to trigger unified form
fetch('services.json')
    .then(response => response.json())
    .then(data => {
        const grid = document.getElementById('services-grid');
        data.forEach(service => {
            grid.innerHTML += `
        <div class="service-card">
          <h4>${service.title}</h4>
          <p>${service.description}</p>
          <button class="service-btn" data-service="${service.form_id}">Request Service</button>
        </div>
      `;
        });

        // Unified form handler
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default button behavior
                // Reset the form before showing it
                document.getElementById('unified-service-form').reset();
                // Explicitly reset textarea dimensions
                const textarea = document.getElementById('details');
                textarea.style.height = '40px'; // Match your CSS height
                textarea.style.width = ''; // Reset width if needed
                // Set the service type
                document.getElementById('service-type').value = btn.dataset.service;
                // Show the form
                document.getElementById('service-request').classList.remove('hidden');
            });
        });

        // Add close functionality (optional but recommended)
        document.querySelector('.close-btn').addEventListener('click', function() {
            // Reset the form
            //document.getElementById('unified-service-form').reset();
            // Hide the form
            document.getElementById('service-request').classList.add('hidden');
        });


        //submit service button

        document.getElementById('unified-service-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('.submit-btn');

            // Disable button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Internet check
            if (!navigator.onLine) {
                alert('No internet connection! Please connect and try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Request';
                return;
            }

            try {
                // Submit via fetch first for real verification
                const response = await fetch('https://formsubmit.co/ajax/mimran@aup.edu.pk', {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                const result = await response.json();

                if (result.success) {
                    //alert('Submitted! Check your email for confirmation.');
                    //form.submit();
                    resetFormToDefaults();
                    document.getElementById('service-request').classList.add('hidden');
                    window.location.href = form.querySelector('[name="_next"]').value;



                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                alert(`Error: ${error.message}. Please email mimran@aup.edu.pk directly.`);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Request';
            }
        });




        // Form reset function
        function resetFormToDefaults() {
            const form = document.getElementById('unified-service-form');
            form.reset();
            document.getElementById('details').style.height = '120px';
        }

    });

