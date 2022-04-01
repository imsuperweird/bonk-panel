var resizeEnd
let default_panel = {
    top_size: 35,
    font_size: 13,
    spacing_size: 5
}
let resize_directly = false
const element_styleTop = document.createElement("style")
element_styleTop.innerHTML = ".gameframe{position: fixed !important; z-index:50 !important; margin-top: 0px !important;}"
window.top.document.head.appendChild(element_styleTop)

window.top.document.body.style.overflow = "hidden"
window.top.document.getElementById("maingameframe").classList.add("gameframe")

const element_style = document.createElement("style")
element_style.innerHTML = '.no-select{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.divider-x{height:10px;background-color:red;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");background-position:50% center;background-size:auto 60%;background-repeat:no-repeat;cursor:row-resize}.divider-y{width:10px;background-color:green;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");background-position:50% center;background-size:60% auto;background-repeat:no-repeat;cursor:col-resize}.container{width:100%!important;height:100%!important;border:none!important}#pretty_top_link{width:58px;height:34px;background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE3IDdoLTR2Mmg0YzEuNjUgMCAzIDEuMzUgMyAzcy0xLjM1IDMtMyAzaC00djJoNGMyLjc2IDAgNS0yLjI0IDUtNXMtMi4yNC01LTUtNXptLTYgOEg3Yy0xLjY1IDAtMy0xLjM1LTMtM3MxLjM1LTMgMy0zaDRWN0g3Yy0yLjc2IDAtNSAyLjI0LTUgNXMyLjI0IDUgNSA1aDR2LTJ6bS0zLTRoOHYySDh6Ii8+PC9zdmc+");background-size:24px 24px;background-repeat:no-repeat;background-position:center;position:absolute;right:290px;top:0}'
element_style.innerHTML += '#pretty_top_panel{width:58px;height:34px;background-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxNiAxNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yLDEwaDNjMC42LDAsMSwwLjQsMSwxdjNjMCwwLjYtMC40LDEtMSwxSDJjLTAuNiwwLTEtMC40LTEtMXYtM0MxLDEwLjQsMS40LDEwLDIsMTB6IE0xMSwxaDNjMC42LDAsMSwwLjQsMSwxDQoJdjNjMCwwLjYtMC40LDEtMSwxaC0zYy0wLjYsMC0xLTAuNC0xLTFWMkMxMCwxLjQsMTAuNCwxLDExLDF6IE0xMSwxMGMtMC42LDAtMSwwLjQtMSwxdjNjMCwwLjYsMC40LDEsMSwxaDNjMC42LDAsMS0wLjQsMS0xdi0zDQoJYzAtMC42LTAuNC0xLTEtMUgxMXogTTExLDBDOS45LDAsOSwwLjksOSwydjNjMCwxLjEsMC45LDIsMiwyaDNjMS4xLDAsMi0wLjksMi0yVjJjMC0xLjEtMC45LTItMi0ySDExeiBNMiw5Yy0xLjEsMC0yLDAuOS0yLDJ2Mw0KCWMwLDEuMSwwLjksMiwyLDJoM2MxLjEsMCwyLTAuOSwyLTJ2LTNjMC0xLjEtMC45LTItMi0ySDJ6IE05LDExYzAtMS4xLDAuOS0yLDItMmgzYzEuMSwwLDIsMC45LDIsMnYzYzAsMS4xLTAuOSwyLTIsMmgtMw0KCWMtMS4xLDAtMi0wLjktMi0yVjExeiBNMCwyYzAtMS4xLDAuOS0yLDItMmgzYzEuMSwwLDIsMC45LDIsMnYzYzAsMS4xLTAuOSwyLTIsMkgyQzAuOSw3LDAsNi4xLDAsNVYyeiBNNS40LDIuOQ0KCWMwLjItMC4yLDAuMi0wLjUsMC0wLjdDNS4yLDIsNC44LDIsNC42LDIuMUwzLDMuOEwyLjQsMy4xQzIuMiwzLDEuOCwzLDEuNiwzLjFzLTAuMiwwLjUsMCwwLjdsMCwwbDEsMUMyLjgsNSwzLjIsNSwzLjQsNC45DQoJYzAsMCwwLDAsMCwwTDUuNCwyLjl6Ii8+DQo8L3N2Zz4NCg==");background-size:24px 24px;background-repeat:no-repeat;background-position:center;position:absolute;right:348px;top:0}'
element_style.innerHTML += '.panel-top{display:flex;background-color:#009688;width:100%}.panel-top-items{display:flex;align-items:center;justify-content:space-between;height:100%;flex:1}.panel-top-items:hover{background-color:#15756b}.panel-top-icon{margin:3%;height:100%;height:70%;aspect-ratio:1/1;background-size:100% 100%}.panel-top-close{cursor:pointer;display:block;margin:3%;height:40%;aspect-ratio:1/1;background-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7fQ0KCS5zdDF7ZmlsbDojRkZGRkZGO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCwwaDI0djI0SDBWMHoiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOSw2LjRMMTcuNiw1TDEyLDEwLjZMNi40LDVMNSw2LjRsNS42LDUuNkw1LDE3LjZMNi40LDE5bDUuNi01LjZsNS42LDUuNmwxLjQtMS40TDEzLjQsMTJMMTksNi40eiIvPg0KPC9zdmc+DQo=");background-size:100% 100%}'
element_style.innerHTML += '.panel-top-close:hover{filter:none!important;background-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOm5vbmU7fQ0KCS5zdDF7ZmlsbDojRkYwMDAwO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMCwwaDI0djI0SDBWMHoiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xOSw2LjRMMTcuNiw1TDEyLDEwLjZMNi40LDVMNSw2LjRsNS42LDUuNkw1LDE3LjZMNi40LDE5bDUuNi01LjZsNS42LDUuNmwxLjQtMS40TDEzLjQsMTJMMTksNi40eiIvPg0KPC9zdmc+DQo=")}.panel-top-items-active{background-color:#d2dbde!important}.panel-top-items-active .panel-top-icon{filter:invert(1)}.panel-top-items-active .panel-top-close{filter:invert(1)}.panel-bottom{background-color:#d2dbde;flex:1;font-family:"futurept_b1"}.panel-bottom-nothing-img{display:none;background-image:url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjQgMjQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMzQTNBM0E7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMS4xLDEyLjljMC44LTEuNCwyLjItMi4yLDMuMS0zLjRjMC45LTEuMywwLjQtMy43LTIuMi0zLjdjLTEuNywwLTIuNSwxLjMtMi45LDIuM0w2LjUsN0M3LjIsNC44LDkuMiwzLDEyLDMNCgljMi40LDAsNCwxLjEsNC44LDIuNGMwLjcsMS4yLDEuMSwzLjMsMCw0LjljLTEuMiwxLjgtMi40LDIuMy0zLDMuNGMtMC4yLDAuNS0wLjQsMC44LTAuNCwyLjJoLTIuOUMxMC42LDE1LjIsMTAuNSwxMy45LDExLjEsMTIuOXoNCgkgTTE0LDIwYzAsMS4xLTAuOSwyLTIsMnMtMi0wLjktMi0yczAuOS0yLDItMlMxNCwxOC45LDE0LDIweiIvPg0KPC9zdmc+DQo=");background-repeat:no-repeat;background-size:100% 100%;width:100%;height:100%;opacity:.3;cursor:pointer}.panel-top-items-dragging{background-color:#c1cdd2!important}'
element_style.innerHTML += '#join_room_with_link_window_container{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;width:300px;height:170px}#join_room_with_link_behind_blocker{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;outline:3000px solid rgba(0,0,0,.3);width:1px;height:1px}#join_room_with_link_window{position:relative;width:100%;height:100%;background-color:#e2e2e2;pointer-events:auto!important;border-radius:7px}#join_room_with_link_top{font-family:futurept_b1;color:#fff;text-align:center;line-height:32px;font-size:19px;border-top-left-radius:3px;border-top-right-radius:3px}#join_room_with_link_window_label{position:absolute;height:35px;left:34px;top:40px;text-align:left;vertical-align:middle;line-height:35px;font-size:16px;font-family:futurept_b1}#join_room_with_link_text{position:absolute;top:70px;left:0;right:0;margin:auto;width:222px;padding:3px;font-size:17px;text-align:center;font-family:futurept_b1;border:1px solid #bdbdbd}.join_room_with_link_bottom_button{position:absolute;bottom:15px;text-align:center;vertical-align:middle;height:30px;width:90px;line-height:30px;font-size:16px;cursor:pointer}#join_room_with_link_join_button{right:35px}#join_room_with_link_cancel_button{left:35px}#pretty_top_fps{color:#ffffff8f;font-family:futurept_b1;line-height:35px;display:inline-block;padding-left:15px;padding-right:15px}'
element_style.innerHTML += '#xp-bar{background-color:#273749c7;position:absolute;width:100%;height:35px;bottom:-40px}#xp-value{color:#fff;position:absolute;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:futurept_b1}#xp-fill{width:10%;height:100%;background-color:rgba(0,0,0,.9);-webkit-transition:width .5s;-moz-transition:width .5s;-ms-transition:width .5s;-o-transition:width .5s;transition:width .5s}'
document.body.appendChild(element_style)

