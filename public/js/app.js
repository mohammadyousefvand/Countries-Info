let $ = document

const flag = $.querySelector('.flag')
const title = $.querySelector('.title')
const region = $.querySelector('.rigen')
const capital = $.querySelector('.capital')
const population = $.querySelector('.population')
const money = $.querySelector('.money')
const map_link = $.querySelector('.map-link')
const inputElem = $.querySelector('.inputElem')
const search = $.querySelector('.search')
const language = $.querySelector('.language')
const allCountrysBox = $.querySelector('.all-Countrys')

let countryName = 'Iran'

function countryNameHandler(country) {
    getInformation(country)
}

async function getInformation(country) {

    let getInfo = await (await fetch(`https://restcountries.com/v3.1/name/${country}`)).json()

    try {
        setInformation(getInfo)
    } catch (err) {
        Swal.fire('Not found')
    }
}

function setInformation(data) {
    console.log(data)

    flag.setAttribute('src', data[0].flags.svg)
    title.innerHTML = data[0].name.common
    region.innerHTML = data[0].region
    capital.innerHTML = data[0].capital
    let localString = +data[0].population
    population.innerHTML = localString.toLocaleString()

    let moneyObject = data[0].currencies
    let convertObjToArray = Object.entries(moneyObject)

    money.innerHTML = convertObjToArray[0][1].name

    let langObject = data[0].languages
    let langconvertObjToArray = Object.entries(langObject)

    language.innerHTML = langconvertObjToArray[0][1]
    map_link.setAttribute('href', data[0].maps.googleMaps)
}

function createNameCountry(country_list) {

    country_list.forEach(function (item) {
        let template = ` <div class="item">${item}</div>`

        allCountrysBox.insertAdjacentHTML('beforeend', template)
    })

    let item_country = $.querySelectorAll('.item')
    item_country.forEach(function (box) {
        box.addEventListener('click', function () {
            let countryClicked = box.innerHTML
            getInformation(countryClicked)

            window.scrollTo(0, 0)
        })
    })
}

search.addEventListener('click', function () {
    let inputValue = inputElem.value

    if (inputValue) {
        countryNameHandler(inputValue)
    } else {
        Swal.fire('Please Enter The Value')
    }
    inputElem.value = ''
})

window.addEventListener('keydown', function (e) {
    let inputValue = inputElem.value

    if (e.key === 'Enter') {
        e.preventDefault()
        if (inputValue) {
            countryNameHandler(inputValue)
            inputElem.value = ''
        } else {
            Swal.fire('Please Enter The Value')
        }
    }
})

createNameCountry(country_list)
getInformation(countryName)