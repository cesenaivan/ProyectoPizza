
addEventListener("DOMContentLoaded", () => {
   
    const form = document.getElementById("form");
    console.log(form);
    form.addEventListener("submit", (e) => {
        e.preventDefault()
       
       
        const formDATA = new FormData(form);
       
        const data = Object.fromEntries(formDATA);
       
        fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type':'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            const cajaValidacion = document.querySelector("form div");
            cajaValidacion.textContent = data;
            if (data === "Usuario registrado correctamente!") {
                cajaValidacion.classList.add("success");
                setTimeout(() => {
                    location.href = "/";
                }, 5000);
            } else {
                cajaValidacion.classList.add("error");
            }
        });
    });
});