const element_style_root = document.createElement("style")
element_style_root.innerHTML = ':root{--panel-top-size-left:' + default_panel.top_size + 'px;--panel-font-size-left:' + default_panel.font_size + 'px;--panel-spacing-size-left:' + default_panel.spacing_size + 'px;--panel-top-size-right:' + default_panel.top_size + 'px;--panel-font-size-right:' + default_panel.font_size + 'px;--panel-spacing-size-right:' + default_panel.spacing_size + 'px}'
document.body.appendChild(element_style_root)

const element_style_zoom = document.createElement("style")
element_style_zoom.innerHTML = '.zoom{}'
document.body.appendChild(element_style_zoom)

document.getElementById("pagecontainer").style.flexDirection = "row"
document.getElementById("bonkiocontainer").classList.add("container")

const element_left_panel = document.createElement("div")
element_left_panel.id = "left-panel"
element_left_panel.style.display = "flex"
element_left_panel.style.flexDirection = "column"
element_left_panel.style.overflow = "hidden"
const element_panel1 = document.createElement("div")
element_panel1.id = "panel1"
element_panel1.style.overflowX = "hidden"
element_panel1.style.overflowY = "auto"
element_panel1.style.display = "flex"
element_panel1.style.flexDirection = "column"
const element_panel_top1 = document.createElement("div")
element_panel_top1.classList.add("panel-top")
element_panel_top1.style.height = "var(--panel-top-size-left)"
element_panel1.appendChild(element_panel_top1)
const element_panel_bottom1 = document.createElement("div")
element_panel_bottom1.classList.add("panel-bottom")
element_panel_bottom1.style.fontSize = "var(--panel-font-size-left)"
const panel_bottom_nothing_img1 = document.createElement("div")
panel_bottom_nothing_img1.classList.add("panel-bottom-nothing-img")
element_panel_bottom1.appendChild(panel_bottom_nothing_img1)
element_panel1.appendChild(element_panel_bottom1)
element_left_panel.appendChild(element_panel1)
const element_divider_left = document.createElement("div")
element_divider_left.id = "dividerLeft"
element_divider_left.classList.add("divider-x")
element_left_panel.appendChild(element_divider_left)
const element_panel2 = document.createElement("div")
element_panel2.id = "panel2"
element_panel2.style.overflowX = "hidden"
element_panel2.style.overflowY = "auto"
element_panel2.style.display = "flex"
element_panel2.style.flexDirection = "column"
const element_panel_top2 = document.createElement("div")
element_panel_top2.classList.add("panel-top")
element_panel_top2.style.height = "var(--panel-top-size-left)"
element_panel2.appendChild(element_panel_top2)
const element_panel_bottom2 = document.createElement("div")
element_panel_bottom2.classList.add("panel-bottom")
element_panel_bottom2.style.fontSize = "var(--panel-font-size-left)"
const panel_bottom_nothing_img2 = document.createElement("div")
panel_bottom_nothing_img2.classList.add("panel-bottom-nothing-img")
element_panel_bottom2.appendChild(panel_bottom_nothing_img2)
element_panel2.appendChild(element_panel_bottom2)
element_left_panel.appendChild(element_panel2)
document.getElementById("pagecontainer").appendChild(element_left_panel)

const element_divider1 = document.createElement("div")
element_divider1.id = "divider1"
element_divider1.classList.add("divider-y")
document.getElementById("pagecontainer").appendChild(element_divider1)

const element_middle_panel = document.createElement("div")
element_middle_panel.id = "middle-panel"
element_middle_panel.style.overflow = "hidden"
element_middle_panel.style.display = "flex"
element_middle_panel.style.flexDirection = "column"
element_middle_panel.style.alignContent = "center"
element_middle_panel.style.justifyContent = "center"
const element_bonkcontainer = document.createElement("div")
element_bonkcontainer.id = "bonkcontainer"
element_bonkcontainer.style.aspectRatio = "73 / 50"
element_bonkcontainer.appendChild(document.getElementById("bonkiocontainer"))
element_middle_panel.appendChild(element_bonkcontainer)
document.getElementById("pagecontainer").appendChild(element_middle_panel)

const element_divider2 = document.createElement("div")
element_divider2.id = "divider2"
element_divider2.classList.add("divider-y")
document.getElementById("pagecontainer").appendChild(element_divider2)

const element_right_panel = document.createElement("div")
element_right_panel.id = "right-panel"
element_right_panel.style.display = "flex"
element_right_panel.style.flexDirection = "column"
element_right_panel.style.overflow = "hidden"
const element_panel3 = document.createElement("div")
element_panel3.id = "panel3"
element_panel3.style.overflowX = "hidden"
element_panel3.style.overflowY = "auto"
element_panel3.style.display = "flex"
element_panel3.style.flexDirection = "column"
const element_panel_top3 = document.createElement("div")
element_panel_top3.classList.add("panel-top")
element_panel_top3.style.height = "var(--panel-top-size-right)"
element_panel3.appendChild(element_panel_top3)
const element_panel_bottom3 = document.createElement("div")
element_panel_bottom3.classList.add("panel-bottom")
element_panel_bottom3.style.fontSize = "var(--panel-font-size-right)"
const panel_bottom_nothing_img3 = document.createElement("div")
panel_bottom_nothing_img3.classList.add("panel-bottom-nothing-img")
element_panel_bottom3.appendChild(panel_bottom_nothing_img3)
element_panel3.appendChild(element_panel_bottom3)
element_right_panel.appendChild(element_panel3)
const element_divider_right = document.createElement("div")
element_divider_right.id = "dividerRight"
element_divider_right.classList.add("divider-x")
element_right_panel.appendChild(element_divider_right)
const element_panel4 = document.createElement("div")
element_panel4.id = "panel4"
element_panel4.style.overflowX = "hidden"
element_panel4.style.overflowY = "auto"
element_panel4.style.display = "flex"
element_panel4.style.flexDirection = "column"
const element_panel_top4 = document.createElement("div")
element_panel_top4.classList.add("panel-top")
element_panel_top4.style.height = "var(--panel-top-size-right)"
element_panel4.appendChild(element_panel_top4)
const element_panel_bottom4 = document.createElement("div")
element_panel_bottom4.classList.add("panel-bottom")
element_panel_bottom4.style.fontSize = "var(--panel-font-size-right)"
const panel_bottom_nothing_img4 = document.createElement("div")
panel_bottom_nothing_img4.classList.add("panel-bottom-nothing-img")
element_panel_bottom4.appendChild(panel_bottom_nothing_img4)
element_panel4.appendChild(element_panel_bottom4)
element_right_panel.appendChild(element_panel4)
document.getElementById("pagecontainer").appendChild(element_right_panel)

