const form = document.querySelector("form")
const text = document.querySelector("input[type='text']")
const ms1 = document.querySelector("#ms1")
const ms2 = document.querySelector("#ms2")
const ms3 = document.querySelector("#ms3")
const ms4 = document.querySelector("#ms4")
const sp1 = document.querySelector("#f")
const sp2 = document.querySelector("#s")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let address = text.value
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
    response.json().then((data) => {
        console.log(data)
        if(data.errorMessage)
        {
            ms1.textContent = data.errorMessage
            ms2.textContent = null
            ms3.textContent = null
            ms4.textContent = null
            sp1.textContent = null
            sp2.textContent = null
        }
        else{
            ms1.textContent = "Location: "+data.info.place_name
            ms2.textContent = data.info.weather
            sp1.textContent = "Temperature: "+data.info.temperature+"°C"
            sp2.textContent = "Feels Like: "+data.info.feelslike+"°C"
            ms4.textContent = "Humidity: "+data.info.humidity+" %"
        }
    })
})
})