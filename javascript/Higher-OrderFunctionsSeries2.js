function greetDevelopers(list) {
    return list.map(
        (value, index) => {
            var first = value.firstName;
            var language = value.language;
            console.log(first, language);
            value['greeting'] = `Hi ${first}, what do you like the most about ${language}?`;
            return value;
        }
    );
}

greetDevelopers(list1)