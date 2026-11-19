let url = 'https://jsonplaceholder.typicode.com/posts';


const getData = (jsonFilePath) => {
    return fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка при чтении файла: ${response.status}`);
            }
            return response.json()
        })
        .catch(err => console.log(err));
}

// const sendData = (data, url) => {
//     return fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => {
//         if (!response.ok){
//             throw new Error(`Ошибка при отправке данных ${response.status}`)
//         }
//         return response.json()})
//     .catch(err => console.log(err))
// }

const sendData = (data, url) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.responseType = 'json'
    xhr.send(JSON.stringify(data));

    xhr.addEventListener('load', () => {
        if (!xhr.status.toString().match(/^2/)) {
            alert(`Error ${xhr.status} -- ${xhr.statusText}`)
        } else {
            alert(`Success ${xhr.status}`)
            console.log(xhr.response)
        }
    })

}

getData('db.json')
    .then(response => sendData(response, url))
    .catch(err => console.log(err));