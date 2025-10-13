document.addEventListener('DOMContentLoaded', function() {
    // Photo upload functionality
    const photoInput = document.getElementById('photoInput');
    const uploadPhotoBtn = document.getElementById('uploadPhoto');
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    
    uploadPhotoBtn.addEventListener('click', function() {
        photoInput.click();
    });
    
    photoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                // Replace placeholder with image
                const img = document.createElement('img');
                img.src = event.target.result;
                img.className = 'photo-preview';
                img.alt = 'Profile Photo';
                
                photoPlaceholder.parentNode.replaceChild(img, photoPlaceholder);
                
                // Add click event to change photo
                img.addEventListener('click', function() {
                    photoInput.click();
                });
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Download CV as PDF
    const downloadBtn = document.getElementById('downloadCV');
    
    downloadBtn.addEventListener('click', function() {
        // Show payment modal (in a real app, this would redirect to payment gateway)
        if (confirm('To download your CV, you need to complete the payment of ₹499. Proceed to payment?')) {
            // In a real app, you would redirect to payment gateway here
            // For demo, we'll proceed with download
            
            // Temporarily hide controls for clean PDF
            const controls = document.querySelector('.controls');
            controls.style.display = 'none';
            
            // Generate PDF
            const element = document.querySelector('.cv-container');
            const opt = {
                margin: 10,
                filename: 'professional-cv.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            html2pdf().set(opt).from(element).save().then(() => {
                // Show controls again
                controls.style.display = 'flex';
                
                alert('CV downloaded successfully! Thank you for your purchase.');
            });
        }
    });
    
    // Reset CV to default
    const resetBtn = document.getElementById('resetCV');
    
    resetBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all changes?')) {
            // Reset all editable fields to their original content
            const defaultContent = {
                'name': 'John Doe',
                'title': 'Software Engineer',
                'email': 'johndoe@example.com',
                'phone': '+1 183-456-7890',
                'website': 'portfolio.example.com',
                'linkedin': 'linkedin.com/in/johndoe',
                'about': 'Passionate Software Engineer with 3 years of experience in full stack development. Skilled in scalable web applications, delivering seamless user experiences. Adept at cross-functional collaboration and leveraging modern tech stacks to solve real-world problems.',
                'skill1': 'JavaScript',
                'skill2': 'React',
                'skill3': 'Node.js',
                'skill4': 'Python',
                'skill5': 'AWS',
                'lang1': 'English',
                'lang2': 'Spanish',
                'job1-title': 'Software Engineer',
                'job1-date': 'Jun 2020 – Present',
                'job1-desc1': 'Designed and implemented user features using React and Node.js',
                'job1-desc2': 'Collaborated with design & QA teams to deliver high-impact features',
                'job1-desc3': 'Optimized API performance, reducing latency by 23%',
                'job2-title': 'Web Developer',
                'job2-date': 'Jul 2018 – May 2020',
                'job2-desc1': 'Developed responsive web applications using HTML, CSS and JavaScript',
                'job2-desc2': 'Improved API performance by 15%',
                'edu1-degree': 'Bachelor of Computer Science',
                'edu1-school': 'University of Technology',
                'edu1-date': '2014 - 2018',
                'cert1': 'AWS Certified Developer - Associate',
                'cert2': 'Google Data Analytics Certificate'
            };
            
            // Apply default content to all editable fields
            document.querySelectorAll('.editable').forEach(field => {
                const fieldName = field.getAttribute('data-field');
                if (defaultContent[fieldName]) {
                    field.textContent = defaultContent[fieldName];
                }
            });
            
            // Reset photo if changed
            const photoPreview = document.querySelector('.photo-preview');
            if (photoPreview) {
                photoPreview.parentNode.replaceChild(photoPlaceholder, photoPreview);
            }
            
            alert('CV has been reset to default content.');
        }
    });
    
    // Auto-save functionality (local storage)
    function saveToLocalStorage() {
        const cvData = {};
        document.querySelectorAll('.editable').forEach(field => {
            const fieldName = field.getAttribute('data-field');
            cvData[fieldName] = field.textContent;
        });
        
        // Save photo if exists
        const photoPreview = document.querySelector('.photo-preview');
        if (photoPreview) {
            cvData.photo = photoPreview.src;
        }
        
        localStorage.setItem('cvData', JSON.stringify(cvData));
    }
    
    function loadFromLocalStorage() {
        const savedData = localStorage.getItem('cvData');
        if (savedData) {
            const cvData = JSON.parse(savedData);
            
            // Load text content
            document.querySelectorAll('.editable').forEach(field => {
                const fieldName = field.getAttribute('data-field');
                if (cvData[fieldName]) {
                    field.textContent = cvData[fieldName];
                }
            });
            
            // Load photo if saved
            if (cvData.photo && photoPlaceholder) {
                const img = document.createElement('img');
                img.src = cvData.photo;
                img.className = 'photo-preview';
                img.alt = 'Profile Photo';
                
                photoPlaceholder.parentNode.replaceChild(img, photoPlaceholder);
                
                // Add click event to change photo
                img.addEventListener('click', function() {
                    photoInput.click();
                });
            }
        }
    }
    
    // Auto-save when user edits any field
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('editable')) {
            saveToLocalStorage();
        }
    });
    
    // Load saved data on page load
    loadFromLocalStorage();
    
    // Add some interactivity to skill tags
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('skill-tag')) {
            e.target.contentEditable = true;
            e.target.focus();
        }
    });
});