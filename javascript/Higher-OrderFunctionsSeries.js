function countDevelopers(list) {
    return list.filter(
        (value, index) => {
            return value.continent == 'Europe' && value.language == 'JavaScript';
        }
    ).length;
}