var states = [
    {
        id: 1,
        name: 'Andhra Pradesh'
    },
    {
        id: 2,
        name: 'Kerala'
    },
    {
        id: 3,
        name: 'Tamilnadu'
    }
];
var cities = [
    {
        id: 1,
        name: 'Guntur',
        stateId: 1
    },
    {
        id: 2,
        name: 'Vizag',
        stateId: 1
    },
    {
        id: 3,
        name: 'Nellore',
        stateId: 1
    },
    {
        id: 4,
        name: 'Kochi',
        stateId: 2
    },
    {
        id: 5,
        name: 'Ernakulam',
        stateId: 2
    },
    {
        id: 6,
        name: 'Trivendram',
        stateId: 2
    },
    {
        id: 7,
        name: 'Chennai',
        stateId: 3
    },
    {
        id: 8,
        name: 'Coimbatore',
        stateId: 3
    },
    {
        id: 9,
        name: 'Kanchipuram',
        stateId: 3
    }
];
var isEdit = false;
var selId;
var dataForm;
var tbl;
window.onload = function () {
    tbl = document.getElementById("dataTable");
    dataForm = document.getElementById("dataForm");
    generateStates();
    getData();
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
        <td>${obj.dob.substr(0, 10).split("-").reverse().join("/")}</td>
        <td>${findAge(obj.dob)}</td>
        <td>${obj.phone}</td>
        <td>${obj.email}</td>
        <td>${obj.gender}</td>
        <td>${obj.interests}</td>
        <td>${obj.address}</td>
        <td>${stateName(obj.state)}</td>
        <td>${cityName(obj.city)}</td>
        <td>
            <button class="btn btn-info" onclick="onEdit('${encodeURIComponent(JSON.stringify(obj))}')">Edit</button>
            <button class="btn btn-danger" onclick="onDelete('${obj._id}')">Delete</button>
        </td>
    </tr>`;
        tbl.insertAdjacentHTML("beforeend", tRow);
    }

}


function stateName(sid) {
    let state;
    states.filter(e => {
        if (e.id == sid) {
            state = e.name;
        }
    })
    return state;
}

function cityName(cid) {
    let city;
    cities.filter(e => {
        if (e.id == cid) {
            city = e.name;
        }
    })
    return city;
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
        options += `<option value="${e.id}">${e.name}</option>`;
    }
    document.getElementById("state").innerHTML = options;
}


function onStateSel() {
    let filteredCities = [];
    let sid = document.getElementById("state").value;
    for (let e of cities) {
        if (e.stateId == sid) {
            filteredCities.push(e);
        }
    }
    generateCities(filteredCities);
}

function generateCities(filteredCities) {
    let options = `<option value="" selected disabled>Select a City</option>`;
    for (let e of filteredCities) {
        options += `<option value="${e.id}">${e.name}</option>`;
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
        state: document.getElementById("state").value,
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