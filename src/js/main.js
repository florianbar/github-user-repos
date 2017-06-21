class GithubSearchModel {

    constructor() {
        this.username   = ko.observable();
        this.info       = ko.observable();
        this.repos      = ko.observableArray();
    }

    searchUser() {
        this._getUserInfo();
        this._getUserRepos();
    }

    _getUserInfo() {
        let promise = this._fetchJSON(`https://api.github.com/users/${this.username()}`);

        promise.then((reponse) => {
            this.info(reponse);
        })
        .catch((err) => {
            this.info(null);
        });
    }

    _getUserRepos() {
        let promise = this._fetchJSON(`https://api.github.com/users/${this.username()}/repos?callback=?`);
        
        promise.then((reponse) => {
            this.repos(reponse.data);
        })
        .catch((err) => {
            this.repos(null);
        });
    }

    _fetchJSON(url) {  
        return new Promise((resolve, reject) => {
            $.getJSON(url)
                .done((json) => resolve(json))
                .fail((xhr, status, err) => reject(status + err.message));
        });
    }
};

let githubSearchModel = new GithubSearchModel();

$(() => {
    ko.applyBindings(githubSearchModel);
});