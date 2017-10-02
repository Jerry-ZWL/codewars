function findAdmin(list, lang) {
    var langList = list.filter(
        (value, index) => {
            return value["language"] === lang;
        }
    );
    console.log(langList);

    var gitAdmin = langList.filter(
        (value, index) => {
            return value['githubAdmin'] === "yes";
        }
    );
    return gitAdmin;
}