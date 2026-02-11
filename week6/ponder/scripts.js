function convert(grade) {
    let points;
    switch (grade){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];

const students = [
    {last: 'Andrus', first: 'Aaron', grade: 'A'},
    {last: 'Masa', first:'Manny', grade: 'B'},
    {last: 'Tanda', first: 'Tamanda', grade: 'C'}
];

const list = document.querySelector('ul');
list.innerHTML = '';

words.forEach(function(word, index) {
    const li = document.createElement('li');
    li.textContent = (index + 1) + '. ' + word;
    list.appendChild(li);
    console.log('Fruit order:', index + 1, word);
});

const nameHeadings = document.querySelectorAll('.names h2');
const container = document.querySelector('.names');

let totalPoints = 0;

students.forEach(function(student, index) {
    const fullName = student.first + ' ' + student.last;
    const points = convert(student.grade);
    totalPoints += points;

    console.log(fullName + ' grade:', student.grade);
    console.log(fullName + ' points:', points);

    if (nameHeadings[index]) {
        nameHeadings[index].textContent = fullName + ' - Grade: ' + student.grade + ' (' + points + ' pts)';
    }
});

const average = totalPoints / students.length;
console.log('Grade average:', average);

const avgDisplay = document.createElement('h2');
avgDisplay.className = 'grade-average';
avgDisplay.textContent = 'Grade Average: ' + average.toFixed(2);
container.appendChild(avgDisplay);
