const form = document.getElementById("myForm"),
    passwordInput = document.getElementById("password"),
    passToggleBtn = document.getElementById("pass-toggle-btn"),
    thankYouMessage = document.getElementById("thank-you-content");

const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
};

const checkPasswordStrength = (password) => 
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);

const validatePassword = (password) => {
    if (password === "") {
        showError(passwordInput, "Crie sua senha");
    } else if (!checkPasswordStrength(password)) {
        showError(
            passwordInput,
            "Insira pelo menos 8 caracteres contendo um número, símbolo, letra minúscula e letra maiúscula."
        );
    }

};

const validateName = (input) => {
    const regex = /^[a-zA-Z\s]*$/;
    const errorContainer = input.closest(".form-group");
    const errorText = errorContainer.querySelector(".error-text");

    if (!regex.test(input.value)) {
        if (!errorText) {
            showError(input, "Insira apenas letras no campo Nome Completo");
        }
    } else {
        if (errorText) {
            errorText.remove();
            input.classList.remove("error");
        }
    }
};

const handleFormData = (event) => {
    event.preventDefault();
    const [fullnameInput, emailInput, dateInput, genderInput] = [
        "fullname",
        "email",
        "date",
        "gender"
    ].map((id) => document.getElementById(id));

    const [fullname, email, password, date, gender] = [
        fullnameInput,
        emailInput,
        passwordInput,
        dateInput,
        genderInput
    ].map((input) => input.value.trim());

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    document
        .querySelectorAll("form-group .error")
        .forEach((field) => field.classList.remove("error"));
    document
        .querySelectorAll(".error-text")
        .forEach((errorText) => errorText.remove());
    
    if (fullname === "") showError(fullnameInput, "Insira seu nome completo");
    if (!emailPattern.test(email))
        showError(emailInput, "Insira um email válido");
    validatePassword(password);
    if (date === "") showError(dateInput, "Selecione a data de nascimento");
    if (gender === "") showError(genderInput, "Selecione seu gênero");
    if (!document.querySelectorAll(".form-group .error").length) {
        form.style.display = "none";
        thankYouMessage.style.display = "block";
    }
};

passToggleBtn.addEventListener("click", () => {
    passToggleBtn.className =
      passwordInput.type === "password"
        ? "fa-solid fa-eye-slash"
        : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  });

form.addEventListener("submit", handleFormData);