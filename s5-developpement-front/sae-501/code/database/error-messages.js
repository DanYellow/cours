export const errorRequiredMessage = (title = "un champ") => {
    return `Veuillez mettre ${title}, le champ ne peut pas être nul ou vide`;
};

export const mapZodErrors = (listIssues = []) => {
    const listErrors = [];
    listIssues.forEach((issue) => {
        listErrors.push({ message: issue.message, field: issue.path[0] })
    })

    return listErrors;
}