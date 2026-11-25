// =========================================================================
// ERROR IDENTIFICATION LOG (Part 1, Step 2)
// =========================================================================
// Error 1 (grade.html, Line 9): onsubmit="checkMark()" does not return the boolean result (needs onsubmit="return checkMark()"), causing the form to submit and reload the page so the result disappears immediately.
// Error 2 (grade.html, Line 17): onclick="showtable()" uses lowercase 't', whereas the function in grade.js is named showTable() as JavaScript is case sensetive.
// Error 3 (grade.html, Line 19): <script src="grades.js"></script> links to a non-existent plural filename instead of "grade.js".
// Error 4 (grade.js, Line 5): if (name = "") uses a single '=' (assignment) instead of '===' (comparison), clearing the name and always evaluating as falsy.
// Error 5 (grade.js, Line 9): isNan(mark) is misspelled with a lowercase 'n'; the built-in function is isNaN(mark).
// Error 6 (grade.js, Line 14): if (mark < 0 && mark > 100) uses logical AND (&&), which is impossible; it must use logical OR (||).
// Error 7 (grade.js, Line 28): document.getElementByID("result") has a capital 'D'; the correct method name is getElementById().
// Error 8 (grade.js, Line 30): .style.colour uses British spelling instead of American spelling (.style.color).
// Error 9 (grade.js, Line 31): return true; allows the form to submit and refresh the page, erasing the output; it must return false.
// Error 10 (grade.js, Line 38): for (let i = 1; i < grades.length; i++) starts at index 1, skipping index 0 ("A"); it must start at i = 0.
// Error 11 (grade.js, Line 42): .innerHtml has incorrect casing; the correct property is .innerHTML.
// =========================================================================

// Validate inputs, calculate grade, and display colored result + timestamp
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let markInput = document.forms["gradeForm"]["mark"].value.trim();

    // Check if Name is empty
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check if Mark is empty
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check if Mark is non-numeric
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert to number and check valid range
    let mark = Number(markInput);
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and set corresponding text color
    let grade;
    let resultElement = document.getElementById("result");

    if (mark >= 80) {
        grade = "A";
        resultElement.style.color = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultElement.style.color = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultElement.style.color = "orange";
    } else {
        grade = "F";
        resultElement.style.color = "red";
    }

    // Display final grade message
    resultElement.innerHTML = name + " got grade " + grade;

    // Display checked date and time below the result
    let timestampElement = document.getElementById("timestamp");
    timestampElement.innerHTML = "Checked on: " + new Date();
    timestampElement.style.color = resultElement.style.color;

    // Return false to prevent page reload so output stays visible
    return false;
}

// Generate a random whole number from 0 to 100 into the mark field
function generateRandomMark() {
    let randomNum = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomNum;
}

// Render the full grade table including header row and all 4 grades
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
