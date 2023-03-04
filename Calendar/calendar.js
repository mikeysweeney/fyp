function allowDrop(ev) {
  ev.preventDefault();
}

function dragStart(ev) {
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
  ev.dataTransfer.setDragImage(ev.target, 0, 0);

}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var originalElement = document.getElementById(data);
  var cloneElement = originalElement.cloneNode(true); // Create a new clone of the dragged element
  ev.target.appendChild(cloneElement);
}

function hover(element) {
  element.style.opacity = "0.7";
}

function leave(element) {
  element.style.opacity = "1.0";
}
/*//Global arrays for use in logic
var semestersArray = ['Prereqs', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12']; //all the semesters including the already met
var dropArr = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12']; //all the semesters not including already met
var notInDatabase = ['KUCore1', 'KUCore2', 'KUCore3', 'KUCore4', 'Tech1', 'KUCore5', 'Tech2', 'Tech3', 'KUCore6']; //all the generic electives
var unmet = []; //courses with unmet pre/coreqs

//handles html drag functionality
function dragStart(ev) {
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
  ev.dataTransfer.setDragImage(ev.target, 0, 0);

  // create a clone of the dragged element and append it to the drop box
  var clone = ev.target.cloneNode(true);
  clone.setAttribute('id', 'clone-' + ev.target.getAttribute('id'));
  ev.target.parentNode.appendChild(clone);

}

//handles html drop functionality
function allowDrop(ev) {
  ev.preventDefault();
  //info();
  // get the ID of the dragged element
  var data = ev.dataTransfer.getData("Text");

  // if the ID starts with 'clone-', it means the element is a clone, so we remove it from its original position
  if (data.startsWith('clone-')) {
    var originalElementId = data.slice(6); // remove the 'clone-' prefix from the ID
    var originalElement = document.getElementById(originalElementId);
    originalElement.parentNode.removeChild(originalElement);
  }
  // append the dragged element to the drop box
  var draggedElement = document.getElementById(data);
  ev.target.appendChild(draggedElement);

}

//displays course info, refreshes the highlighting of courses
function hover(ev) {
  refresh();
  refreshWhite();
  divId = ev.getAttribute('id');
  //if the course is an elective, set the color to green
  for (i in notInDatabase) {
    if (divId == notInDatabase[i]) {
      document.getElementById(divId).style = "background:PaleGreen";
      return true;
    }
  }

  //update the info box
  document.getElementById('Info').children[0].innerHTML = getValue('Name', divId);
  document.getElementById('Info').children[1].innerHTML = "<br />" + getValue('Description', divId);

  //logic for checking pre and corequisites
  notMetPreArray = checkPrerequisitesMet(divId);
  notMetCoArray = checkCorequisitesMet(divId);

  //special logic for AE 590
  if (getValue("Prerequisites", divId) == 'senior') {
    if ((document.getElementById(divId).parentNode.id == 'Required') || (document.getElementById(divId).parentNode.id == 'Prereqs') || (document.getElementById(divId).parentNode.id == 's7')) {
      document.getElementById(divId).style = "background:PaleGreen";
      return true;
    }
    else {
      return true;
    }
  }

  //if prereqs and coreqs met
  if ((notMetPreArray == true) && (notMetCoArray == true)) {
    document.getElementById(divId).style = "background:PaleGreen";
    return true;
  }

  //if coreqs not met
  else if (notMetPreArray == true) {
    document.getElementById(divId).style = "background:IndianRed";
    for (i in notMetCoArray) {
      document.getElementById(notMetCoArray[i]).style = "background:Wheat";
    }
  }

  //if prereqs not met
  else if (notMetCoArray == true) {
    document.getElementById(divId).style = "background:IndianRed";
    for (i in notMetPreArray) {
      document.getElementById(notMetPreArray[i]).style = "background:Pink";
    }
  }

  //if both not met
  else {
    document.getElementById(divId).style = "background:IndianRed";
    for (i in notMetPreArray) {
      document.getElementById(notMetPreArray[i]).style = "background:Pink";
    }
    for (i in notMetCoArray) {
      document.getElementById(notMetCoArray[i]).style = "background:Wheat";
    }
  }
}

//handles drag functionality
function drag(ev) {
  dragStart(ev);
  ev.dataTransfer.setData("text", ev.target.id);
}

//drop functionality, handles checking if the semester is valid, refreshing, updating info, etc.
function drop(ev) {
  //initialize logic variables
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var targetDiv = ev.target;
  var firstFlag = false;
  var parentFlag = false;
  //make sure the course appends to the right parent
  for (checkIter in semestersArray) {
    if (targetDiv.id == semestersArray[checkIter]) {
      firstFlag = true;
    }
    if ((targetDiv.parentNode.id == semestersArray[checkIter]) || (targetDiv.parentNode.id == 'Required')) {
      parentFlag = true;
    }
  }
  //special logic for dropping into required div
  if (targetDiv.id == "Required") {
    targetDiv.appendChild(document.getElementById(data));
    //refresh course coloring
    refresh();
    refreshSemesterHours();
    refreshUnmetArray();
    refreshWhite();
    //update info box
    document.getElementById('Info').children[0].innerHTML = getValue('Name', data);
    document.getElementById('Info').children[1].innerHTML = "<br />" + getValue('Description', data);
    return true;
  }
  //set target to parent of target if necessary, otherwise break
  if (firstFlag == false) {
    if (parentFlag == true) {
      targetDiv = targetDiv.parentNode;
    }
    else {
      return false;
    }
  }
  //refresh coloring
  targetDiv.appendChild(document.getElementById(data));
  refresh();
  refreshSemesterHours();
  refreshUnmetArray();
  refreshWhite();
  //get course requirement info
  var prereqsMet = checkPrerequisitesMet(document.getElementById(data).id);
  var coreqsMet = checkCorequisitesMet(document.getElementById(data).id);
  var semesterRight = checkSemesters(document.getElementById(data).id);
  var credits = getCreditsSemester(targetDiv.id);
  notFlag = false;
  //if the course is an elective, don't update the info
  for (i in notInDatabase) {
    if (divId == notInDatabase[i]) {
      notFlag = true;
    }
  }
  if (notFlag == false) {
    document.getElementById('Info').children[0].innerHTML = getValue('Name', data);
    document.getElementById('Info').children[1].innerHTML = "<br />" + getValue('Description', data);
  }
  //if semester is invalid, make the background gold
  if (semesterRight == false) {
    document.getElementById(data).style = "background:gold";
  }
  //if the semester is valid, check pre/coreqs and color accordingly
  else {
    if (unmet.indexOf(document.getElementById(data).id) > -1) {
      document.getElementById(data).style = "background:IndianRed";
    }
    else {
      document.getElementById(data).style = "background:white";
    }
  }
}


*/
