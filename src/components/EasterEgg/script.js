const almond = document.querySelector('#almond')
const death = document.querySelector('#death')
const devil = document.querySelector('#devil')

const jump = () => {
    if(almond.classList !== "jump") {
        almond.classList.add("jump")

        setTimeout(() => {
            almond.classList.remove("jump");
        }, 500)
    }
}

document.addEventListener("keydown", () => {
    jump()
});

let isAlive = setInterval(() => {
    // get almond Y position
    let almondTop = parseInt(window.getComputedStyle(almond).getPropertyValue("top"))
    // get death X position
    let deathLeft = parseInt(window.getComputedStyle(death).getPropertyValue("left"))

    if(deathLeft < 30 && deathLeft >0 && almondTop >= 130) {
        alert('아몬드가 죽으면?')
    }
}, 10)

