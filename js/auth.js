const USER_API = "http://localhost:3000/users";

const toggleAuthBox = () => {
    const loginBox = document.getElementById("login-box");
    const registerBox = document.getElementById("register-box");

    if (loginBox.style.display === "none") {
        loginBox.style.display = "block";
        registerBox.style.display = "none";
    } else {
        loginBox.style.display = "none";
        registerBox.style.display = "block";
    }
};

const validateEmail = () => {
    const emailInput = document.getElementById("reg-email");
    const error = document.getElementById("error-email");
    const emailValue = emailInput.value.trim();

    if (emailValue === "") {
        error.textContent = "không được bỏ trống Email!";
        error.style.display = "block";
        return false;
    }

    if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".com") === -1) {
        error.textContent = "email không hợp lệ";
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    return true;
};

const validatePassword = () => {
    const passInput = document.getElementById("reg-password");
    const error = document.getElementById("error-password");
    const passValue = passInput.value.trim();

    if (passValue === "") {
        error.textContent = "mật khẩu không được để trống!";
        error.style.display = "block";
        return false;
    }

    if (passValue.length < 8) {
        error.textContent = "mật khẩu phải dài từ 8 ký tự trở lên!";
        error.style.display = "block";
        return false;
    }

    error.style.display = "none";
    return true;
};

async function handleRegister() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    const emailValue = document.getElementById("reg-email").value.trim();
    const passwordValue = document.getElementById("reg-password").value.trim();

    const newUser = {
        email: emailValue,
        password: passwordValue,
        role: "user",
    };

    if (emailValue === "" || passwordValue === "") {
        alert("vui lòng điền đầy đủ thông tin!");
        return;
    }

    try {
        const response = await fetch(USER_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        });

        if (response.ok) {
            alert("đăng ký tài khoản thành công!");
            toggleAuthBox();
        }
    } catch (error) {
        console.error("lỗi đăng ký:", error);
    }
}

async function handleLogin() {
    const emailValue = document.getElementById("login-email").value.trim();
    const passwordValue = document
        .getElementById("login-password")
        .value.trim();

    if (emailValue === "" || passwordValue === "") {
        alert("vui lòng điền đầy đủ thông tin!");
        return;
    }

    try {
        const response = await fetch(USER_API);
        const usersList = await response.json();

        const matchedUser = usersList.find(
            (user) =>
                user.email === emailValue && user.password === passwordValue,
        );

        if (matchedUser) {
            alert("đăng nhập thành công!");

            localStorage.setItem("userId", matchedUser.id);
            localStorage.setItem("userRole", matchedUser.role);

            if (matchedUser.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "home.html";
            }
        } else {
            alert("sai tài khoản hoặc mật khẩu!");
        }
    } catch (error) {
        console.error("lỗi đăng nhập:", error);
    }
}

function checkHeaderAuth() {
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    const adminBtn = document.getElementById("admin-btn");
    const loginZone = document.getElementById("login-btn-zone");
    const logoutZone = document.getElementById("logout-btn-zone");

    if (userId) {
        if (loginZone) loginZone.style.display = "none";
        if (logoutZone) logoutZone.style.display = "block";
    } else {
        if (loginZone) loginZone.style.display = "block";
        if (logoutZone) logoutZone.style.display = "none";
    }

    if (role === "admin" && adminBtn) {
        adminBtn.style.display = "block";
    } else if (adminBtn) {
        adminBtn.style.display = "none";
    }
}

function logoutPublic() {
    localStorage.clear();
    alert("Đã đăng xuất tài khoản!");
    window.location.reload();
}

checkHeaderAuth();
