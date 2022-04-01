window.top.document.getElementById("bonkioheader").remove()
window.top.document.getElementById("descriptioncontainer").remove()
document.getElementById("newbonkgamecontainer").classList.add("zoom")
document.getElementById("mainmenuelements").classList.add("zoom")
document.getElementById("prettymenu").classList.add("zoom");

const tada_elements = ["pretty_top_name", "pretty_top_level", "pretty_top_playercount"]
for (let i = 0; i < tada_elements.length; i++) {
    document.getElementById(tada_elements[i]).addEventListener("mouseenter", () => {
        anime({
            targets: element_xp_bar,
            bottom: "0px",
            autoplay: true,
            duration: 120,
            easing: "easeOutSine"
        })
    })
    document.getElementById(tada_elements[i]).addEventListener("mouseleave", () => {
        anime({
            targets: element_xp_bar,
            bottom: "-40px",
            autoplay: true,
            duration: 120,
            easing: "easeInSine"
        })
    })
}