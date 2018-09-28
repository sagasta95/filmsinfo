
function search() {
    resetSearch();
    var txt = document.getElementById('input-search').value;
    var r = new XMLHttpRequest();
    r.open("POST", "http://www.omdbapi.com/?apikey=f12ba140&s=" + txt, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200)
            return;
        var request = JSON.parse(r.responseText);
        print(request);
    };
    r.send();
}

function showDetalleFilm(id) {

    var r = new XMLHttpRequest();
    r.open("POST", "http://www.omdbapi.com/?apikey=f12ba140&i=" + id, true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200)
            return;
        var request = JSON.parse(r.responseText);
        document.getElementById("img-ficha").setAttribute("src", request['Poster']);
        document.getElementById("title").innerHTML = request['Title'];
        document.getElementById("descripcion").innerHTML = request['Plot'];
        document.getElementById("año").innerHTML = request['Year'];
        document.getElementById("relased").innerHTML = request['Released'];
        document.getElementById("genero").innerHTML = request['Genre'];
        document.getElementById("director").innerHTML = request['Director'];
        document.getElementById("escritor").innerHTML = request['Writer'];
        document.getElementById("actores").innerHTML = request['Actors'];
        document.getElementById("lenguaje").innerHTML = request['Language'];
        document.getElementById("pais").innerHTML = request['Country'];
        document.getElementById("duracion").innerHTML = request['Runtime'];
        document.getElementById("rated").innerHTML = request['imdbRating'];
        document.getElementById("film-info").dataset.film = request['imdbID'];

        var favoritos = window.localStorage.getItem('favoritos');
        if (favoritos) {
            var favoritos_array = JSON.parse(favoritos);
            if (favoritos_array.indexOf(request['imdbID']) === -1) {
                document.getElementById("favoritos-icon").innerHTML = 'favorite_border';
            } else {
                document.getElementById("favoritos-icon").innerHTML = 'favorite';
            }
        } else {
            document.getElementById("favoritos-icon").innerHTML = 'favorite_border';
        }

        showTabDetail();

    };
    r.send();


}

function addFavorite() {
    var favoritos = window.localStorage.getItem('favoritos');
    var id = document.getElementById("film-info").getAttribute('data-film');
    if (favoritos) {
        var favoritos_array = JSON.parse(favoritos);
        if (favoritos_array.indexOf(id) === -1) {
            favoritos_array.push(id);
            window.localStorage.setItem('favoritos', JSON.stringify(favoritos_array));
            M.toast({html: 'Añadido a favoritos correctamente', classes: 'light-green lighten-1'});
            document.getElementById("favoritos-icon").innerHTML = 'favorite';
        } else {
            favoritos_array.splice(favoritos_array.indexOf(id), 1);
            window.localStorage.setItem('favoritos', JSON.stringify(favoritos_array));
            M.toast({html: 'Eliminado de favoritos correctamente', classes: 'red lighten-1'});
            document.getElementById("favoritos-icon").innerHTML = 'favorite_border';
        }
    } else {
        var favoritos_array = [];
        favoritos_array.push(id);
        window.localStorage.setItem('favoritos', JSON.stringify(favoritos_array));
        M.toast({html: 'Añadido a favoritos correctamente', classes: 'red lighten-1'});
        document.getElementById("favoritos-icon").innerHTML = 'favorite';
    }
}

function showFavoritos() {
    var favoritos = window.localStorage.getItem('favoritos');
    resetFavoritos();
    if (favoritos && favoritos !== '[]') {
        var favoritos_array = JSON.parse(favoritos);
        favoritos_array.forEach(function (valor) {
            var r = new XMLHttpRequest();
            r.open("POST", "http://www.omdbapi.com/?apikey=f12ba140&i=" + valor, true);
            r.onreadystatechange = function () {
                if (r.readyState != 4 || r.status != 200)
                    return;
                var request = JSON.parse(r.responseText);
                printFavoritos(request);
                showTabFavoritos();
            };
            r.send();
        });
    } else {
        showTabNotFound();
    }
}

function print(arr) {
    if (arr['Search']) {
        var films = arr['Search'];
        films.forEach(function (valor) {
            document.getElementById("films").innerHTML +=
                    "<div class='col s6 m4 l3 xl2'>" +
                    "<div onclick='showDetalleFilm(\"" + valor['imdbID'] + "\")' class='card'>" +
                    "<div class='card-image'>" +
                    "<img class='card-image-image' src='" + valor['Poster'] + "'>" +
                    "<span class='card-title'></span>" +
                    "</div>" +
                    "<div class='card-content'>" +
                    "<p>" + valor['Title'] + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
        });
        showTabFilms();
    } else {
        showTabNotFound();
    }

}

function printFavoritos(arr) {
    document.getElementById("favoritos").innerHTML +=
            "<div class='col s12 m4 l3 xl2'>" +
            "<div onclick='showDetalleFilm(\"" + arr['imdbID'] + "\")' class='card'>" +
            "<div class='card-image'>" +
            "<img class='card-image-image' src='" + arr['Poster'] + "'>" +
            "<span class='card-title'></span>" +
            "</div>" +
            "<div class='card-content'>" +
            "<p>" + arr['Title'] + "</p>" +
            "</div>" +
            "</div>" +
            "</div>";
}


function showTabFilms() {
    resetContent();
    document.getElementById("films").classList.remove('hide');
}
function showTabDetail() {
    resetContent();
    document.getElementById("film-info").classList.remove('hide');
}

function showTabNotFound() {
    resetContent();
    document.getElementById("not-found").classList.remove('hide');
}

function showTabFavoritos() {
    resetContent();
    document.getElementById("favoritos").classList.remove('hide');
}

function resetContent() {
    document.getElementById("film-info").classList.add('hide');
    document.getElementById("films").classList.add('hide');
    document.getElementById("not-found").classList.add('hide');
    document.getElementById("favoritos").classList.add('hide');
}

function resetSearch() {
    document.getElementById("films").innerHTML = "";
}
function resetFavoritos() {
    document.getElementById("favoritos").innerHTML = "";
}
