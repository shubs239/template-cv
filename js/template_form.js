let currentStep = 1;
const totalSteps = 6;

function updateProgress() {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
            step.querySelector('.step-number').classList.remove('bg-secondary');
            step.querySelector('.step-number').classList.add('bg-primary');
        } else {
            step.classList.remove('active');
            step.querySelector('.step-number').classList.remove('bg-primary');
            step.querySelector('.step-number').classList.add('bg-secondary');
        }
    });
}

function nextSection(step) {
    // Validate current section
    if (!validateSection(step)) {
        alert("Please fill all required fields before proceeding.");
        return;
    }

    document.getElementById(`section-${step}`).classList.add('d-none');
    currentStep++;
    document.getElementById(`section-${currentStep}`).classList.remove('d-none');
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevSection(step) {
    document.getElementById(`section-${step}`).classList.add('d-none');
    currentStep--;
    document.getElementById(`section-${currentStep}`).classList.remove('d-none');
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateSection(step) {
    let isValid = true;

    switch(step) {
        case 1: // Contact
            const name = document.getElementById('name').value.trim();
            const designation = document.getElementById('designation').value.trim();
            const linkedin = document.getElementById('linkedin').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const headshot = document.getElementById('headshot').files[0];

            if (!name || !designation || !linkedin || !email || !phone || !headshot) {
                isValid = false;
            }
            break;

        case 2: // About
            const about = document.getElementById('about').value.trim();
            if (!about) isValid = false;
            break;

        case 3: // Education
            const educationItems = document.querySelectorAll('.education-item');
            educationItems.forEach(item => {
                const school = item.querySelector('.edu-school').value.trim();
                const degree = item.querySelector('.edu-degree').value.trim();
                const year = item.querySelector('.edu-year').value.trim();
                if (!school || !degree || !year) isValid = false;
            });
            break;

        case 4: // Experience
            const experienceItems = document.querySelectorAll('.experience-item');
            experienceItems.forEach(item => {
                const company = item.querySelector('.exp-company').value.trim();
                const title = item.querySelector('.exp-title').value.trim();
                const start = item.querySelector('.exp-start').value.trim();
                const end = item.querySelector('.exp-end').value.trim();
                const desc = item.querySelector('.exp-desc').value.trim();
                if (!company || !title || !start || !end || !desc) isValid = false;
            });
            break;

        case 5: // Skills
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                const name = item.querySelector('.skill-name').value.trim();
                const level = item.querySelector('.skill-level').value;
                if (!name || !level) isValid = false;
            });
            break;

        case 6: // Languages
            const languageItems = document.querySelectorAll('.language-item');
            languageItems.forEach(item => {
                const name = item.querySelector('.lang-name').value.trim();
                const level = item.querySelector('.lang-level').value;
                if (!name || !level) isValid = false;
            });
            break;
    }

    return isValid;
}

function addEducation() {
    const list = document.getElementById('education-list');
    const newItem = document.createElement('div');
    newItem.className = 'education-item mb-3 p-3 border rounded';
    newItem.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label">College/University Name *</label>
                <input type="text" class="form-control edu-school" placeholder="University of Technology" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Degree *</label>
                <input type="text" class="form-control edu-degree" placeholder="Bachelor of Computer Science" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Year of Completion *</label>
                <input type="number" class="form-control edu-year" placeholder="2018" min="1900" max="2030" required>
            </div>
            <div class="col-md-6 d-flex align-items-end">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeItem(this)">Remove</button>
            </div>
        </div>
    `;
    list.appendChild(newItem);
}

function addExperience() {
    const list = document.getElementById('experience-list');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item mb-3 p-3 border rounded';
    newItem.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label">Company / Project Name *</label>
                <input type="text" class="form-control exp-company" placeholder="ABC Corp" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Role / Title *</label>
                <input type="text" class="form-control exp-title" placeholder="Software Engineer" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Start Year *</label>
                <input type="number" class="form-control exp-start" placeholder="2020" min="1900" max="2030" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">End Year (or "Present")</label>
                <input type="text" class="form-control exp-end" placeholder="2023 or Present" required>
            </div>
            <div class="col-12">
                <label class="form-label">Description (max 200 words) *</label>
                <textarea class="form-control exp-desc" rows="3" placeholder="Designed and implemented user features using React and Node.js..." maxlength="200" required></textarea>
            </div>
            <div class="col-12 d-flex align-items-end">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeItem(this)">Remove</button>
            </div>
        </div>
    `;
    list.appendChild(newItem);
}

