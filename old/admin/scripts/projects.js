let project = {};

function addPRojectToDB() {
    const form = document.forms.addProject;
}

function addProjectLang() {
    const form = document.forms.addProject;

    project.title = form.title.value;


    if (typeof postData.content !== "object") {
        project.content = {};
    }
    project.content[form.lang.value.trim() !== "" ? form.lang.value : "en"] = form.content.value;
    form.content.value = "";

    project.author = form.author.value;

    project.show = form.show.value === "true" ? true : false;
}