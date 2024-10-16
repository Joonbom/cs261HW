
function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const roles = document.getElementById('roles').value;

    var showErr = document.createElement("div");
    showErr.classList.add("error");
    showErr.innerHTML = "<label>Incorrect username or password.</label>";

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUd528eec12c6c1ca5d523d0bb1ca13b54455f37eb7a11ca44602ef60ba13eedfec58b2f7556499739caca6ec01be25cb0'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password
        })
    })
        .then(response => response.json())
        .then(data => {
            if (roles.toLowerCase() != data.type) {
                if (document.body.getElementsByClassName("error").length == 0) {
                    document.body.appendChild(showErr);
                }
            } else {
                if (document.body.getElementsByClassName("error").length > 0) {
                    document.body.removeChild(document.body.getElementsByClassName("error")[0]);
                }
                displayInfo(data);
            }
        })
        .catch(error => {
            if (document.body.getElementsByClassName("error").length == 0) {
                document.body.appendChild(showErr);
            }
            console.error('Error:', error)
        });
}

function displayInfo(data) {
    var content = `
        <h2>Login success</h2>
        <div>
            <label>Student Id: ` + data.username + `</label><br><br>
            <label>Name: `+ data.displayname_th + `</label><br><br>
            <label>Faculty: ` + data.department + `</label><br><br>
            <label>Department: ` + data.faculty + `</label><br><br>
        </div>
    `;

    var showContent = document.createElement("div");
    showContent.classList.add("content");
    showContent.innerHTML = content;

    document.getElementById("wrapper").appendChild(showContent);
}