function VERTICAL(left_value, middle_value, right_value, divider_width_value, container_id, left_id, divider1_id, middle_id, divider2_id, right_id) {
    const value = {
        left: left_value,
        middle: middle_value,
        right: right_value,
        x: 0,
        divider_left: null,
        divider_width: divider_width_value
    }

    const element = {
        container: document.getElementById(container_id),
        left: document.getElementById(left_id),
        divider1: document.getElementById(divider1_id),
        middle: document.getElementById(middle_id),
        divider2: document.getElementById(divider2_id),
        right: document.getElementById(right_id)
    }

    const width = {
        container: element.container.getBoundingClientRect().width,
        left: null,
        right: null,
        aspect_ratio: null
    }

    element.divider1.onmousedown = e => {
        value.divider_left = true
        mouseDown(e)
    }

    element.divider2.onmousedown = e => {
        value.divider_left = false
        mouseDown(e)
    }

    function windowResize() {
        resize()
        width.container = element.container.getBoundingClientRect().width
        width.aspect_ratio = window.top.innerHeight * 73 / 50 * 100 / width.container
        if (value.middle > width.aspect_ratio) {
            value.middle = width.aspect_ratio
            value.left = (100 - value.middle) / 2
            value.right = (100 - value.middle) / 2
        }
        resize()
        zoom()
    }
    windowResize()

    function resize() {
        element.left.style.width = "calc(" + value.left + "% - " + value.divider_width / 2 + "px)"
        element.middle.style.width = "calc(" + value.middle + "% - " + value.divider_width + "px)"
        element.right.style.width = "calc(" + value.right + "% - " + value.divider_width / 2 + "px)"
        if (resize_directly) zoom()
    }

    function zoom() {
        element_style_zoom.innerHTML = ".zoom{zoom:" + document.getElementById("bonkiocontainer").getBoundingClientRect().height / 700 + " !important}"
        element_style_root.innerHTML = ':root{--panel-top-size-left:' + element.left.getBoundingClientRect().width / 230 * default_panel.top_size + 'px;--panel-font-size-left:' + element.left.getBoundingClientRect().width / 230 * default_panel.font_size + 'px;--panel-spacing-size-left:' + element.left.getBoundingClientRect().width / 230 * default_panel.spacing_size + 'px;--panel-top-size-right:' + element.right.getBoundingClientRect().width / 230 * default_panel.top_size + 'px;--panel-font-size-right:' + element.right.getBoundingClientRect().width / 230 * default_panel.font_size + 'px;--panel-spacing-size-right:' + element.right.getBoundingClientRect().width / 230 * default_panel.spacing_size + 'px}'
    }

    window.top.onresize = () => {
        if (resize_directly) {
            windowResize()
        } else {
            clearTimeout(resizeEnd)
            resizeEnd = setTimeout(windowResize, 250)
        }
    }

    function mouseDown(event) {
        if (PANEL_CHANGING) return
        removePanelChangingEvent()
        PANEL_RESIZING = true
        value.x = event.clientX
        width.left = element.left.getBoundingClientRect().width
        width.right = element.right.getBoundingClientRect().width
        document.body.classList.add("no-select")
        document.body.style.cursor = "col-resize"
        document.onmousemove = mouseMove
        document.onmouseup = mouseUp
    }

    function mouseMove(event) {
        if (PANEL_CHANGING) mouseUp()
        width.container = element.container.getBoundingClientRect().width
        width.aspect_ratio = window.top.innerHeight * 73 / 50 * 100 / width.container
        const dx = event.clientX - value.x

        if (event.shiftKey) {
            const vx = value.divider_left ? (width.left + dx) * 100 / width.container : (width.right - dx) * 100 / width.container
            value.middle = 100 - vx * 2
            if (value.middle < 0) {
                value.middle = 0
            } else if (value.middle > 100) {
                value.middle = 100
            }
            if (value.middle > width.aspect_ratio) {
                value.middle = width.aspect_ratio
            }
            value.left = (100 - value.middle) / 2
            value.right = (100 - value.middle) / 2
        } else {
            if (value.divider_left) {
                const xyz = (width.left + dx) * 100 / width.container
                if (100 - xyz - value.right > width.aspect_ratio) return
                value.left = xyz
                if (value.left < 0) {
                    value.left = 0
                } else if (value.left > 100 - value.right) {
                    value.left = 100 - value.right
                }
            } else {
                const xyz = (width.right - dx) * 100 / width.container
                if (100 - xyz - value.left > width.aspect_ratio) return
                value.right = xyz
                if (value.right < 0) {
                    value.right = 0
                } else if (value.right > 100 - value.left) {
                    value.right = 100 - value.left
                }
            }
            value.middle = 100 - value.left - value.right
        }
        resize()
    }

    function mouseUp() {
        PANEL_RESIZING = false
        value.divider_left = null
        document.body.classList.remove("no-select")
        document.body.style.removeProperty('cursor')
        document.onmousemove = null
        document.onmouseup = null
        zoom()
    }
}

