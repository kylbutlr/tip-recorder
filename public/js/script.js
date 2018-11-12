var svData = []
var key
const $form = document.querySelector("#form")
const $input = document.querySelector("#input")
const $date = document.querySelector("#date")
const $listDiv = document.querySelector(".list-div")
const $yearDivs = document.querySelectorAll(".year-div")
const $monthDivs = document.querySelectorAll(".month-div")
const $lists = document.querySelectorAll(".list")
const $uls = document.querySelectorAll(".l")
const $h3s = document.querySelectorAll(".h3")
const $clrBtn = document.getElementById("clrBtn")
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const formSubmit = (e) => {
    e.preventDefault()
    if ($input.value === " ") {
        alert("Please enter a tip ammount.")
        $input.value = ""
        $input.focus()
    }
    else {
        const dateValue = new Date($date.value)
        const newDate = new Date(dateValue.getTime() + dateValue.getTimezoneOffset() * 60000)
        const thedate = newDate.getDate()
        const month = newDate.getMonth()
        const year = newDate.getFullYear()
        const tips = {"key": key, "text": $input.value, "date": newDate, "tdate": thedate, "month": month, "year": year}
        svData.push(tips)
        renderTodo(tips, key, newDate)
        save()
        key++
        $input.value = ""
        dateToday()
        $input.focus()
    }
}

function renderDiv(date, month, year) {
    const yyyear = document.getElementById("ly"+year)
    if (!yyyear) {
        const newDiv = document.createElement("div")
        const newYear = document.createElement("div")
        newDiv.dataset.year = year
        newYear.dataset.year = year
        newDiv.classList.add("year-div")
        newYear.classList.add("list")
        newDiv.setAttribute("id", "ly"+year)
        newYear.setAttribute("id", "y"+year)
        newDiv.classList.add("hidden")
        const h2 = document.createElement("h2")
        h2.classList.add("yh")
        h2.classList.add("yh1")
        h2.textContent = year + ":"
        const h3 = document.createElement("h3")
        h3.classList.add("yh")
        h3.textContent = "$"
        const h3a = document.createElement("h3")
        h3a.classList.add("yh")
        h3a.textContent = "0"
        h3a.setAttribute("id", "h3-y"+year)
        h3a.classList.add("h3")
        const yrDiv = document.createElement("div")
        yrDiv.classList.add("year-header")
        yrDiv.appendChild(h2)
        yrDiv.appendChild(h3)
        yrDiv.appendChild(h3a)
        newDiv.appendChild(yrDiv)
        newDiv.appendChild(newYear)
        if ($listDiv.childElementCount>0) {
            var arr = new Array()
            arr.push(year)
            sortYearArr(arr, year)
            var t = arr.indexOf(year)
            if (t === 0) {
                $listDiv.firstChild.classList.remove("top-div")
                newDiv.classList.add("top-div")
                $listDiv.insertBefore(newDiv, $listDiv.firstChild)
            }
            else if (t === arr.length-1) {
                $listDiv.insertBefore(newDiv, $listDiv.lastChild.nextSibling)
            }
            else {
                $listDiv.insertBefore(newDiv, $listDiv.children[t])
            }
        }
        else {
            newDiv.classList.add("top-div")
            $listDiv.appendChild(newDiv)
        }
        setTimeout(function() {
            newDiv.classList.add("visible")
            newDiv.classList.remove("hidden")
        })
        setTimeout(function() {
            newDiv.classList.remove("visible")
        }, 1000)
    }
    const lyear = document.getElementById("ly"+year)
    const yyear = document.getElementById("y"+year)
    const mmonth = document.getElementById("m"+month+"y"+year)
    if (!mmonth) {
        const newMonth = document.createElement("div")
        newMonth.dataset.month = month
        newMonth.classList.add("month-div")
        newMonth.setAttribute("id", "m"+month+"y"+year)
        newMonth.classList.add("hidden")
        const h2 = document.createElement("h2")
        h2.classList.add("mh")
        h2.textContent = months[month] + ":"
        const h3 = document.createElement("h3")
        h3.classList.add("mh")
        h3.textContent = "$"
        const h3a = document.createElement("h3")
        h3a.classList.add("mh")
        h3a.textContent = "0"
        h3a.setAttribute("id", "h3-m"+month+"y"+year)
        h3a.classList.add("h3")
        const ul = document.createElement("ul")
        ul.setAttribute("id", "ul-m"+month+"y"+year)
        ul.classList.add("l")
        newMonth.appendChild(h2)
        newMonth.appendChild(h3)
        newMonth.appendChild(h3a)
        newMonth.appendChild(ul)
        if (yyear.childElementCount>0) {
            var arr = new Array()
            arr.push(month)
            sortMonthArr(arr, year)
            var t = arr.indexOf(month)
            if (t === 0) {
                yyear.insertBefore(newMonth, yyear.firstChild)
            }
            else if (t === arr.length-1) {
                yyear.insertBefore(newMonth, yyear.lastChild.nextSibling)
            }
            else {
                yyear.insertBefore(newMonth, yyear.children[t])
            }
        }
        else {
            yyear.appendChild(newMonth)
        }
        setTimeout(function() {
            newMonth.classList.add("visible")
            newMonth.classList.remove("hidden")
        })
        setTimeout(function() {
            newMonth.classList.remove("visible")
        }, 1000)
    }
}

