var states = [];
var cities = [];
var isEdit = false;
var selId;
var dataForm;
var tbl;
window.onload = function () {
    tbl = document.getElementById("dataTable");
    dataForm = document.getElementById("dataForm");
    getAllStates();
    getData();
}

function getAllStates(){
    let api = "http://localhost:3000/api/states/getAllStates";
    fetch(api).then(res => res.json()).then(
        data => {
            console.log(data);
            states = data.data;
            generateStates();
        }
    )
}

function getData() {
    let api = "http://localhost:3000/api/customers/getAllCustomers";
    fetch(api).then(res => res.json()).then(
        data => {
            console.log(data);
            showDatainTable(data.data)
        }
    )
}


function generateReport(t){
    let api = "http://localhost:3000/api/customers/generateReport/"+t;
    fetch(api).then(res => res.json()).then(
        data => {
            window.open(data.filepath);
             // download(data.filepath, "samplepdf.pdf");
        }
    )
}

function showDatainTable(data) {
    while (tbl.rows.length > 1) {
        tbl.deleteRow(1);
    }
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        let tRow = `<tr>
        <td>${i + 1}</td>
        <td>${obj.name}</td>
        <td>${obj.father_name}</td>
        <td>${obj.dob ? obj.dob.substr(0, 10).split("-").reverse().join("/") : ''}</td>
        <td>${findAge(obj.dob)}</td>
        <td>${obj.phone}</td>
        <td>${obj.email}</td>
        <td>${obj.gender}</td>
        <td>${obj.interests}</td>
        <td>${obj.address}</td>
        <td>${obj.city.state.name}</td>
        <td>${obj.city.name}</td>
        <td>
            <button class="btn btn-info" onclick="onEdit('${encodeURIComponent(JSON.stringify(obj))}')">Edit</button>
            <button class="btn btn-danger" onclick="onDelete('${obj._id}')">Delete</button>
        </td>
    </tr>`;
        tbl.insertAdjacentHTML("beforeend", tRow);
    }

}

function onEdit(obj) {
    isEdit = true;
    document.getElementById("sbtn").className = "btn btn-success";
    document.getElementById("sbtn").innerText = "Update";
    dataForm.reset();
    let rec = JSON.parse(decodeURIComponent(obj));
    selId = rec._id
    document.getElementById("name").value = rec.name;
    document.getElementById("father_name").value = rec.father_name;
    document.getElementById("dob").value = rec.dob.substr(0, 10);
    document.getElementById("phone").value = rec.phone;
    document.getElementById("email").value = rec.email;
    document.getElementById("phone").value = rec.phone;
    document.getElementById("address").value = rec.address;
    document.querySelector(`input[value=${rec.gender}]`).checked = true;
    for (let e of rec.interests) {
        document.querySelector(`input[value='${e}']`).checked = true;
    }
    document.getElementById("state").value = rec.state;
    onStateSel();
    document.getElementById("city").value = rec.city;
}


function onDelete(id) {
    let api = `http://localhost:3000/api/customers/deleteCustomer/${id}`;
    let options = {
        method: "DELETE"
    }
    fetch(api, options).then(res => res.json())
        .then(data => {
            console.log(data);
            getData();
        })
}

function findAge(d) {
    let bDay = new Date(d);
    let tDay = new Date();
    let age = tDay.getFullYear() - bDay.getFullYear();
    let md = tDay.getMonth() - bDay.getMonth();
    let dd = tDay.getDate() - bDay.getDate();
    if (md < 0 || (md == 0 && dd < 0)) {
        age--;
    }
    return age;
}

function generateStates() {
    let options = `<option value="" selected disabled>Select a State</option>`;
    for (let e of states) {
        options += `<option value="${e._id}">${e.name}</option>`;
    }
    document.getElementById("state").innerHTML = options;
}


function onStateSel() {
    let sid = document.getElementById("state").value;
    console.log(sid);

    let api = `http://localhost:3000/api/cities/getCitiesbyState/${sid}`;
    fetch(api).then(res => res.json()).then(
        data => {
            console.log(data);
            cities = data.data;
            console.log(cities);
            generateCities();
        }
    )
}

function generateCities() {
    let options = `<option value="" selected disabled>Select a City</option>`;
    for (let e of cities) {
        options += `<option value="${e._id}">${e.name}</option>`;
    }
    document.getElementById("city").innerHTML = options;
}

function onFormSubmit(e) {
    e.preventDefault();
    let interests = document.querySelectorAll("input[name='interest']:checked");
    let choose = [];
    for (let e of interests) {
        choose.push(e.value);
    }
    let obj = {
        name: document.getElementById("name").value,
        father_name: document.getElementById("father_name").value,
        dob: document.getElementById("dob").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        gender: document.querySelector("input[name='gender']:checked").value,
        interests: choose,
        address: document.getElementById("address").value,
        // state: document.getElementById("state").value,
        city: document.getElementById("city").value,
    }
    isEdit ? updateData(obj) : saveData(obj);
}

function saveData(data) {
    let api = "http://localhost:3000/api/customers/createCustomer";
    let options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(api, options).then(response => response.json())
        .then(data => {
            console.log(data);
            onClear();
            getData();
        })
}


function updateData(data) {
    data._id = selId;
    console.log(data);

    let api = "http://localhost:3000/api/customers/updateCustomer";
    let options = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(api, options).then(response => response.json())
        .then(data => {
            console.log(data);
            onClear();
            getData();
        })
}


function onClear() {
    dataForm.reset();
    isEdit = false;
    document.getElementById("sbtn").className = "btn btn-primary";
    document.getElementById("sbtn").innerText = "Save";
    selId = null;
}

function download(url, filename) {
    fetch(url).then(function(t) {
        return t.blob().then((b)=>{
            var a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", filename);
            a.click();
        }
        );
    });
    }