function HORIZONTAL(panel1_value, panel2_value, panel3_value, panel4_value, divider_height_value, left_id, panel1_id, dividerleft_id, panel3_id, right_id, panel2_id, dividerright_id, panel4_id) {
    const value = {
        panel1: panel1_value,
        panel2: panel2_value,
        panel3: panel3_value,
        panel4: panel4_value,
        y: 0,
        divider_left: null,
        divider_height: divider_height_value
    }

    const element = {
        left: document.getElementById(left_id),
        panel1: document.getElementById(panel1_id),
        dividerleft: document.getElementById(dividerleft_id),
        panel3: document.getElementById(panel3_id),
        right: document.getElementById(right_id),
        panel2: document.getElementById(panel2_id),
        dividerright: document.getElementById(dividerright_id),
        panel4: document.getElementById(panel4_id),
    }

    const width = {
        left: element.left.getBoundingClientRect().height,
        panel1: null,
        right: element.right.getBoundingClientRect().height,
        panel2: null
    }

    element.dividerleft.onmousedown = e => {
        value.divider_left = true
        mouseDown(e)
    }

    element.dividerright.onmousedown = e => {
        value.divider_left = false
        mouseDown(e)
    }

    function resize() {
        element.panel1.style.height = "calc(" + value.panel1 + "% - " + value.divider_height / 2 + "px)"
        element.panel3.style.height = "calc(" + value.panel3 + "% - " + value.divider_height / 2 + "px)"
        element.panel2.style.height = "calc(" + value.panel2 + "% - " + value.divider_height / 2 + "px)"
        element.panel4.style.height = "calc(" + value.panel4 + "% - " + value.divider_height / 2 + "px)"
    }
    resize()

    function mouseDown(event) {
        if (PANEL_CHANGING) return
        removePanelChangingEvent()
        PANEL_RESIZING = true
        value.y = event.clientY
        width.panel1 = element.panel1.getBoundingClientRect().height
        width.panel2 = element.panel2.getBoundingClientRect().height
        document.body.classList.add("no-select")
        document.body.style.cursor = "row-resize"
        document.onmousemove = mouseMove
        document.onmouseup = mouseUp
    }

    function mouseMove(event) {
        const dy = event.clientY - value.y
        if (event.shiftKey) {
            if (value.divider_left) {
                width.left = element.left.getBoundingClientRect().height
                value.panel1 = (width.panel1 + dy) * 100 / width.left
                if (value.panel1 < 0) {
                    value.panel1 = 0
                } else if (value.panel1 > 100) {
                    value.panel1 = 100
                }
                value.panel3 = 100 - value.panel1
                value.panel2 = value.panel1
                value.panel4 = value.panel3
            } else {
                width.right = element.right.getBoundingClientRect().height
                value.panel2 = (width.panel2 + dy) * 100 / width.right
                if (value.panel2 < 0) {
                    value.panel2 = 0
                } else if (value.panel2 > 100) {
                    value.panel2 = 100
                }
                value.panel4 = 100 - value.panel2
                value.panel1 = value.panel2
                value.panel3 = value.panel4
            }
        } else {
            if (value.divider_left) {
                width.left = element.left.getBoundingClientRect().height
                value.panel1 = (width.panel1 + dy) * 100 / width.left
                if (value.panel1 < 0) {
                    value.panel1 = 0
                } else if (value.panel1 > 100) {
                    value.panel1 = 100
                }
                value.panel3 = 100 - value.panel1
            } else {
                width.right = element.right.getBoundingClientRect().height
                value.panel2 = (width.panel2 + dy) * 100 / width.right
                if (value.panel2 < 0) {
                    value.panel2 = 0
                } else if (value.panel2 > 100) {
                    value.panel2 = 100
                }
                value.panel4 = 100 - value.panel2
            }
        }
        resize()
    }

    function mouseUp() {
        PANEL_RESIZING = false
        value.divider_left = null
        document.body.classList.remove("no-select")
        document.body.style.removeProperty('cursor')
        document.onmousemove = null
        document.onmouseup = null
    }
}
VERTICAL(15, 70, 15, 10,
    "pagecontainer", "left-panel", "divider1", "middle-panel", "divider2", "right-panel"
)
HORIZONTAL(50, 50, 50, 50, 10,
    "left-panel", "panel1", "dividerLeft", "panel2", "right-panel", "panel3", "dividerRight", "panel4"
)

