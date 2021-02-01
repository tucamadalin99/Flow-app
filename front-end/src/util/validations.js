const emailRegex = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
const letterRegex = "[A-Za-z]";

export let nonEmpty = (val) => (val && val.length > 0) || 'Cannot be empty'
export const letterOnly = (val) =>
    val.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/) || 'Letter only'
export const emailPattern = val => emailRegex.test(val) || "The email adress is not valid";
export const nonEmptySelect = val => { if (val === null) return "You must select a value" }