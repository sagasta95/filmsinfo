users = [
    {
        username: "admin",
        password: "admin",
        name: "Administrador"
    },
    {
        username: "aitorss",
        password: "UpZxiJ12Z",
        name: "Aitor"
    }
];

function login() {
    var username = document.getElementById("username-input").value;
    var pass = document.getElementById("password-input").value;
    var login_ok = false;
    users.forEach(function (valor) {
        if (username == valor['username'] && pass == valor['password']) {
            login_ok = true;
            window.sessionStorage.setItem('user', JSON.stringify(valor));
        }
    });

    if (login_ok) {
        window.location.replace("index.html");
    } else {
        M.toast({html: 'Nombre de usuario o contraseña incorrecta', classes: 'red lighten-1'});
    }
}

function check_login() {
    var user = window.sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("login.html");
    } else {
        document.getElementById("nombre-usuario").innerHTML = JSON.parse(user)['name'];
    }
}

function check_login_login() {
    var user = window.sessionStorage.getItem('user');
    if (user) {
        window.location.replace("index.html");
    }
}

function logout() {
    window.sessionStorage.removeItem('user');
    window.location.replace("login.html");
}