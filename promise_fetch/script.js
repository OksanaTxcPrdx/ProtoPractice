let url = 'https://jsonplaceholder.typicode.com/posts';


const getData = (jsonFilePath) => {
    return fetch(jsonFilePath)
     .then(response => {
        if(!response.ok){
            throw new Error(`Ошибка при чтении файла: ${response.status}`);
        }
        return response.json()
     })
        .catch(err => console.log(err));
}

const sendData = (data, url) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok){
            throw new Error(`Ошибка при отправке данных ${response.status}`)
        }
        return response.json()})
    .catch(err => console.log(err))
}

getData('db.json')
.then(response=> console.log(sendData(response, url)))
.catch(err => console.log(err));