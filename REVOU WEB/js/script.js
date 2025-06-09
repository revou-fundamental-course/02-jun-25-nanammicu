// JavaScript functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Update active navigation link on scroll
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-link');
                
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= (sectionTop - 200)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            });

            // Ask for user name and display welcome message
            setTimeout(function() {
                const userName = prompt('Siapa nama Anda?');
                if (userName && userName.trim() !== '') {
                    document.getElementById('userName').textContent = userName;
                }
            }, 1000);
        });

        // Form validation
        function validateForm() {
            let isValid = true;
            
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });

            // Validate name
            const name = document.getElementById('name').value.trim();
            if (name === '') {
                document.getElementById('nameError').textContent = 'Nama tidak boleh kosong';
                isValid = false;
            } else if (name.length < 2) {
                document.getElementById('nameError').textContent = 'Nama minimal 2 karakter';
                isValid = false;
            }

            // Validate email
            const email = document.getElementById('email').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                document.getElementById('emailError').textContent = 'Email tidak boleh kosong';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Format email tidak valid';
                isValid = false;
            }

            // Validate phone
            const phone = document.getElementById('phone').value.trim();
            const phoneRegex = /^[0-9+\-\s()]+$/;
            if (phone === '') {
                document.getElementById('phoneError').textContent = 'Nomor telepon tidak boleh kosong';
                isValid = false;
            } else if (!phoneRegex.test(phone) || phone.length < 10) {
                document.getElementById('phoneError').textContent = 'Nomor telepon tidak valid (minimal 10 digit)';
                isValid = false;
            }

            // Validate message
            const message = document.getElementById('message').value.trim();
            if (message === '') {
                document.getElementById('messageError').textContent = 'Pesan tidak boleh kosong';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Pesan minimal 10 karakter';
                isValid = false;
            }

            return isValid;
        }

        // Handle form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Get form data
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    phone: document.getElementById('phone').value.trim(),
                    message: document.getElementById('message').value.trim()
                };

                // Display submitted data
                displaySubmittedData(formData);
                
                // Reset form
                this.reset();
                
                // Show success message
                alert('Terima kasih! Pesan Anda telah berhasil dikirim.');
            }
        });

        // Display submitted form data
        function displaySubmittedData(data) {
            const submissionDisplay = document.getElementById('submissionDisplay');
            const submittedData = document.getElementById('submittedData');
            
            submittedData.innerHTML = `
                <div style="background: white; padding: 1rem; border-radius: 5px; margin-bottom: 1rem;">
                    <p><strong>Nama:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Telepon:</strong> ${data.phone}</p>
                    <p><strong>Pesan:</strong> ${data.message}</p>
                </div>
            `;
            
            submissionDisplay.style.display = 'block';
            submissionDisplay.scrollIntoView({ behavior: 'smooth' });
        }

        // Close submission display
        function closeSubmissionDisplay() {
            document.getElementById('submissionDisplay').style.display = 'none';
        }

        // Add real-time validation
        document.getElementById('name').addEventListener('blur', function() {
            const name = this.value.trim();
            const errorElement = document.getElementById('nameError');
            
            if (name === '') {
                errorElement.textContent = 'Nama tidak boleh kosong';
            } else if (name.length < 2) {
                errorElement.textContent = 'Nama minimal 2 karakter';
            } else {
                errorElement.textContent = '';
            }
        });

        document.getElementById('email').addEventListener('blur', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const errorElement = document.getElementById('emailError');
            
            if (email === '') {
                errorElement.textContent = 'Email tidak boleh kosong';
            } else if (!emailRegex.test(email)) {
                errorElement.textContent = 'Format email tidak valid';
            } else {
                errorElement.textContent = '';
            }
        });

        document.getElementById('phone').addEventListener('blur', function() {
            const phone = this.value.trim();
            const phoneRegex = /^[0-9+\-\s()]+$/;
            const errorElement = document.getElementById('phoneError');
            
            if (phone === '') {
                errorElement.textContent = 'Nomor telepon tidak boleh kosong';
            } else if (!phoneRegex.test(phone) || phone.length < 10) {
                errorElement.textContent = 'Nomor telepon tidak valid (minimal 10 digit)';
            } else {
                errorElement.textContent = '';
            }
        });

        document.getElementById('message').addEventListener('blur', function() {
            const message = this.value.trim();
            const errorElement = document.getElementById('messageError');
            
            if (message === '') {
                errorElement.textContent = 'Pesan tidak boleh kosong';
            } else if (message.length < 10) {
                errorElement.textContent = 'Pesan minimal 10 karakter';
            } else {
                errorElement.textContent = '';
            }
        });