function renderTodo(tips, key, newDate) {
    const date = new Date(newDate)
    const tdate = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    renderDiv(date, month, year)
    const mmonth = document.getElementById("m"+month+"y"+year)
    const yyear = document.getElementById("y"+year)
    const h3y = document.getElementById("h3-y"+year)
    const h3m = document.getElementById("h3-m"+month+"y"+year)
    const ul = document.getElementById("ul-m"+month+"y"+year)
    const newList = document.createElement("li")
    const formattedDate =  formatDate(new Date(tips.date))
    newList.textContent = "$" + tips.text + " (" + formattedDate + ")"
    newList.key = key
    newList.dataset.key = key
    newList.dataset.tdate = tips.tdate
    newList.dataset.month = tips.month
    newList.dataset.year = tips.year
    newList.appendChild(dltBtn(key))
    newList.classList.add("new-post")
    const temp0 = parseInt(h3y.innerText)
    const temp1 = parseInt(h3m.innerText)
    const temp2 = parseInt(tips.text)
    h3y.innerText = temp0 + temp2
    h3m.innerText = temp1 + temp2
    if (ul.childElementCount>0) {
        var arr = new Array()
        arr.push(tdate)
        sortListArr(arr, month, year, tdate)
        var t = arr.indexOf(tdate)
        if (t === 0) {
            ul.insertBefore(newList, ul.firstChild)
        }
        else if (t === arr.length-1) {
            ul.insertBefore(newList, ul.lastChild.nextSibling)
        }
        else {
            ul.insertBefore(newList, ul.children[t])
        }
    }
    else {
        ul.appendChild(newList)
    }
    setTimeout(function() {
        newList.classList.add("post-visible")
        newList.classList.remove("new-post")
    })
    setTimeout(function() {
        newList.classList.remove("post-visible")
    }, 1000)
}

function sortYearArr(arr, year) {
    const list = document.getElementById("listDiv")
    for (i=0;i<list.childElementCount;i++) {
        if (list.children[i]) {
            var t = list.children[i].dataset.year
            t = parseInt(t)
            arr.push(t)
        }
    }
    arr.sort(function(a, b) {
        return b - a
    })
}

function sortMonthArr(arr, year) {
    const yyear = document.getElementById("y"+year)
    for (i=0;i<yyear.childElementCount;i++) {
        if (yyear.children[i]) {
            var t = yyear.children[i].dataset.month
            t = parseInt(t)
            arr.push(t)
        }
    }
    arr.sort(function(a, b) {
        return b - a
    })
}

