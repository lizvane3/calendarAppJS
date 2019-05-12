const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let counter = 0;

let Tarea = /** @class */ (function () {
    function Tarea() {
    }
    return Tarea;
}());

let obj = new Tarea;
let tasks = [];
showCalendar(currentMonth, currentYear);

function dayNames() {
    let titleRow = document.getElementById('calendar');
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    tr.classList.add('table-info');
    for (let i = 0; i < WEEKDAYS.length; i++) {
        let th = document.createElement('th');
        let text = document.createTextNode(WEEKDAYS[i]);

        thead.appendChild(tr);
        tr.appendChild(th);
        th.appendChild(text);
        titleRow.appendChild(thead);
    }
}

function currentDate() {
    let currentDateTitle = document.getElementById("currentMonth");
    return currentDateTitle.innerHTML = MONTHS[currentMonth] + ' ' + currentYear;
}

function showCalendar() {
    currentDate();
    let monthFirstDay = (new Date(currentYear, currentMonth)).getDay();
    let daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
    let calendarTbl = document.getElementById('calendar-body');
    calendarTbl.innerHTML = '';

    let day = 1;
    for (let i = 0; i < 6; i++) {
        let tr = document.createElement('tr');
        let td = '';
        let tdValue = '';

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < monthFirstDay) {
                td = document.createElement('td');
                tdValue = document.createTextNode('');
                td.appendChild(tdValue);
                tr.appendChild(td);
            } else if (day > daysInMonth) {
                break;
            } else {
                td = document.createElement('td');
                tdValue = document.createTextNode(day);
                if (day === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth()) {
                    td.classList.add('bg-danger');
                    td.style.color = 'white';
                    td.style.borderRadius = '10px';
                }
                td.onclick = function () {
                    obj.date = this.innerHTML + ' ' + currentDate();
                    todayFormatted = new Date();
                    dateFormatted = new Date();
                    todayFormatted = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear() + ' 00:00';
                    dateFormatted = (new Date(obj.date).getMonth() + 1) + '/' + new Date(obj.date).getDate() + '/' + new Date(obj.date).getFullYear() + ' 00:00';
                    if (new Date(dateFormatted) >= new Date(todayFormatted)) {
                        $('#appointmentModal').modal('show');
                        // console.log(todayFormatted);
                        // console.log(dateFormatted);
                    }

                };
                td.appendChild(tdValue);
                tr.appendChild(td);
                day++;
            }
        }
        calendarTbl.appendChild(tr);
    }
}

function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar();
}

function previousMonth() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar();
}

function addVal() {
    var obj1 = new Tarea;

    var titleApp = document.getElementById('title').value;
    var timeApp = document.getElementById('time').value;
    var dscApp = document.getElementById('message-text').value;
    if (titleApp != '' && timeApp != '' && dscApp != '') {
        obj1.id = counter++;
        obj1.title = titleApp;
        obj1.time = obj.date + ' ' + timeApp;
        obj1.text = dscApp;
        addTask(obj1);
    } else {
        obj1.id = null;
        obj1.title = null;
        obj1.time = null;
        obj1.text = null;
        obj1.date = null;
    }
    document.getElementById('title').value = '';
    document.getElementById('time').value = '';
    document.getElementById('message-text').value = '';
}

function addTask(object) {
    if (tasks.find(function (data) { return data.time == object.time })) {
        var alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
            '<strong>Oops!</strong> It exists an appointment scheduled for same day and time. Please change your appointment details.' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>';
        document.getElementById('alert').innerHTML = alert;
        return;
    }
    var newElement = document.getElementById("list-tab");
    tasks.push(object);
    var task = tasks.map(function (element, idx) {
        return '<a class="list-group-item list-group-item-action" data-toggle="list" href="#list-home" role="tab" aria-controls="home" onclick="editTask(' + element.id + ')">' + element.title + ' - ' + element.time + ' - ' + element.text +
            '<button type="button" class="close" aria-label="Close" onclick="deleteTask(' + element.id + ')"><span aria-hidden="true">&times;</span></button></a>'
    }).join('');

    newElement.innerHTML = '<h4>Current appointments</h4>' + task;
}

function filterApp() {
    dateValue = document.getElementById('date-input').value;
    var newDateFormatted = dateValue.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, function (match, y, m, d) {
        return m + '/' + d + '/' + y;
    });
    var dateInput = (new Date(newDateFormatted).getMonth() + 1) + '/' + new Date(newDateFormatted).getDate() + '/' + new Date(newDateFormatted).getFullYear();
    var filterTask = tasks.filter(function (element1, idx) {
        var eDate = (new Date(element1.time).getMonth() + 1) + '/' + new Date(element1.time).getDate() + '/' + new Date(element1.time).getFullYear();
        return dateInput == eDate;
    });
    var newFilterElement = document.getElementById("list-filtered");

    var filtered = filterTask.map(function (el, i) {
        return '<a class="list-group-item list-group-item-action" data-toggle="list" href="#list-home" role="tab" aria-controls="home" onclick="editTask(' + i + ')">' + el.title + ' - ' + el.time + ' - ' + el.text + '</a>'
    }).join('');
    if (filtered) {
        newFilterElement.innerHTML = '<p class="lead">Appointments for this date:</p>' + filtered;
    } else {
        newFilterElement.innerHTML = '<p class="lead">No appointments for this date.</p>';
    }
}

function deleteTask(id) {
    if (tasks) {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                tasks.splice(i, 1);
                var newDeleted = tasks.map(function (e, idx) {
                    return '<a class="list-group-item list-group-item-action" data-toggle="list" href="#list-home" role="tab" aria-controls="home">'
                        + e.title + ' - ' + e.time + ' - ' + e.text +
                        '<button type="button" class="close" aria-label="Close" onclick="deleteTask(' + e.id + ')"><span aria-hidden="true">&times;</span></button></a>';
                }).join('');
            }
        }
        document.getElementById("list-tab").innerHTML = '';
        document.getElementById("list-tab").innerHTML = newDeleted;
    }
}
function editTask(id) {
    // $('#appointmentModal').modal('show');
    console.log(id);
}
$('#appointmentModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
});
