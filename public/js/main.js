
function Delete(id) {
    let xhr = new XMLHttpRequest();
    xhr.open("Delete", "/showUsers");

    xhr.onload = function () {
        document.getElementById(`${id}`).innerHTML = "";
        location.reload();
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// ??????????????????????????
    id = encodeURIComponent(id);

    xhr.send(`id=${id}`);
}

function Edit(id, name, surname, email) {
    let x = document.getElementsByTagName("input");
    for (let i = 1; i < x.length; ++i) {
        x[i].disabled = false;
    }
    saveBtn.disabled = false;
    inputId.value = id;
    inputName.value = name;
    inputSurname.value = surname;
    inputEmail.value = email;
}

function Save() {
    var bool = false;
    if(!validateEmail(inputEmail.value)){
        document.getElementById("emailErrorMsg").innerHTML = "ERROR! Invalid email!";
        bool = true;
    } else {
        document.getElementById("emailErrorMsg").innerHTML = "";
    }

    if(bool) return;

    let id = inputId.value;
    let div = document.getElementById(id);
    let ul = div.children[0].children;
    ul[0].innerHTML = inputName.value;
    ul[1].innerHTML = inputSurname.value;
    ul[2].innerHTML = inputEmail.value;

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "/edit");
    xhr.onload = function () {
        location.reload();
    };
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// ??????????????????????????
    id = encodeURIComponent(id);
    namee = encodeURIComponent(inputName.value);
    surname = encodeURIComponent(inputSurname.value);
    email = encodeURIComponent(inputEmail.value);
    xhr.send(`id=${id}&name=${namee}&surname=${surname}&email=${email}`);
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email);
}