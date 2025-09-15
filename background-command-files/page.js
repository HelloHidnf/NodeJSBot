window.onload = function (){
    const eventsrc = new EventSource("http://localhost:4444/event");
    eventsrc.onopen = () => {
        console.log("yay")
    }

    eventsrc.addEventListener("backgrounds", (e) => {
        console.log(e.data)
        let data = JSON.stringify(e.data).split(",")
        data = data[document.URL.charAt(document.URL.length-1)-1].replaceAll(`"`, ``)
        console.log(data)
        document.body.style.backgroundImage = `url(${data})`
    })
}