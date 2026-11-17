let url = 'https://jsonplaceholder.typicode.com/posts';


const getData = (jsonFileData) => {
    jsonFileData.then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err));
}

const sendData = (data, url) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: data
    })
        .then(response => response.json())
        .then(users => console.log(users))
}

let data = getData(fetch('db.json'));
sendData(data, url);