const active_array = {
    0: [],
    1: [],
    2: [],
    3: []
}
const panel_top_img = {
    account: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDNjMS42NiAwIDMgMS4zNCAzIDNzLTEuMzQgMy0zIDMtMy0xLjM0LTMtMyAxLjM0LTMgMy0zem0wIDE0LjJjLTIuNSAwLTQuNzEtMS4yOC02LTMuMjIuMDMtMS45OSA0LTMuMDggNi0zLjA4IDEuOTkgMCA1Ljk3IDEuMDkgNiAzLjA4LTEuMjkgMS45NC0zLjUgMy4yMi02IDMuMjJ6Ii8+PC9zdmc+",
    stat: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xOSAzSDVjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWNWMwLTEuMS0uOS0yLTItMnpNOSAxN0g3di01aDJ2NXptNCAwaC0ydi0zaDJ2M3ptMC01aC0ydi0yaDJ2MnptNCA1aC0yVjdoMnYxMHoiLz48L3N2Zz4=",
    skin: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik05IDExLjc1Yy0uNjkgMC0xLjI1LjU2LTEuMjUgMS4yNXMuNTYgMS4yNSAxLjI1IDEuMjUgMS4yNS0uNTYgMS4yNS0xLjI1LS41Ni0xLjI1LTEuMjUtMS4yNXptNiAwYy0uNjkgMC0xLjI1LjU2LTEuMjUgMS4yNXMuNTYgMS4yNSAxLjI1IDEuMjUgMS4yNS0uNTYgMS4yNS0xLjI1LS41Ni0xLjI1LTEuMjUtMS4yNXpNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LTggMC0uMjkuMDItLjU4LjA1LS44NiAyLjM2LTEuMDUgNC4yMy0yLjk4IDUuMjEtNS4zN0MxMS4wNyA4LjMzIDE0LjA1IDEwIDE3LjQyIDEwYy43OCAwIDEuNTMtLjA5IDIuMjUtLjI2LjIxLjcxLjMzIDEuNDcuMzMgMi4yNiAwIDQuNDEtMy41OSA4LTggOHoiLz48L3N2Zz4=",
    filter: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiNGRkZGRkYiPjxnPjxwYXRoIGQ9Ik0wLDBoMjQgTTI0LDI0SDAiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNC4yNSw1LjYxQzYuMjcsOC4yLDEwLDEzLDEwLDEzdjZjMCwwLjU1LDAuNDUsMSwxLDFoMmMwLjU1LDAsMS0wLjQ1LDEtMXYtNmMwLDAsMy43Mi00LjgsNS43NC03LjM5IEMyMC4yNSw0Ljk1LDE5Ljc4LDQsMTguOTUsNEg1LjA0QzQuMjEsNCwzLjc0LDQuOTUsNC4yNSw1LjYxeiIvPjxwYXRoIGQ9Ik0wLDBoMjR2MjRIMFYweiIgZmlsbD0ibm9uZSIvPjwvZz48L3N2Zz4=",
    chat: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTQgNGgxNnYxMkg1LjE3TDQgMTcuMTdWNG0wLTJjLTEuMSAwLTEuOTkuOS0xLjk5IDJMMiAyMmw0LTRoMTRjMS4xIDAgMi0uOSAyLTJWNGMwLTEuMS0uOS0yLTItMkg0em0yIDEwaDh2Mkg2di0yem0wLTNoMTJ2Mkg2Vjl6bTAtM2gxMnYySDZWNnoiLz48L3N2Zz4=",
    players: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiNGRkZGRkYiPjxnPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjwvZz48Zz48Zy8+PGc+PGc+PHBhdGggZD0iTTE2LjY3LDEzLjEzQzE4LjA0LDE0LjA2LDE5LDE1LjMyLDE5LDE3djNoNHYtMyBDMjMsMTQuODIsMTkuNDMsMTMuNTMsMTYuNjcsMTMuMTN6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PGc+PGNpcmNsZSBjeD0iOSIgY3k9IjgiIGZpbGwtcnVsZT0iZXZlbm9kZCIgcj0iNCIvPjwvZz48Zz48cGF0aCBkPSJNMTUsMTJjMi4yMSwwLDQtMS43OSw0LTRjMC0yLjIxLTEuNzktNC00LTRjLTAuNDcsMC0wLjkxLDAuMS0xLjMzLDAuMjQgQzE0LjUsNS4yNywxNSw2LjU4LDE1LDhzLTAuNSwyLjczLTEuMzMsMy43NkMxNC4wOSwxMS45LDE0LjUzLDEyLDE1LDEyeiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9nPjxnPjxwYXRoIGQ9Ik05LDEzYy0yLjY3LDAtOCwxLjM0LTgsNHYzaDE2di0zQzE3LDE0LjM0LDExLjY3LDEzLDksMTN6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PC9nPjwvZz48L3N2Zz4=",
    info: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0xIDE1aC0ydi02aDJ2NnptMC04aC0yVjdoMnYyeiIvPjwvc3ZnPg==",
    game: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiNGRkZGRkYiPjxnPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjwvZz48Zz48Zz48cGF0aCBkPSJNMjEuNTgsMTYuMDlsLTEuMDktNy42NkMyMC4yMSw2LjQ2LDE4LjUyLDUsMTYuNTMsNUg3LjQ3QzUuNDgsNSwzLjc5LDYuNDYsMy41MSw4LjQzbC0xLjA5LDcuNjYgQzIuMiwxNy42MywzLjM5LDE5LDQuOTQsMTloMGMwLjY4LDAsMS4zMi0wLjI3LDEuOC0wLjc1TDksMTZoNmwyLjI1LDIuMjVjMC40OCwwLjQ4LDEuMTMsMC43NSwxLjgsMC43NWgwIEMyMC42MSwxOSwyMS44LDE3LjYzLDIxLjU4LDE2LjA5eiBNMTEsMTFIOXYySDh2LTJINnYtMWgyVjhoMXYyaDJWMTF6IE0xNSwxMGMtMC41NSwwLTEtMC40NS0xLTFjMC0wLjU1LDAuNDUtMSwxLTFzMSwwLjQ1LDEsMSBDMTYsOS41NSwxNS41NSwxMCwxNSwxMHogTTE3LDEzYy0wLjU1LDAtMS0wLjQ1LTEtMWMwLTAuNTUsMC40NS0xLDEtMXMxLDAuNDUsMSwxQzE4LDEyLjU1LDE3LjU1LDEzLDE3LDEzeiIvPjwvZz48L2c+PC9zdmc+",
    host: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiNGRkZGRkYiPjxnPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjwvZz48Zz48Zz48cGF0aCBkPSJNMTcsMTFjMC4zNCwwLDAuNjcsMC4wNCwxLDAuMDlWNi4yN0wxMC41LDNMMyw2LjI3djQuOTFjMCw0LjU0LDMuMiw4Ljc5LDcuNSw5LjgyYzAuNTUtMC4xMywxLjA4LTAuMzIsMS42LTAuNTUgQzExLjQxLDE5LjQ3LDExLDE4LjI4LDExLDE3QzExLDEzLjY5LDEzLjY5LDExLDE3LDExeiIvPjxwYXRoIGQ9Ik0xNywxM2MtMi4yMSwwLTQsMS43OS00LDRjMCwyLjIxLDEuNzksNCw0LDRzNC0xLjc5LDQtNEMyMSwxNC43OSwxOS4yMSwxMywxNywxM3ogTTE3LDE0LjM4YzAuNjIsMCwxLjEyLDAuNTEsMS4xMiwxLjEyIHMtMC41MSwxLjEyLTEuMTIsMS4xMnMtMS4xMi0wLjUxLTEuMTItMS4xMlMxNi4zOCwxNC4zOCwxNywxNC4zOHogTTE3LDE5Ljc1Yy0wLjkzLDAtMS43NC0wLjQ2LTIuMjQtMS4xNyBjMC4wNS0wLjcyLDEuNTEtMS4wOCwyLjI0LTEuMDhzMi4xOSwwLjM2LDIuMjQsMS4wOEMxOC43NCwxOS4yOSwxNy45MywxOS43NSwxNywxOS43NXoiLz48L2c+PC9nPjwvc3ZnPg==",
    advance: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiNGRkZGRkYiPjxnPjxwYXRoIGQ9Ik0wLDBoMjR2MjRIMFYweiIgZmlsbD0ibm9uZSIvPjwvZz48Zz48Zz48Y2lyY2xlIGN4PSIxMCIgY3k9IjgiIHI9IjQiLz48cGF0aCBkPSJNMTAuNjcsMTMuMDJDMTAuNDUsMTMuMDEsMTAuMjMsMTMsMTAsMTNjLTIuNDIsMC00LjY4LDAuNjctNi42MSwxLjgyQzIuNTEsMTUuMzQsMiwxNi4zMiwyLDE3LjM1VjIwaDkuMjYgQzEwLjQ3LDE4Ljg3LDEwLDE3LjQ5LDEwLDE2QzEwLDE0LjkzLDEwLjI1LDEzLjkzLDEwLjY3LDEzLjAyeiIvPjxwYXRoIGQ9Ik0yMC43NSwxNmMwLTAuMjItMC4wMy0wLjQyLTAuMDYtMC42M2wxLjE0LTEuMDFsLTEtMS43M2wtMS40NSwwLjQ5Yy0wLjMyLTAuMjctMC42OC0wLjQ4LTEuMDgtMC42M0wxOCwxMWgtMmwtMC4zLDEuNDkgYy0wLjQsMC4xNS0wLjc2LDAuMzYtMS4wOCwwLjYzbC0xLjQ1LTAuNDlsLTEsMS43M2wxLjE0LDEuMDFjLTAuMDMsMC4yMS0wLjA2LDAuNDEtMC4wNiwwLjYzczAuMDMsMC40MiwwLjA2LDAuNjNsLTEuMTQsMS4wMSBsMSwxLjczbDEuNDUtMC40OWMwLjMyLDAuMjcsMC42OCwwLjQ4LDEuMDgsMC42M0wxNiwyMWgybDAuMy0xLjQ5YzAuNC0wLjE1LDAuNzYtMC4zNiwxLjA4LTAuNjNsMS40NSwwLjQ5bDEtMS43M2wtMS4xNC0xLjAxIEMyMC43MiwxNi40MiwyMC43NSwxNi4yMiwyMC43NSwxNnogTTE3LDE4Yy0xLjEsMC0yLTAuOS0yLTJzMC45LTIsMi0yczIsMC45LDIsMlMxOC4xLDE4LDE3LDE4eiIvPjwvZz48L2c+PC9zdmc+",
    map_setting: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMiAxMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6bTctN0g1Yy0xLjExIDAtMiAuOS0yIDJ2MTRjMCAxLjEuODkgMiAyIDJoMTRjMS4xMSAwIDItLjkgMi0yVjVjMC0xLjEtLjg5LTItMi0yem0tMS43NSA5YzAgLjIzLS4wMi40Ni0uMDUuNjhsMS40OCAxLjE2Yy4xMy4xMS4xNy4zLjA4LjQ1bC0xLjQgMi40MmMtLjA5LjE1LS4yNy4yMS0uNDMuMTVsLTEuNzQtLjdjLS4zNi4yOC0uNzYuNTEtMS4xOC42OWwtLjI2IDEuODVjLS4wMy4xNy0uMTguMy0uMzUuM2gtMi44Yy0uMTcgMC0uMzItLjEzLS4zNS0uMjlsLS4yNi0xLjg1Yy0uNDMtLjE4LS44Mi0uNDEtMS4xOC0uNjlsLTEuNzQuN2MtLjE2LjA2LS4zNCAwLS40My0uMTVsLTEuNC0yLjQyYy0uMDktLjE1LS4wNS0uMzQuMDgtLjQ1bDEuNDgtMS4xNmMtLjAzLS4yMy0uMDUtLjQ2LS4wNS0uNjkgMC0uMjMuMDItLjQ2LjA1LS42OGwtMS40OC0xLjE2Yy0uMTMtLjExLS4xNy0uMy0uMDgtLjQ1bDEuNC0yLjQyYy4wOS0uMTUuMjctLjIxLjQzLS4xNWwxLjc0LjdjLjM2LS4yOC43Ni0uNTEgMS4xOC0uNjlsLjI2LTEuODVjLjAzLS4xNy4xOC0uMy4zNS0uM2gyLjhjLjE3IDAgLjMyLjEzLjM1LjI5bC4yNiAxLjg1Yy40My4xOC44Mi40MSAxLjE4LjY5bDEuNzQtLjdjLjE2LS4wNi4zNCAwIC40My4xNWwxLjQgMi40MmMuMDkuMTUuMDUuMzQtLjA4LjQ1bC0xLjQ4IDEuMTZjLjAzLjIzLjA1LjQ2LjA1LjY5eiIvPjwvc3ZnPg==",
    map_layer: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMS45OSAxOC41NGwtNy4zNy01LjczTDMgMTQuMDdsOSA3IDktNy0xLjYzLTEuMjctNy4zOCA1Ljc0ek0xMiAxNmw3LjM2LTUuNzNMMjEgOWwtOS03LTkgNyAxLjYzIDEuMjdMMTIgMTZ6Ii8+PC9zdmc+",
    map_shape: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIzIDdWMWgtNnYySDdWMUgxdjZoMnYxMEgxdjZoNnYtMmgxMHYyaDZ2LTZoLTJWN2gyek0zIDNoMnYySDNWM3ptMiAxOEgzdi0yaDJ2MnptMTItMkg3di0ySDVWN2gyVjVoMTB2MmgydjEwaC0ydjJ6bTQgMmgtMnYtMmgydjJ6TTE5IDVWM2gydjJoLTJ6bS01LjI3IDloLTMuNDlsLS43MyAySDcuODlsMy40LTloMS40bDMuNDEgOWgtMS42M2wtLjc0LTJ6bS0zLjA0LTEuMjZoMi42MUwxMiA4LjkxbC0xLjMxIDMuODN6Ii8+PC9zdmc+",
    map_joint: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiNGRkZGRkYiPjxnPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjwvZz48Zz48ZWxsaXBzZSBjeD0iMTIiIGN5PSIxMiIgcng9IjMiIHJ5PSI1Ljc0Ii8+PGc+PHBhdGggZD0iTTkuMDQsMTYuODdDOC43MSwxNi45NSw4LjM2LDE3LDgsMTdjLTIuNzYsMC01LTIuMjQtNS01czIuMjQtNSw1LTVjMC4zNiwwLDAuNzEsMC4wNSwxLjA0LDAuMTMgYzAuMzktMC41NiwwLjg4LTEuMTIsMS40OS0xLjYzQzkuNzUsNS4xOSw4LjksNSw4LDVjLTMuODYsMC03LDMuMTQtNyw3czMuMTQsNyw3LDdjMC45LDAsMS43NS0wLjE5LDIuNTMtMC41IEM5LjkyLDE3Ljk5LDkuNDMsMTcuNDMsOS4wNCwxNi44N3oiLz48L2c+PHBhdGggZD0iTTE2LDVjLTAuOSwwLTEuNzUsMC4xOS0yLjUzLDAuNWMwLjYxLDAuNTEsMS4xLDEuMDcsMS40OSwxLjYzQzE1LjI5LDcuMDUsMTUuNjQsNywxNiw3YzIuNzYsMCw1LDIuMjQsNSw1cy0yLjI0LDUtNSw1IGMtMC4zNiwwLTAuNzEtMC4wNS0xLjA0LTAuMTNjLTAuMzksMC41Ni0wLjg4LDEuMTItMS40OSwxLjYzQzE0LjI1LDE4LjgxLDE1LjEsMTksMTYsMTljMy44NiwwLDctMy4xNCw3LTdTMTkuODYsNSwxNiw1eiIvPjwvZz48L3N2Zz4=",
    map_property: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zIDE3djJoNnYtMkgzek0zIDV2MmgxMFY1SDN6bTEwIDE2di0yaDh2LTJoLTh2LTJoLTJ2Nmgyek03IDl2MkgzdjJoNHYyaDJWOUg3em0xNCA0di0ySDExdjJoMTB6bS02LTRoMlY3aDRWNWgtNFYzaC0ydjZ6Ii8+PC9zdmc+",
    skin_setting: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMiAxMGMtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6bTctN0g1Yy0xLjExIDAtMiAuOS0yIDJ2MTRjMCAxLjEuODkgMiAyIDJoMTRjMS4xMSAwIDItLjkgMi0yVjVjMC0xLjEtLjg5LTItMi0yem0tMS43NSA5YzAgLjIzLS4wMi40Ni0uMDUuNjhsMS40OCAxLjE2Yy4xMy4xMS4xNy4zLjA4LjQ1bC0xLjQgMi40MmMtLjA5LjE1LS4yNy4yMS0uNDMuMTVsLTEuNzQtLjdjLS4zNi4yOC0uNzYuNTEtMS4xOC42OWwtLjI2IDEuODVjLS4wMy4xNy0uMTguMy0uMzUuM2gtMi44Yy0uMTcgMC0uMzItLjEzLS4zNS0uMjlsLS4yNi0xLjg1Yy0uNDMtLjE4LS44Mi0uNDEtMS4xOC0uNjlsLTEuNzQuN2MtLjE2LjA2LS4zNCAwLS40My0uMTVsLTEuNC0yLjQyYy0uMDktLjE1LS4wNS0uMzQuMDgtLjQ1bDEuNDgtMS4xNmMtLjAzLS4yMy0uMDUtLjQ2LS4wNS0uNjkgMC0uMjMuMDItLjQ2LjA1LS42OGwtMS40OC0xLjE2Yy0uMTMtLjExLS4xNy0uMy0uMDgtLjQ1bDEuNC0yLjQyYy4wOS0uMTUuMjctLjIxLjQzLS4xNWwxLjc0LjdjLjM2LS4yOC43Ni0uNTEgMS4xOC0uNjlsLjI2LTEuODVjLjAzLS4xNy4xOC0uMy4zNS0uM2gyLjhjLjE3IDAgLjMyLjEzLjM1LjI5bC4yNiAxLjg1Yy40My4xOC44Mi40MSAxLjE4LjY5bDEuNzQtLjdjLjE2LS4wNi4zNCAwIC40My4xNWwxLjQgMi40MmMuMDkuMTUuMDUuMzQtLjA4LjQ1bC0xLjQ4IDEuMTZjLjAzLjIzLjA1LjQ2LjA1LjY5eiIvPjwvc3ZnPg==",
    skin_layer: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMS45OSAxOC41NGwtNy4zNy01LjczTDMgMTQuMDdsOSA3IDktNy0xLjYzLTEuMjctNy4zOCA1Ljc0ek0xMiAxNmw3LjM2LTUuNzNMMjEgOWwtOS03LTkgNyAxLjYzIDEuMjdMMTIgMTZ6Ii8+PC9zdmc+",
    skin_preview: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiNGRkZGRkYiPjxnPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjxwYXRoIGQ9Ik0xOSwzSDVDMy44OSwzLDMsMy45LDMsNXYxNGMwLDEuMSwwLjg5LDIsMiwyaDE0YzEuMSwwLDItMC45LDItMlY1QzIxLDMuOSwyMC4xMSwzLDE5LDN6IE0xOSwxOUg1VjdoMTRWMTl6IE0xMy41LDEzIGMwLDAuODMtMC42NywxLjUtMS41LDEuNXMtMS41LTAuNjctMS41LTEuNWMwLTAuODMsMC42Ny0xLjUsMS41LTEuNVMxMy41LDEyLjE3LDEzLjUsMTN6IE0xMiw5Yy0yLjczLDAtNS4wNiwxLjY2LTYsNCBjMC45NCwyLjM0LDMuMjcsNCw2LDRzNS4wNi0xLjY2LDYtNEMxNy4wNiwxMC42NiwxNC43Myw5LDEyLDl6IE0xMiwxNS41Yy0xLjM4LDAtMi41LTEuMTItMi41LTIuNWMwLTEuMzgsMS4xMi0yLjUsMi41LTIuNSBjMS4zOCwwLDIuNSwxLjEyLDIuNSwyLjVDMTQuNSwxNC4zOCwxMy4zOCwxNS41LDEyLDE1LjV6Ii8+PC9nPjwvc3ZnPg==",
    skin_property: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iI0ZGRkZGRiI+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zIDE3djJoNnYtMkgzek0zIDV2MmgxMFY1SDN6bTEwIDE2di0yaDh2LTJoLTh2LTJoLTJ2Nmgyek03IDl2MkgzdjJoNHYyaDJWOUg3em0xNCA0di0ySDExdjJoMTB6bS02LTRoMlY3aDRWNWgtNFYzaC0ydjZ6Ii8+PC9zdmc+"
}
class Panel {
    constructor(function_string, class_number) {
        this.function_string = function_string
        this.class_number = class_number

        this.a = document.createElement("div")
        this.a.id = `panel-top-function-${this.function_string}`
        this.a.classList.add("panel-top-items")
        // this.a.draggable = true
        this.a.onmousedown = () => {
            if (PANEL_RESIZING) removePanelResizingEvent()
            this.active()
            this.a.draggable = true
        }
        this.a.onmouseup = () => {
            this.a.draggable = false
        }
        this.a.ondragstart = () => {
            if (PANEL_RESIZING) removePanelResizingEvent()
            PANEL_CHANGING = true
            this.a.classList.add("panel-top-items-dragging")
        }
        this.a.ondragend = () => {
            PANEL_CHANGING = false
            this.a.classList.remove("panel-top-items-dragging")
        }

        this.b = document.createElement("div")
        this.b.style.backgroundImage = `url(${panel_top_img[this.function_string]})`
        this.b.classList.add("panel-top-icon")
        this.a.appendChild(this.b)

        this.c = document.createElement("div")
        this.c.classList.add("panel-top-close")
        this.c.onclick = () => {
            if (PANEL_RESIZING) removePanelResizingEvent()
            this.removePanel()
        }
        this.a.appendChild(this.c)
        document.getElementsByClassName("panel-top")[this.class_number].appendChild(this.a)

        this.d = document.createElement("div")
        this.d.id = `panel-bottom-function-${this.function_string}`
        this.d.style.display = "none"
        this.d.style.width = "100%"
        this.d.style.height = "100%"
        document.getElementsByClassName("panel-bottom")[this.class_number].appendChild(this.d)

        const functions = {
            account: () => {
                const e = document.createElement("div")
                e.innerText = "IM ACCOUNT"
                this.d.appendChild(e)
            },
            stat: () => {
                const e = document.createElement("div")
                e.innerText = "IM STAT"
                this.d.appendChild(e)
            },
            skin: () => {
                const e = document.createElement("div")
                e.innerText = "IM SKIN"
                this.d.appendChild(e)
            },
            filter: () => {
                const e = document.createElement("input")
                e.id = "panel_filter_multiselect"
                e.type = "checkbox"
                this.d.appendChild(e)
            },
            chat: () => {
                const e = document.createElement("div")
                e.innerText = "IM CHAT"
                this.d.appendChild(e)
            },
            players: () => {
                const e = document.createElement("div")
                e.innerText = "IM PLAYERS"
                this.d.appendChild(e)
            },
            info: () => {
                const e = document.createElement("div")
                e.innerText = "IM INFO (GAME INFO)"
                this.d.appendChild(e)
            },
            game: () => {
                const e = document.createElement("div")
                e.innerText = "IM CUSTOMIZE GAME(SPAM STUFF)"
                this.d.appendChild(e)
            },
            host: () => {
                const e = document.createElement("div")
                e.innerText = "IM HOST"
                this.d.appendChild(e)
            },
            advance: () => {
                const e = document.createElement("div")
                e.innerText = "IM ADVANCE HOST"
                this.d.appendChild(e)
            },
            map_setting: () => {
                const e = document.createElement("div")
                e.innerText = "IM MAP-SETTINGS"
                this.d.appendChild(e)
            },
            map_layer: () => {
                const e = document.createElement("div")
                e.innerText = "IM MAP-LAYER"
                this.d.appendChild(e)
            },
            map_shape: () => {
                const e = document.createElement("div")
                e.innerText = "IM MAP-SHAPE"
                this.d.appendChild(e)
            },
            map_joint: () => {
                const e = document.createElement("div")
                e.innerText = "IM MAP-JOINT"
                this.d.appendChild(e)
            },
            map_property: () => {
                const e = document.createElement("div")
                e.innerText = "IM MAP-PROPERTY"
                this.d.appendChild(e)
            },
            skin_setting: () => {
                const e = document.createElement("div")
                e.innerText = "IM SKIN-SETTINGS"
                this.d.appendChild(e)
            },
            skin_layer: () => {
                const e = document.createElement("div")
                e.innerText = "IM SKIN-LAYER"
                this.d.appendChild(e)
            },
            skin_preview: () => {
                const e = document.createElement("div")
                e.innerText = "IM SKIN-PREVIEW"
                this.d.appendChild(e)
            },
            skin_property: () => {
                const e = document.createElement("div")
                e.innerText = "IM SKIN-PROPERTY"
                this.d.appendChild(e)
            }
        }
        functions[this.function_string]()
        active_array[this.class_number].push(this)
    }
    removePanel() {
        active_array[this.class_number].splice(active_array[this.class_number].indexOf(this), 1)
        setActive(this.class_number)
        document.getElementById(`panel-top-function-${this.function_string}`).remove()
        document.getElementById(`panel-bottom-function-${this.function_string}`).remove()
    }
    active() {
        active_array[this.class_number].splice(active_array[this.class_number].indexOf(this), 1)
        active_array[this.class_number].push(this)
        setActive(this.class_number)
    }
    changePanel(new_class_number, element) {
        active_array[this.class_number].splice(active_array[this.class_number].indexOf(this), 1)
        setActive(this.class_number)
        this.class_number = new_class_number
        active_array[this.class_number].push(this)
        if (element == null) {
            document.getElementsByClassName("panel-top")[this.class_number].appendChild(document.getElementById(`panel-top-function-${this.function_string}`))
        } else {
            document.getElementsByClassName("panel-top")[this.class_number].insertBefore(document.getElementById(`panel-top-function-${this.function_string}`), element)
        }
        document.getElementsByClassName("panel-bottom")[this.class_number].appendChild(document.getElementById(`panel-bottom-function-${this.function_string}`))
        setActive(this.class_number)
    }
}

