
  // ===== Photo upload preview =====
  const input = document.getElementById('photoInput');
  const clearBtn = document.getElementById('clearPhoto');
  const img = document.getElementById('headshot');
  const mono = document.getElementById('monogram');
  const nameEl = document.querySelector('[data-field="full_name"]');

  input.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { img.src = reader.result; img.style.display = 'block'; mono.style.display = 'none'; };
    reader.readAsDataURL(file);
  });
  clearBtn.addEventListener('click', () => {
    img.removeAttribute('src'); img.style.display = 'none'; mono.style.display = 'grid'; input.value = '';
  });
  const updateMonogram = () => {
    const text = (nameEl.textContent || '').trim();
    const initials = text.split(/\s+/).slice(0,2).map(s => s[0] || '').join('').toUpperCase();
    mono.textContent = initials || 'AA';
  };
  nameEl.addEventListener('input', updateMonogram); updateMonogram();

  // ===== Experience: add/remove entries and bullets (Right column) =====
  const expSection = document.getElementById('experienceSection');
  const addExpBtn = document.getElementById('addExp');
  const addBulletToolbarBtn = document.getElementById('addBullet');
  const expTemplate = document.getElementById('expTemplate');
  let lastFocusedEntry = null;

  expSection.addEventListener('click', (e) => {
    const entry = e.target.closest('.exp-entry'); if (entry) lastFocusedEntry = entry;
  });
  expSection.addEventListener('focusin', (e) => {
    const entry = e.target.closest('.exp-entry'); if (entry) lastFocusedEntry = entry;
  });

  addExpBtn.addEventListener('click', () => {
    const clone = document.importNode(expTemplate.content, true);
    wireExpEntryControls(clone);
    expSection.querySelector('.section').appendChild(clone);
  });

  addBulletToolbarBtn.addEventListener('click', () => {
    if (!lastFocusedEntry) {
      const entries = expSection.querySelectorAll('.exp-entry');
      lastFocusedEntry = entries[entries.length - 1];
    }
    if (lastFocusedEntry) addBulletTo(lastFocusedEntry);
  });

  function wireExpEntryControls(root){
    const scope = root.querySelector ? root : document;
    scope.querySelectorAll('.btnAddBullet').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const entry = e.target.closest('.exp-entry'); addBulletTo(entry);
      });
    });
    scope.querySelectorAll('.btnRemoveEntry').forEach(btn => {
      btn.addEventListener('click', (e) => e.target.closest('.exp-entry').remove());
    });
  }
  wireExpEntryControls(document);

  function addBulletTo(entry){
    if (!entry) return;
    const ul = entry.querySelector('.exp-bullets');
    const li = document.createElement('li');
    li.setAttribute('contenteditable', 'true');
    li.textContent = 'Short impact statement…';
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); }); // keep clamp tidy
    ul.appendChild(li); placeCaretAtEnd(li);
  }

  // Clamp-friendly: prevent Enter in existing bullets
  document.querySelectorAll('.exp-bullets li[contenteditable="true"]').forEach(li => {
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
  });

  // ===== Left column: Skills, Education, Certifications, PORs, Hobbies =====

  // Skills
  const skillsList = document.getElementById('skillsList');
  document.getElementById('btnAddSkill').addEventListener('click', () => {
    const li = document.createElement('li');
    li.setAttribute('contenteditable', 'true'); li.textContent = 'New skill';
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
    skillsList.appendChild(li); placeCaretAtEnd(li);
  });
  document.getElementById('btnRemoveLastSkill').addEventListener('click', () => {
    const items = skillsList.querySelectorAll('li'); if (items.length) items[items.length - 1].remove();
  });
  skillsList.querySelectorAll('li').forEach(li => {
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
  });

  // Education
  const eduList = document.getElementById('eduList');
  document.getElementById('btnAddEdu').addEventListener('click', () => {
    const row = document.createElement('div'); row.className = 'edu-row';
    row.innerHTML = `
      <div contenteditable="true">College / University</div>
      <div contenteditable="true">Degree / Major</div>
      <div class="muted" contenteditable="true">MM/YYYY – MM/YYYY</div>
      <button type="button" class="remove" title="Remove">Remove</button>`;
    row.querySelector('.remove').addEventListener('click', () => row.remove());
    eduList.appendChild(row); row.querySelector('div[contenteditable]').focus();
  });
  // Wire existing Remove buttons
  eduList.querySelectorAll('.edu-row .remove').forEach(btn => btn.addEventListener('click', (e) => e.target.closest('.edu-row').remove()));

  // Certifications
  const certsList = document.getElementById('certsList');
  document.getElementById('btnAddCert').addEventListener('click', () => {
    const li = document.createElement('li');
    li.setAttribute('contenteditable', 'true'); li.textContent = 'Certification — Issuer (MM/YYYY)';
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
    certsList.appendChild(li); placeCaretAtEnd(li);
  });
  document.getElementById('btnRemoveLastCert').addEventListener('click', () => {
    const items = certsList.querySelectorAll('li'); if (items.length) items[items.length - 1].remove();
  });
  certsList.querySelectorAll('li').forEach(li => {
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
  });

  // ===== POR section (remove or add entire section) =====
  const leftColumn = document.getElementById('leftColumn');
  const addPORSectionBtn = document.getElementById('addPORSection');
  const porTemplate = document.getElementById('porSectionTemplate');

  function wirePORSection(root){
    const scope = root.querySelector ? root : document;
    const addBtn = scope.querySelector('#btnAddPOR');
    const removeLastBtn = scope.querySelector('#btnRemoveLastPOR');
    const removeSectionBtn = scope.querySelector('#btnRemovePORSection');
    const porList = scope.querySelector('#porList');

    if (addBtn) addBtn.addEventListener('click', () => {
      const li = document.createElement('li');
      li.setAttribute('contenteditable','true');
      li.textContent = 'Position / Responsibility — brief outcome';
      li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
      porList.appendChild(li); placeCaretAtEnd(li);
    });

    if (removeLastBtn) removeLastBtn.addEventListener('click', () => {
      const items = porList.querySelectorAll('li'); if (items.length) items[items.length - 1].remove();
    });

    if (removeSectionBtn) removeSectionBtn.addEventListener('click', () => {
      const section = removeSectionBtn.closest('#porSection');
      if (section) section.remove();
    });

    if (porList) porList.querySelectorAll('li[contenteditable="true"]').forEach(li => {
      li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
    });
  }
  // Wire initial POR section if present
  if (document.getElementById('porSection')) wirePORSection(document);

  // Toolbar: Add POR Section if missing
  addPORSectionBtn.addEventListener('click', () => {
    if (document.getElementById('porSection')) return; // already present
    const frag = document.importNode(porTemplate.content, true);
    // Insert POR above Hobbies (or at end of left column)
    const hobbies = document.getElementById('hobbySection');
    leftColumn.insertBefore(frag, hobbies ? hobbies : null);
    wirePORSection(document);
  });

  // ===== Hobbies section (remove or add entire section) =====
  const addHobbySectionBtn = document.getElementById('addHobbySection');
  const hobbyTemplate = document.getElementById('hobbySectionTemplate');

  function wireHobbySection(root) {
    const scope = root.querySelector ? root : document;
    const addBtn = scope.querySelector('#btnAddHobby');
    const removeLastBtn = scope.querySelector('#btnRemoveLastHobby');
    const removeSectionBtn = scope.querySelector('#btnRemoveHobbySection');
    const hobbyList = scope.querySelector('#hobbyList');

    if (addBtn) addBtn.addEventListener('click', () => {
      const li = document.createElement('li');
      li.setAttribute('contenteditable','true');
      li.textContent = 'New hobby or interest';
      li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
      hobbyList.appendChild(li); placeCaretAtEnd(li);
    });

    if (removeLastBtn) removeLastBtn.addEventListener('click', () => {
      const items = hobbyList.querySelectorAll('li'); if (items.length) items[items.length - 1].remove();
    });

    if (removeSectionBtn) removeSectionBtn.addEventListener('click', () => {
      const section = removeSectionBtn.closest('#hobbySection');
      if (section) section.remove();
    });

    if (hobbyList) hobbyList.querySelectorAll('li[contenteditable="true"]').forEach(li => {
      li.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
    });
  }
  // Wire initial Hobbies section if present
  if (document.getElementById('hobbySection')) wireHobbySection(document);

  // Toolbar: Add Hobbies Section if missing
  addHobbySectionBtn.addEventListener('click', () => {
    if (document.getElementById('hobbySection')) return; // already present
    const frag = document.importNode(hobbyTemplate.content, true);
    leftColumn.appendChild(frag); // add to end of left column
    wireHobbySection(document);
  });

  // ==== Utility ====
  function placeCaretAtEnd(el) {
    const range = document.createRange(); range.selectNodeContents(el); range.collapse(false);
    const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  }
   
        // Mobile menu toggle
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if(window.innerWidth <= 768) {
                        document.querySelector('.nav-links').style.display = 'none';
                    }
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if(window.innerWidth > 768) {
                document.querySelector('.nav-links').style.display = 'flex';
            } else {
                document.querySelector('.nav-links').style.display = 'none';
            }
        });
    