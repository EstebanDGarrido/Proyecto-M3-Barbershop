const regexEmail = /\S+@\S+\.\S+/;
const regexLetter = /(?=.*[A-Za-z])/;
const regexNumber = /(?=.*\d)/;
const regexSpecial = /(?=.*[@$!%*?&#])/;
const regexDate = /^\d{4}-\d{2}-\d{2}$/;

const validateUser = ({
    name,
    username,
    password,
    confirmPassword,
    email,
    birthdate,
    nDni
}) => {
    const errors = {};
    if (!name) errors.name = "Ingresar un nombre";
    else {
        if (name.length < 4) errors.name = "Nombre de al menos 4 caracteres";
        if (name.length > 50) errors.name = "Nombre no mayor a 50 caracteres";
    }
    if (!email) errors.email = "Ingresar un email";
    else {
        if (!regexEmail.test(email))
            errors.email = "El email no tiene un formato válido (texto@texto.texto)";
    }
    if (!birthdate) errors.birthdate = "Ingresar fecha de nacimiento";
    else {
        if (!regexDate.test(birthdate))
            errors.birthdate = "Fecha de nacimiento en formato yyyy-mm-dd";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const birthdateDate = new Date(birthdate);
        const ageDiff = new Date(today.getTime() - birthdateDate.getTime());
        const age = ageDiff.getUTCFullYear() - 1970;
        if (age < 16)
            errors.birthdate = "No se admiten usuarios menores de 16 años";
    }
    if (!nDni) errors.nDni = "Ingresar DNI";
    else {
        if (isNaN(Number(nDni))) errors.nDni = "El DNI debe ser un número";
        if (nDni < 0) errors.nDni = "El DNI debe ser un número positivo";
    }
    if (!username) errors.username = "Ingresar un nombre de usuario";
    else {
        if (username.length < 4)
            errors.username = "Nombre de usuario de al menos 4 caracteres";
        if (username.length > 20)
            errors.username = "Nombre de usuario no mayor a 20 caracteres";
    }
    if (!password) errors.password = "Ingresar una contraseña";
    else {
        if (password.length < 4)
            errors.password = "Contraseña de al menos 4 caracteres";
        if (password.length > 10)
            errors.password = "Contraseña no mayor a 10 caracteres";
        if (!regexLetter.test(password))
            errors.password = "Contraseña con al menos una letra";
        if (!regexNumber.test(password))
            errors.password = "Contraseñá con al menos un numero";
        if (!regexSpecial.test(password))
            errors.password = "Contraseña con al menos un caracter especial: @$!%*?&#"
    }
    if (password !== confirmPassword)
        errors.confirmPassword = "La contraseña y confirmación no son iguales"
    return errors;
}

export default validateUser;

console.log(
    validateUser({
        name: "Esteban",
        username: "Cacha",
        password: "abc1!",
        confirmPassword: "abc1!",
        email: "cacha@mail.com",
        birthdate: "1997-11-20",
        nDni: "1116277271",
    })
);