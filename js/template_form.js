window.currentStep = 1;
const totalSteps = 6;

function updateProgress() {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 <= window.currentStep) {
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
    // Only proceed if validation passes
    if (!validateSection(step)) {
        // Don't show alert — errors are already displayed on screen
        return;
    }

    document.getElementById(`section-${step}`).classList.add('d-none');
    window.currentStep++;
    document.getElementById(`section-${window.currentStep}`).classList.remove('d-none');
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevSection(step) {
    document.getElementById(`section-${step}`).classList.add('d-none');
    window.currentStep--;
    document.getElementById(`section-${window.currentStep}`).classList.remove('d-none');
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateSection(step) {
    let isValid = true;
    const section = document.getElementById(`section-${step}`);

    // Clear all previous errors in this section
    const errorMessages = section.querySelectorAll('.error-message');
    errorMessages.forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });

    // Validate based on section
    switch(step) {
        case 1: // Contact Details
            // Name validation
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                const error = name.nextElementSibling;
                error.textContent = 'Name is required';
                error.style.display = 'block';
                isValid = false;
            }

            // Current Designation validation
            const designation = document.getElementById('designation');
            if (!designation.value.trim()) {
                const error = designation.nextElementSibling;
                error.textContent = 'Current Designation is required';
                error.style.display = 'block';
                isValid = false;
            }

            // LinkedIn URL validation
            // const linkedin = document.getElementById('linkedin');
            // if (!linkedin.value.trim()) {
            //     const error = linkedin.nextElementSibling;
            //     error.textContent = 'LinkedIn URL is required';
            //     error.style.display = 'block';
            //     isValid = false;
            // }

            // Email validation
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                const error = email.nextElementSibling;
                error.textContent = 'Email is required';
                error.style.display = 'block';
                isValid = false;
            }

            // Phone Number validation
            const phone = document.getElementById('phone');
            if (!phone.value.trim()) {
                const error = phone.nextElementSibling;
                error.textContent = 'Phone Number is required';
                error.style.display = 'block';
                isValid = false;
            }

            // Headshot validation
            // const headshot = document.getElementById('headshot');
            // if (!headshot.files.length) {
            //     const error = headshot.parentElement.querySelector('.error-message');
            //     error.textContent = 'Photo upload is required';
            //     error.style.display = 'block';
            //     isValid = false;
            // }
            // ----  NEW photo rule : fresh file OR already-stored base64 ----
                const headshot = document.getElementById('headshot');
                const hasPhoto = headshot.files.length > 0 || sessionStorage.getItem('cvPhoto');
                if (!hasPhoto) {
                    const error = headshot.parentElement.querySelector('.error-message');
                    error.textContent = 'Photo upload is required';
                    error.style.display = 'block';
                    isValid = false;
}
            break;

        case 2: // About/Summary
            const about = document.getElementById('about');
            if (!about.value.trim()) {
                const error = about.nextElementSibling;
                error.textContent = 'About/Summary is required';
                error.style.display = 'block';
                isValid = false;
            }
            break;

        case 3: // Education
            const educationItems = section.querySelectorAll('.education-item');
            educationItems.forEach(item => {
                const school = item.querySelector('.edu-school');
                const degree = item.querySelector('.edu-degree');
                const year = item.querySelector('.edu-year');

                if (school && !school.value.trim()) {
                    const error = school.nextElementSibling;
                    error.textContent = 'College/University Name is required';
                    error.style.display = 'block';
                    isValid = false;
                }
                if (degree && !degree.value.trim()) {
                    const error = degree.nextElementSibling;
                    error.textContent = 'Degree is required';
                    error.style.display = 'block';
                    isValid = false;
                }
                if (year && !year.value.trim()) {
                    const error = year.nextElementSibling;
                    error.textContent = 'Year of Completion is required';
                    error.style.display = 'block';
                    isValid = false;
                }
            });
            break;

        case 4: // Experience
            const experienceItems = section.querySelectorAll('.experience-item');
            experienceItems.forEach(item => {
                const company = item.querySelector('.exp-company');
                const title = item.querySelector('.exp-title');
                const start = item.querySelector('.exp-start');
                const end = item.querySelector('.exp-end');
                const desc = item.querySelector('.exp-desc');

                if (company && !company.value.trim()) {
                    const error = company.nextElementSibling;
                    error.textContent = 'Company/Project Name is required';
                    error.style.display = 'block';
                    isValid = false;
                }
                if (title && !title.value.trim()) {
                    const error = title.nextElementSibling;
                    error.textContent = 'Role/Title is required';
                    error.style.display = 'block';
                    isValid = false;
                }
                if (start && !start.value.trim()) {
                    const error = start.nextElementSibling;
                    error.textContent = 'Start Year is required';
                    error.style.display = 'block';
                    isValid = false;
                }
                if (end && !end.value.trim()) {
                    const error = end.nextElementSibling;
                    error.textContent = 'End Year is required';
                    error.style.display = 'block';
                    isValid = false;
                }
                if (desc && !desc.value.trim()) {
                    const error = desc.nextElementSibling;
                    error.textContent = 'Description is required';
                    error.style.display = 'block';
                    isValid = false;
                }
            });
            break;

        case 5: // Skills
            const skillItems = section.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                const name = item.querySelector('.skill-name');
                if (name && !name.value.trim()) {
                    const error = name.nextElementSibling;
                    error.textContent = 'Skill Name is required';
                    error.style.display = 'block';
                    isValid = false;
                }
            });
            break;

        case 6: // Languages
            const languageItems = section.querySelectorAll('.language-item');
            languageItems.forEach(item => {
                const name = item.querySelector('.lang-name');
                if (name && !name.value.trim()) {
                    const error = name.nextElementSibling;
                    error.textContent = 'Language Name is required';
                    error.style.display = 'block';
                    isValid = false;
                }
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

// function previewImage(input) {
//     const originalPreview = document.getElementById('original-preview');
//     const uploadInstructions = document.getElementById('upload-instructions');
//     const uploadedImage = document.getElementById('uploaded-image');
//     const file = input.files[0];
    
//     if (file) {
//         const reader = new FileReader();
        
        
//         reader.onload = function(e) {
//             const base64WithoutHeader = e.target.result.split(',')[1]; // strip "data:image/...;base64,"
//             sessionStorage.setItem('cvPhoto', base64WithoutHeader);
//             // Hide upload instructions

//             if (uploadInstructions) {
//                 uploadInstructions.style.display = 'none';
//                 uploadInstructions.style.setProperty('display', 'none', 'important');
//                 // console.log(uploadInstructions.style.getPropertyValue('display'));
//             }
            
//             // Show uploaded image
//             if (uploadedImage) {
//                 uploadedImage.src = e.target.result;
//                 uploadedImage.style.display = 'block';
//             }
            
//         };
        
//         reader.readAsDataURL(file);
//         console.log(base64WithoutHeader)
//     } else {
//         // Reset to upload instructions
//         if (uploadInstructions) {
//             uploadInstructions.style.display = 'flex';
//         }
//         if (uploadedImage) {
//             uploadedImage.style.display = 'none';
//         }
//     }
// }
function previewImage(input) {
    const originalPreview = document.getElementById('original-preview');
    const uploadInstructions = document.getElementById('upload-instructions');
    const uploadedImage = document.getElementById('uploaded-image');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            /* ---- preview ---- */
            if (uploadInstructions) {
                uploadInstructions.style.display = 'none';
                uploadInstructions.style.setProperty('display', 'none', 'important');
            }
            if (uploadedImage) {
                uploadedImage.src = e.target.result;
                uploadedImage.style.display = 'block';
            }

            /* ---- store base64 ---- */
            const base64WithoutHeader = e.target.result.split(',')[1];
            sessionStorage.setItem('cvPhoto', base64WithoutHeader);
            // console.log(base64WithoutHeader);
        };

        reader.readAsDataURL(file);
    } else {
        // reset
        if (uploadInstructions) uploadInstructions.style.display = 'flex';
        if (uploadedImage)   uploadedImage.style.display = 'none';
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

// function saveFormData() {
//     // Collect all form data
//     const formData = {
//         name: document.getElementById('name').value,
//         designation: document.getElementById('designation').value,
//         portfolio: document.getElementById('portfolio').value,
//         linkedin: document.getElementById('linkedin').value,
//         email: document.getElementById('email').value,
//         phone: document.getElementById('phone').value,
//         about: document.getElementById('about').value,
//         education: [],
//         experience: [],
//         skills: [],
//         languages: []
//     };

//     // Get Education
//     document.querySelectorAll('.education-item').forEach(item => {
//         formData.education.push({
//             school: item.querySelector('.edu-school').value,
//             degree: item.querySelector('.edu-degree').value,
//             year: item.querySelector('.edu-year').value
//         });
//     });

//     // Get Experience
//     document.querySelectorAll('.experience-item').forEach(item => {
//         formData.experience.push({
//             company: item.querySelector('.exp-company').value,
//             title: item.querySelector('.exp-title').value,
//             start: item.querySelector('.exp-start').value,
//             end: item.querySelector('.exp-end').value,
//             desc: item.querySelector('.exp-desc').value
//         });
//     });

//     // Get Skills
//     document.querySelectorAll('.skill-item').forEach(item => {
//         formData.skills.push({
//             name: item.querySelector('.skill-name').value,
//             level: item.querySelector('.skill-level').value
//         });
//     });

//     // Get Languages
//     document.querySelectorAll('.language-item').forEach(item => {
//         formData.languages.push({
//             name: item.querySelector('.lang-name').value,
//             level: item.querySelector('.lang-level').value
//         });
//     });

//     // Save to session storage
//     sessionStorage.setItem('cvData', JSON.stringify(formData));
    
//     // Redirect to cart
//     window.location.href = '/cart.html';
// }
function saveFormData() {
    /* ---------- basic fields ---------- */
    const payload = {
        name        : document.getElementById('name').value.trim(),
        designation : document.getElementById('designation').value.trim(),
        email       : document.getElementById('email').value.trim(),
        phone       : document.getElementById('phone').value.trim(),
        linkedin    : document.getElementById('linkedin').value.trim(),
        portfolio   : document.getElementById('portfolio').value.trim(),
        about       : document.getElementById('about').value.trim(),
        image_64    : sessionStorage.getItem('cvPhoto') || '', // photo already stripped
        skills      : [],
        languages   : [],
        experience  : [],
        education   : []
    };

    /* ---------- skills ---------- */
    document.querySelectorAll('.skill-item').forEach(item => {
        payload.skills.push({
            name: item.querySelector('.skill-name').value.trim(),
            level: item.querySelector('.skill-level').value.trim() 
            // level is optional for Lambda
            
        });
    });

    /* ---------- languages ---------- */
    document.querySelectorAll('.language-item').forEach(item => {
        payload.languages.push({
            name : item.querySelector('.lang-name').value.trim(),
            level: item.querySelector('.lang-level').value.trim()
        });
    });

    /* ---------- experience ---------- */
    // document.querySelectorAll('.experience-item').forEach(item => {
    //     payload.experience.push({
    //         title        : item.querySelector('.exp-title').value.trim(),
    //         start_year   : item.querySelector('.exp-start').value.trim(),
    //         end_year     : item.querySelector('.exp-end').value.trim(),
    //         descriptions : [item.querySelector('.exp-desc').value.trim()] // array of bullets
    //     });
    // });

    // document.querySelectorAll('.experience-item').forEach(item => {
    // payload.experience.push({
    //     company      : item.querySelector('.exp-company').value.trim(),  // ← ADD THIS LINE
    //     title        : item.querySelector('.exp-title').value.trim(),
    //     start_year   : item.querySelector('.exp-start').value.trim(),
    //     end_year     : item.querySelector('.exp-end').value.trim(),
    //     descriptions : [item.querySelector('.exp-desc').value.trim()]
    // });
    /* ---------- experience ---------- */
document.querySelectorAll('.experience-item').forEach(item => {
    const rawText = item.querySelector('.exp-desc').value.trim();
    // split on new-line or “•” or numbered list
    const bullets = rawText
        .split(/\r?\n|\•|\d+\./)          // break on line-break OR bullet OR “1.”
        .map(b => b.trim())
        .filter(b => b.length > 0);       // remove empty strings

    payload.experience.push({
        company      : item.querySelector('.exp-company').value.trim(),
        title        : item.querySelector('.exp-title').value.trim(),
        start_year   : item.querySelector('.exp-start').value.trim(),
        end_year     : item.querySelector('.exp-end').value.trim(),
        descriptions : bullets            // ← now a real array
    });
});

    /* ---------- education ---------- */
    document.querySelectorAll('.education-item').forEach(item => {
        payload.education.push({
            school : item.querySelector('.edu-school').value.trim(),
            degree : item.querySelector('.edu-degree').value.trim(),
            year   : item.querySelector('.edu-year').value.trim()
        });
    });

    /* ---------- store & go ---------- */
    sessionStorage.setItem('cvData', JSON.stringify(payload));
    window.location.href = '/cart.html';
}