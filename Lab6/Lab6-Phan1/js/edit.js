// LẤY BÀI VIẾT THEO ID
const urlParams = new URLSearchParams(window.location.search) ;
const id = urlParams.get('id');

const getById = () => {
    let titleInput = document.querySelector('#title');
    let contentInput = document.querySelector('#content');


    const request = new XMLHttpRequest();
    request.open('GET', `http://localhost:5555/blogs/${id}`);
    request.send();

    request.onload = function() {
        if(this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(request.responseText);
            const {title, content} = data.post;
            titleInput.value = title;
            contentInput.value = content; 
        }
    }
}
getById();

// CẬP NHẬT
const updatePost = (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;

    const data = JSON.stringify({title: title, content: content});

    const request = new XMLHttpRequest();
    
    request.open('PUT', `http://localhost:5555/blogs/${id}`);
    request.setRequestHeader("Content-Type","application/json; charset=UTF-8");
    request.send(data);

    window.location.href = 'index.html';
}