function setActive(class_number) {
    if (!active_array[class_number].length) {
        document.getElementsByClassName("panel-bottom-nothing-img")[class_number].style.display = "block"
        return
    }
    Array.from(document.getElementsByClassName("panel-top")[class_number].children).forEach(i => {
        if (i.classList.contains("panel-top-items-active")) {
            i.classList.remove("panel-top-items-active")
        }
    })
    Array.from(document.getElementsByClassName("panel-bottom")[class_number].children).forEach(i => {
        if (i.style.display != "none") {
            i.style.display = "none"
        }
    })
    active_array[class_number][active_array[class_number].length - 1].a.classList.add("panel-top-items-active")
    active_array[class_number][active_array[class_number].length - 1].d.style.display = "block"
}

function getDragAfterElement(class_number, x) {
    const draggableElements = [...document.getElementsByClassName("panel-top")[class_number].querySelectorAll(".panel-top-items:not(.panel-top-items-dragging)")]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = x - box.left - box.width / 2
        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            }
        } else {
            return closest
        }
    }, {
        offset: Number.NEGATIVE_INFINITY
    }).element
}

function removePanelResizingEvent() {
    PANEL_RESIZING = false
    document.body.classList.remove("no-select")
    document.body.style.removeProperty('cursor')
    document.onmousemove = null
    document.onmouseup = null
}

