const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
let milestones = localStorage.getItem("milestones");

const generateTemplate = milestone => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${milestone}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
    list.innerHTML += html;
};

const addFormTemplate = "<form class=\"add text-center my-4\">\n" +
    "<input class=\"form-control m-auto\" type=\"text\" name=\"add\" placeholder='Add a milestone...'/>\n" +
    "</form>";

const fullAddFormTemplate = "<form class=\"add text-center my-4\">\n" +
    "<label class=\"text-light mx-3\">Already added three milestones. Complete these first before adding a new one. Note that small distracting tasks should be put on the distraction list!</label>\n" +
    "<input class=\"form-control m-auto\" type=\"text\" name=\"add\" placeholder='Cannot add more milestones!'/>\n" +
    "</form>";

// If there are no milestones yet, input a default milestone.
if (!milestones) {
    milestones = ["Create your first milestone!"];
    localStorage.setItem("milestones", JSON.stringify(milestones));
} else {
    milestones = JSON.parse(milestones);
}

// Add previously stored or default milestones to HTML.
milestones.forEach(milestone => {
    generateTemplate(milestone)
});

// Add a listener for adding new milestones.
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const new_milestone = addForm.add.value.trim();
    let milestones = JSON.parse(localStorage.getItem("milestones"));
    // Only allow a maximum of 3 milestones.
    if (new_milestone.length && milestones.length < 3) {
        milestones.push(new_milestone);
        localStorage.setItem("milestones", JSON.stringify(milestones));
        generateTemplate(new_milestone);
        addForm.reset();
    } else if (new_milestone.length) {
        // Update HTML to show a warning in case a fourth milestone is entered.
        addForm.innerHTML = fullAddFormTemplate
    }
});

// Add a listener for deleting milestones.
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        let milestones = JSON.parse(localStorage.getItem("milestones"));
        milestones = milestones.filter(item => item !== e.target.parentElement.innerText);
        localStorage.setItem("milestones", JSON.stringify(milestones));
        e.target.parentElement.remove();
    }
    // Update the HTML if there is room to add more milestones.
    if (JSON.parse(localStorage.getItem("milestones")).length <= 2) {
        addForm.innerHTML = addFormTemplate
    }
});
