window.addEventListener("load", () => {
    let id = 0;
    let text = "";
    let alert = document.querySelector(".alert");
    let close = alert.firstElementChild;
    let input = document.querySelector("#task");
    let arrow = document.querySelector(".arrow");
    //let table = document.querySelector(."arrow");
    close.addEventListener("click", () => {
        alert.classList.add("dismissible");
    });
    input.addEventListener("focus", () => {
        document.addEventListener("keydown", (event) => {
            console.log(event.code);

            if (event.code == "Enter" || event.code == "NumpadEnter") {
                event.preventDefault();

            }
        });
    });
    arrow.addEventListener("click", (e) => {
        //trim() se come los espacios al principio y al final del string
        if (input.value.trim() == "") {
            console.log("Empty");
            e.preventDefault(); //prevent submit
            input.value = ""; // reset value
            alert.classList.remove("dismissible");
        } else {
            let text = input.value;
            input.value = ""; //El input vuelve a vaciarse.
            id = Number(document.querySelector("tbody")?.lastElementChild.id) + 1 || 0;
            console.log(id); // EL ?. consigue que la consola no funcione si no contiene lo que se le pide.
            //CREANDO UNA NUEVA FILA.

            document.querySelector("tbody").appendChild(generateRow(id, text));
            if (!alert.classList.contains("dismissible")) {
                alert.classList.add("dismissible");

            }
        }
    });

});
//Se le añade la clase dismissible para hacerla desaparecer.
const generateRow = (id, text) => {
    let newRow = document.createElement("tr");
    newRow.setAttribute("id", id);
    newRow.innerHTML = `
                <td><i class="fa-solid fa-circle-check fa-2x"></i><span class="task"
                                contenteditable="true">${text}</span></td >
                        <td> <span class="fa-stack fa-2x">
                                <i class="fa-solid fa-square fa-stack-2x"></i>
                                <i class="fa-solid fa-pencil fa-stack-1x fa-inverse"></i></span></td>
                        <td><span class="fa-stack fa-2x">
                                <i class="fa-solid fa-square fa-stack-2x"></i>
                                <i class="fa-solid fa-trash fa-stack-1x fa-inverse"></i></span></td>
            `;
    return newRow;

};