function sortListArr(arr, month, year,  tdate) {
    const ul = document.getElementById("ul-m"+month+"y"+year)
    for (i=0;i<ul.childElementCount;i++) {
        if (ul.children[i]) {
            var t = ul.children[i].dataset.tdate
            t = parseInt(t)
            arr.push(t)
        }
    }
    arr.sort(function(a, b) {
        return b - a
    })
}

const clrClick = (e) => {
    e.preventDefault()
    if ($listDiv.childElementCount > 0) {
        if (confirm("Are you sure you want to clear the list?")) {
            while ($listDiv.firstChild) {
                $listDiv.removeChild($listDiv.firstChild)
            } 
            svData = []
            key = 0
            $input.value = ""
            dateToday()
            $input.focus()
            save()
        }
    }
}

function formatDate(date) {
    return date.getDate() + ", " + days[date.getDay()]
}                

function deletePost(e) {
    e.preventDefault()
    var dltMonth = false
    var dltYear = false
    const target = svData.findIndex(x => x.key == e.target.dataset.key)
    const month = svData[target].month
    const year = svData[target].year
    const h3y = document.getElementById("h3-y"+year)
    const h3m = document.getElementById("h3-m"+month+"y"+year)
    const mmonth = document.getElementById("m"+month+"y"+year)
    const lyear = document.getElementById("h3-y"+year)
    const yrDiv = document.getElementById("ly"+year)
    const temp0 = parseInt(h3y.innerText)
    const temp1 = parseInt(h3m.innerText)
    const temp2 = parseInt(svData[target].text)
    h3y.innerText = temp0 - temp2
    h3m.innerText = temp1 - temp2
    svData.splice(target, 1)
    e.target.parentNode.classList.add("post-delete")
    if (lyear.textContent == 0) {
        if ($listDiv.children[0].dataset.year == year && $listDiv.childElementCount > 1) {
            $listDiv.children[1].classList.add("top-div")
        }
        dltYear = true
    }
    if (mmonth.children[2].textContent == 0) {
        mmonth.classList.add("post-delete")
        dltMonth = true
    }
    save()
    if (dltYear == true) {
            yrDiv.remove()
    }
    setTimeout(function() {
        e.target.parentNode.remove()
        if (dltMonth == true) {
            mmonth.remove()
        }
    }, 250)
}

function dltBtn(key) {
    const dltBtn = document.createElement("button")
    dltBtn.dataset.key = key
    dltBtn.className = "delete-button"
    dltBtn.textContent = "x"
    dltBtn.addEventListener("click", deletePost)
    return dltBtn
}

function dateToday() {
    const d = new Date()
    const dt = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    $date.value = dt
}

function save() {
    localStorage.setItem("tiprec", JSON.stringify(svData))
}

function getSaved() {
    const temp = localStorage.getItem("tiprec")
    if (temp != null) {
        svData = JSON.parse(temp)
        if (svData.length>0) {
            for (var i=0;i<svData.length;i++) {
                svData[i].key = i
                const date = new Date(svData[i].date)
                renderTodo(svData[i], i, date)
            }
            key = svData[svData.length - 1].key + 1
        }
        else {
            key = 0
        }
    }
    else {
        $clrBtn.click()
    }
}

dateToday()
getSaved()
$form.addEventListener("submit", formSubmit, false)
$clrBtn.addEventListener("click", clrClick, false)

$(function() {
    $(".main-div").hide().delay(500).slideToggle(1000)
    $(".main-glass").hide().delay(500).slideToggle(1000)
    $(".form-div").hide().delay(500).slideToggle(1000)
    $(".list-container").hide().delay(500).slideToggle(1000)
    $(".year-div").hide().delay(500).slideToggle(1000)
    $(".header").click(function(e) {
        $(".main-div").slideToggle(1000)
        $(".main-glass").slideToggle(1000)
        $(".form-div").slideToggle(1000)
        $(".list-container").slideToggle(1000)
        $(".year-div").slideToggle(1000)
    })
    $("#date").datepicker({
        showOn: "button",
        buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: 'yy-mm-dd'
    })
})