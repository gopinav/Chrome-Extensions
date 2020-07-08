const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
let distractions = localStorage.getItem("distractions");

const generateTemplate = distraction => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center mx-4">
      <span>${distraction}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
    list.innerHTML += html;
};

const filterDistractions = term => {
    // Add filtered class to distractions that include the search term.
    Array.from(list.children)
        .filter(distraction => !distraction.textContent.toLowerCase().includes(term))
        .forEach(distraction => distraction.classList.add('filtered'));

    // Remove filtered class to distraction that include the search term.
    Array.from(list.children)
        .filter(distraction => distraction.textContent.toLowerCase().includes(term))
        .forEach(distraction => distraction.classList.remove('filtered'));
};


// If there are no distraction yet, input a default distraction.
if (!distractions) {
    distractions = ["Create your first distraction!"];
    localStorage.setItem("distractions", JSON.stringify(distractions));
} else {
    distractions = JSON.parse(distractions);
}

// Add previously stored or default distractions to html
distractions.forEach(distraction => {
    generateTemplate(distraction)
});


// Add a listener for adding new distractions.
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const new_distraction = addForm.add.value.trim();
    let distractions = JSON.parse(localStorage.getItem("distractions"));
    if (new_distraction.length) {
        distractions.push(new_distraction);
        localStorage.setItem("distractions", JSON.stringify(distractions));
        generateTemplate(new_distraction);
        addForm.reset();
    }
});

// Add a listener for deleting distractions.
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        let distractions = JSON.parse(localStorage.getItem("distractions"));
        distractions = distractions.filter(item => item !== e.target.parentElement.innerText);
        localStorage.setItem("distractions", JSON.stringify(distractions));
        e.target.parentElement.remove();
    }
});

// Add a listener for filtering distractions when search is used.
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterDistractions(term);
});
