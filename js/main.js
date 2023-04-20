let elFilter = ElSelector(".filter");
let elSearchInp = ElSelector("#search");
let elFromInp = ElSelector("#from");
let elToInp = ElSelector("#to");
let elStudentsList = ElSelector("#students-table-body");
let elTemplate = ElSelector("template").content;

let onRender = (arr) => {
  elStudentsList.innerHTML = null;
  arr.forEach((students) => {
    let elLi = elTemplate.cloneNode(true);

    let elStudentId = ElSelector(".student-id", elLi);
    elStudentId.textContent = students.id;

    let elStudentName = ElSelector(".student-name", elLi);
    elStudentName.innerHTML = students.name + " " + students.lastName;

    let elStudentMarkedDate = ElSelector(".student-marked-date", elLi);
    elStudentMarkedDate.textContent = students.markedDate;

    let elStudentMark = ElSelector(".student-mark", elLi);
    elStudentMark.textContent = students.mark;

    let elStudentStatus = ElSelector(".student-pass-status", elLi);

    if (students.mark >= 104) {
      elStudentStatus.textContent = "sucses";
      elStudentStatus.classList.add("bg-success");
    } else {
      elStudentStatus.textContent = "reject";
      elStudentStatus.classList.add("bg-danger");
    }

    elStudentsList.append(elLi);
  });
};
let onSubmitFilterForm = (e) => {
  e.preventDefault();
  let InpForm = elFromInp.value.trim();
  let InpTo = elToInp.value.trim();
  let InpSearch = elSearchInp.value.trim();
  if (!InpSearch) {
    InpTo.value = null;
    InpForm.value = null;
    InpSearch.value = null;
    return alert("Input Some Value");
  }
  
  let regex = new RegExp(InpSearch, "gi");
  
  let FilteredStudents = [];
  students.forEach((student) => {
    if (
      `${student.name} ${student.lastName}`.match(regex) ||
      `${student.name} ${student.lastName}`
      .charAt(0)
      .toLocaleUpperCase()
      .match(regex)
      ) {
      let InpSearchChar = elSearchInp.value.trim().charAt(0) === student.name.charAt(0);
      FilteredStudents.push({
        ...student,
        name: student.name.replace(InpSearch, `<mark class="bg-danger rounded-2">${InpSearch}</mark>`),
      });
    } 
  });

  onRender(FilteredStudents);
};
elFilter.addEventListener("submit", onSubmitFilterForm);
onRender(students);