function addSkill() {
    const list = document.getElementById('skills-list');
    const newItem = document.createElement('div');
    newItem.className = 'skill-item mb-3 p-3 border rounded';
    newItem.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label">Skill Name *</label>
                <input type="text" class="form-control skill-name" placeholder="JavaScript" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Proficiency</label>
                <select class="form-select skill-level">
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                </select>
            </div>
            <div class="col-12 d-flex align-items-end">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeItem(this)">Remove</button>
            </div>
        </div>
    `;
    list.appendChild(newItem);
}

function addLanguage() {
    const list = document.getElementById('languages-list');
    const newItem = document.createElement('div');
    newItem.className = 'language-item mb-3 p-3 border rounded';
    newItem.innerHTML = `
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label">Language Name *</label>
                <input type="text" class="form-control lang-name" placeholder="English" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Proficiency</label>
                <select class="form-select lang-level">
                    <option value="">Select Level</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                </select>
            </div>
            <div class="col-12 d-flex align-items-end">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeItem(this)">Remove</button>
            </div>
        </div>
    `;
    list.appendChild(newItem);
}

function removeItem(button) {
    button.closest('.education-item, .experience-item, .skill-item, .language-item').remove();
}

function previewImage(input) {
    const originalPreview = document.getElementById('original-preview');
    const uploadInstructions = document.getElementById('upload-instructions');
    const uploadedImage = document.getElementById('uploaded-image');
    const file = input.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // Hide upload instructions
            if (uploadInstructions) {
                uploadInstructions.style.display = 'none';
                uploadInstructions.style.setProperty('display', 'none', 'important');
                // console.log(uploadInstructions.style.getPropertyValue('display'));
            }
            
            // Show uploaded image
            if (uploadedImage) {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block';
            }
        };
        
        reader.readAsDataURL(file);
    } else {
        // Reset to upload instructions
        if (uploadInstructions) {
            uploadInstructions.style.display = 'flex';
        }
        if (uploadedImage) {
            uploadedImage.style.display = 'none';
        }
    }
}

function submitForm() {
    // Collect all data
    const formData = {
        name: document.getElementById('name').value.trim(),
        designation: document.getElementById('designation').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        about: document.getElementById('about').value.trim(),
        education: [],
        experience: [],
        skills: [],
        languages: []
    };

    // Get Education
    document.querySelectorAll('.education-item').forEach(item => {
        formData.education.push({
            school: item.querySelector('.edu-school').value.trim(),
            degree: item.querySelector('.edu-degree').value.trim(),
            year: item.querySelector('.edu-year').value.trim()
        });
    });

    // Get Experience
    document.querySelectorAll('.experience-item').forEach(item => {
        formData.experience.push({
            company: item.querySelector('.exp-company').value.trim(),
            title: item.querySelector('.exp-title').value.trim(),
            start: item.querySelector('.exp-start').value.trim(),
            end: item.querySelector('.exp-end').value.trim(),
            desc: item.querySelector('.exp-desc').value.trim()
        });
    });

    // Get Skills
    document.querySelectorAll('.skill-item').forEach(item => {
        formData.skills.push({
            name: item.querySelector('.skill-name').value.trim(),
            level: item.querySelector('.skill-level').value
        });
    });

    // Get Languages
    document.querySelectorAll('.language-item').forEach(item => {
        formData.languages.push({
            name: item.querySelector('.lang-name').value.trim(),
            level: item.querySelector('.lang-level').value
        });
    });

    // Log for testing
    console.log(formData);

    // Here you can send data to backend or generate PDF
    alert("Form submitted successfully! Now generating your CV...");
    
    // In real app, you'd call a Python function to generate PDF
}

// Initialize
updateProgress();

function saveFormData() {
    // Collect all form data
    const formData = {
        name: document.getElementById('name').value,
        designation: document.getElementById('designation').value,
        portfolio: document.getElementById('portfolio').value,
        linkedin: document.getElementById('linkedin').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        about: document.getElementById('about').value,
        education: [],
        experience: [],
        skills: [],
        languages: []
    };

    // Get Education
    document.querySelectorAll('.education-item').forEach(item => {
        formData.education.push({
            school: item.querySelector('.edu-school').value,
            degree: item.querySelector('.edu-degree').value,
            year: item.querySelector('.edu-year').value
        });
    });

    // Get Experience
    document.querySelectorAll('.experience-item').forEach(item => {
        formData.experience.push({
            company: item.querySelector('.exp-company').value,
            title: item.querySelector('.exp-title').value,
            start: item.querySelector('.exp-start').value,
            end: item.querySelector('.exp-end').value,
            desc: item.querySelector('.exp-desc').value
        });
    });

    // Get Skills
    document.querySelectorAll('.skill-item').forEach(item => {
        formData.skills.push({
            name: item.querySelector('.skill-name').value,
            level: item.querySelector('.skill-level').value
        });
    });

    // Get Languages
    document.querySelectorAll('.language-item').forEach(item => {
        formData.languages.push({
            name: item.querySelector('.lang-name').value,
            level: item.querySelector('.lang-level').value
        });
    });

    // Save to session storage
    sessionStorage.setItem('cvData', JSON.stringify(formData));
    
    // Redirect to cart
    window.location.href = '/cart.html';
}