function removePanelChangingEvent() {
    const elements = document.getElementsByClassName("panel-top-items")
    for (let i = 0; i < elements.length; i++) elements[i].draggable = false
}

let PANEL_CHANGING = false,
    PANEL_RESIZING = false
new Panel("account", 0)
new Panel("stat", 1)
new Panel("skin", 2)
new Panel("filter", 3)

for (let i = 0; i < 4; i++) {
    setActive(i)
    document.getElementsByClassName("panel-top")[i].ondragover = e => {
        e.preventDefault()
        if (PANEL_RESIZING) removePanelResizingEvent()
        PANEL_CHANGING = true
        active_array[0].concat(active_array[1], active_array[2], active_array[3]).filter(val => val.a.classList.contains("panel-top-items-dragging"))[0].changePanel(i, getDragAfterElement(i, e.clientX))
    }
    document.getElementsByClassName("panel-bottom")[i].ondragover = e => {
        e.preventDefault()
        if (PANEL_RESIZING) removePanelResizingEvent()
        PANEL_CHANGING = true
        active_array[0].concat(active_array[1], active_array[2], active_array[3]).filter(val => val.a.classList.contains("panel-top-items-dragging"))[0].changePanel(i, null)
    }
}

const element_join_room_with_link_window_container = document.createElement("div")
element_join_room_with_link_window_container.id = "join_room_with_link_window_container"
element_join_room_with_link_window_container.style.visibility = "hidden"
element_join_room_with_link_window_container.style.opacity = "1"
const element_join_room_with_link_behind_blocker = document.createElement("div")
element_join_room_with_link_behind_blocker.id = "join_room_with_link_behind_blocker"
element_join_room_with_link_window_container.appendChild(element_join_room_with_link_behind_blocker)
const element_join_room_with_link_window = document.createElement("div")
element_join_room_with_link_window.id = "join_room_with_link_window"
element_join_room_with_link_window.classList.add("windowShadow")
const element_join_room_with_link_top = document.createElement("div")
element_join_room_with_link_top.id = "join_room_with_link_top"
element_join_room_with_link_top.classList.add("windowTopBar", "windowTopBar_classic")
element_join_room_with_link_top.innerText = "Link Required"
element_join_room_with_link_window.appendChild(element_join_room_with_link_top)
const element_join_room_with_link_window_label = document.createElement("div")
element_join_room_with_link_window_label.id = "join_room_with_link_window_label"
element_join_room_with_link_window_label.classList.add("no-select")
element_join_room_with_link_window_label.innerText = "Link"
element_join_room_with_link_window.appendChild(element_join_room_with_link_window_label)
const element_join_room_with_link_text = document.createElement("input")
element_join_room_with_link_text.id = "join_room_with_link_text"
element_join_room_with_link_text.classList.add("whiteInputField", "windowShadow")
element_join_room_with_link_text.type = "text"
element_join_room_with_link_text.autocomplete = "off"
element_join_room_with_link_text.readOnly = "true"
element_join_room_with_link_text.onclick = () => {
    element_join_room_with_link_text.removeAttribute("readOnly")
}
element_join_room_with_link_text.onfocusout = () => {
    element_join_room_with_link_text.readOnly = "true"
}
element_join_room_with_link_window.appendChild(element_join_room_with_link_text)
const element_join_room_with_link_join_button = document.createElement("div")
element_join_room_with_link_join_button.id = "join_room_with_link_join_button"
element_join_room_with_link_join_button.classList.add("join_room_with_link_bottom_button", "no-select", "brownButton", "brownButton_classic", "buttonShadow")
element_join_room_with_link_join_button.innerText = "JOIN"
element_join_room_with_link_join_button.onclick = () => {
    element_join_room_with_link_text.readOnly = "true"
    if (/https?\:\/\/bonk\.io\/.+/g.test(element_join_room_with_link_text.value)) {
        window.top.location.href = element_join_room_with_link_text.value
    } else {
        element_join_room_with_link_text.value = ""
        element_join_room_with_link_text.placeholder = "Please provide a valid link"
    }
}
element_join_room_with_link_window.appendChild(element_join_room_with_link_join_button)
const element_join_room_with_link_cancel_button = document.createElement("div")
element_join_room_with_link_cancel_button.id = "join_room_with_link_cancel_button"
element_join_room_with_link_cancel_button.classList.add("join_room_with_link_bottom_button", "no-select", "brownButton", "brownButton_classic", "buttonShadow")
element_join_room_with_link_cancel_button.innerText = "CANCEL"
element_join_room_with_link_cancel_button.onclick = () => {
    element_join_room_with_link_text.readOnly = "true"
    element_join_room_with_link_window_container.style.visibility = "hidden"
    element_join_room_with_link_text.placeholder = ""
    element_join_room_with_link_text.value = ""
    document.getElementById("pretty_top").style.pointerEvents = null
    document.getElementById("mainmenuelements").style.pointerEvents = null
    document.getElementById("classic_mid").style.pointerEvents = null
    document.getElementById("newbonkgamecontainer").style.pointerEvents = null
}
element_join_room_with_link_window.appendChild(element_join_room_with_link_cancel_button)
element_join_room_with_link_window_container.appendChild(element_join_room_with_link_window)
document.getElementById("prettymenu").appendChild(element_join_room_with_link_window_container)


