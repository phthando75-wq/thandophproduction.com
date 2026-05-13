// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// File upload handling
const musicFile = document.getElementById('musicFile');
const fileName = document.querySelector('.file-name');

if (musicFile) {
    musicFile.addEventListener('change', function(e) {
        const file = this.files[0];
        if (file) {
            const fileSize = file.size / (1024 * 1024); // Convert to MB
            const maxSize = 50;
            
            if (fileSize > maxSize) {
                alert(`File size must be less than ${maxSize}MB. Your file is ${fileSize.toFixed(2)}MB`);
                this.value = '';
                fileName.textContent = 'No file chosen';
                return;
            }
            
            fileName.textContent = file.name;
        }
    });
}

// Music upload form handling
document.getElementById('musicUploadForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const artistName = document.getElementById('artistName').value;
    const email = document.getElementById('email').value;
    const trackTitle = document.getElementById('trackTitle').value;
    const genre = document.getElementById('genre').value;
    const musicFile = document.getElementById('musicFile').files[0];
    const description = document.getElementById('description').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation
    if (!artistName || !email || !trackTitle || !genre || !musicFile || !terms) {
        alert('Please fill in all required fields and accept the terms');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // File size check
    const fileSize = musicFile.size / (1024 * 1024);
    if (fileSize > 50) {
        alert('File size must be less than 50MB');
        return;
    }
    
    // Check file type
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4'];
    if (!validTypes.includes(musicFile.type)) {
        alert('Please upload an MP3, WAV, or M4A file');
        return;
    }
    
    // Show success modal
    showModal();
    
    // Reset form
    this.reset();
    fileName.textContent = 'No file chosen';
});

// Contact form handling
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // For now, just show success message
    alert('Thank you for your message! We\'ll get back to you soon.');
    this.reset();
});

// Modal functions
function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}

// Close modal when clicking the X button
document.querySelector('.close')?.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active state to nav links
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section, header');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('🎵 DJy Thando PH Portfolio - Loaded');
