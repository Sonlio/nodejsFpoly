const app = angular.module("myApp", []);

app.controller('myController', ($scope, $http, $location,) => {{
    // Lấy dữ liệu
    $http.get("http://localhost:5555/blogs")
        .then(response => {
            $scope.posts = response.data.posts;
        })

    // Thêm bài viết mới
    $scope.addPost = () => {
        const title = $scope.title;
        const content = $scope.content;
        const data = JSON.stringify({title: title, content: content});
        $http.post("http://localhost:5555/blog", data)
            .then(response => {

            })
        window.location.reload();
    }

    // Xóa bài viết
    $scope.delete = (event) => {
        const id = event.currentTarget.getAttribute('idPost');
        $http.delete("http://localhost:5555/blogs/"+id)
            .then(response => {

            })
        window.location.reload();
    }
}})

// Update
app.controller('myCtrl', ($scope, $http, $location) => {
    // Lấy bài viết theo id
    const id = $location.search().id;
    $http.get("http://localhost:5555/blogs/"+id).then(response => {
            const post = response.data.post;
            const {title, content} = post;
            $scope.title = title;
            $scope.content = content;
        })

    // Cập nhật bài viết
     $scope.update = () => {
        const title = $scope.title;
        const content = $scope.content;
        const data = JSON.stringify({title: title, content: content});
        $http.put("http://localhost:5555/blogs/"+id, data)
            .then(response => {
                
            })
        window.location.href = 'index.html';
    }
})