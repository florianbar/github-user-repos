function fetchJSON(url) {  
    return new Promise((resolve, reject) => {
        $.getJSON(url)
            .done((json) => resolve(json))
            .fail((xhr, status, err) => reject(status + err.message));
    });
}

function getUserInfo(username) {
    let promise = fetchJSON("https://api.github.com/users/" + username);

    promise.then((reponse) => {
        console.log(reponse);
    })
    .catch((err) => {
        console.log(err);
    });
}

function getUserRepos(username) {
    let promise = fetchJSON("https://api.github.com/users/" + username + "/repos?callback=?");
    
    promise.then((reponse) => {
        console.log(reponse.data);
    })
    .catch((err) => {
        console.log(err);
    });
}

$(function() {

    $('#form-github-search').submit((e) => {
        e.preventDefault();

        let username = $('#search').val();
        getUserInfo(username);
        getUserRepos(username);
    });

});