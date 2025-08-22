// Footer dynamic year

const today = new Date();
let year = today.getFullYear()

document.getElementById("year").textContent = year

// Navbar active toggle
const anchors = document.querySelectorAll(".nav");

const active = (e) => {
    anchors.forEach(a => {
        a.classList.add("active");
    })
    this.classList.remove("active")
}
anchors.forEach(anchor => {
    anchor.addEventListener("click", active)
});