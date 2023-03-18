// LẤY TẤT CẢ CÁC BÀI VIẾT
const getAllPost = () => {
    // Gửi yêu cầu tới server
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:5555/blogs');
    request.send();

    // Nhận phản hồi từ server và xử lý dữ liệu
    request.onload = function() {
        if(this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(request.responseText);
            let list = '';
            data.posts.forEach(post => {
                const {id, title, content, createDate} = post;
                list += `
                    <tr>
                        <td>${id}</td>
                        <td>${title}</td>
                        <td>${content}</td>
                        <td>${createDate.substr(0, 10)}</td>
                        <td><a title="Xóa" id="delete" onclick="deletePost(event)" idPost="${id}"><i class="fa-solid fa-trash" style="color: red"></i></a> | <a title="Sửa" href="edit.html?id=${id}"><i class="fa-solid fa-pen-to-square" style="color: green"></i></a></td>
                    </tr>
                `
            });
            const showData = document.querySelector('#show-data');
            if(showData) {
                showData.innerHTML = list;
            }
        }
    }
}

getAllPost();

// THÊM BÀI VIÉT MỚI
const btn = document.querySelector('.btn');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    // Lấy dữ liệu từ form
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;

    // Tạo biến data cần thêm bằng json
    const data = JSON.stringify({title: title, content: content});

    // Gửi yêu cầu tới server
    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:5555/blog', );
    request.setRequestHeader("Content-Type","application/json; charset=UTF-8");

    // Xử lý
    request.onload = function() {
        if (this.readyState == 4 && this.status == 201) {
            // const data = JSON.parse(request.responseText);
            // Load lại danh sách bài viết
            getAllPost();
        }
    }
    request.send(data);
    location.reload();
})

// XÓA BÀI VIẾT
const deletePost = (event) => {
    const id = event.currentTarget.getAttribute('idPost');
    const request = new XMLHttpRequest();
    request.open('DELETE', `http://localhost:5555/blogs/${id}`);
    request.send();
    location.reload();
}