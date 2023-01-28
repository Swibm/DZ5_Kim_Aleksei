const som = document.querySelector("#som")
const usd = document.querySelector("#usd")
const won = document.querySelector("#won")



const convert = (id, target1, target2) => {
    id.addEventListener("input", () => {
        const request = new XMLHttpRequest()
        request.open("GET", "data.json")
        request.setRequestHeader("Content-Type", "application/json")
        request.send()
        request.addEventListener("load", () => {
            const data = JSON.parse(request.response)
            
            if(id === won) {target1.value = (won.value * data.won_som).toFixed(2)
                    target2.value = (won.value / data.usd_won).toFixed(2)
                    }
            else if (id === usd) {target1.value = (usd.value * data.usd_won).toFixed(2)
                target2.value = (usd.value * data.usd_som).toFixed(2)
                }
            else if (id === som) {target1.value = (som.value / data.won_som).toFixed(2)
                target2.value = (som.value / data.usd_som).toFixed(2)
            }
            id.value === "" && (target1.value = "")
            id.value === "" && ( target2.value = "")
        })
    })
}

convert(won, som, usd)
convert(usd, won, som)
convert(som, won, usd)