const element_pretty_top_panel = document.createElement("div")
element_pretty_top_panel.id = "pretty_top_panel"
element_pretty_top_panel.classList.add("pretty_top_button", "niceborderleft")
element_pretty_top_panel.onclick = () => {

}
document.getElementById("pretty_top_bar").insertBefore(element_pretty_top_panel, document.getElementById("pretty_top_help"))

const element_pretty_top_link = document.createElement("div")
element_pretty_top_link.id = "pretty_top_link"
element_pretty_top_link.classList.add("pretty_top_button", "niceborderleft")
element_pretty_top_link.onclick = () => {
    element_join_room_with_link_text.readOnly = "true"
    document.getElementById("pretty_top").style.pointerEvents = "none"
    document.getElementById("mainmenuelements").style.pointerEvents = "none"
    document.getElementById("classic_mid").style.pointerEvents = "none"
    document.getElementById("newbonkgamecontainer").style.pointerEvents = "none"
    element_join_room_with_link_window_container.style.visibility = "visible"
}
document.getElementById("pretty_top_bar").insertBefore(element_pretty_top_link, document.getElementById("pretty_top_help"))

var val_width, val_text

function xp_bar_visibility(show) {
    element_xp_bar.style.display = show ? "block" : "none"
}

function xp_bar_fill() {
    setTimeout(() => {
        element_xp_fill.style.width = val_width
        element_xp_value.textContent = val_text
    }, 500)
}
const element_xp_bar = document.createElement("div")
element_xp_bar.id = "xp-bar"
element_xp_bar.style.display = "none"
const element_xp_value = document.createElement("div")
element_xp_value.id = "xp-value"
element_xp_value.textContent = "Undefined"
element_xp_bar.appendChild(element_xp_value)
const element_xp_fill = document.createElement("div")
element_xp_fill.id = "xp-fill"
element_xp_bar.appendChild(element_xp_fill)
document.getElementById("prettymenu").appendChild(element_xp_bar);