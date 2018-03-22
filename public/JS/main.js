$(function() {

    // Nav Bar
    var $post = $("#post")
    var $status = $("#message-text")
    var $editUserModal = $(".editUserModal")
    var $editUserBtn = $(".editUserBtn")

    var $confirmDeletePostBtn = $('.confirmDeletePostBtn')

    $post.on("click", function (){
        $status.value() = ""
    })

    $("#modal").on("click", function() {
        var postForm = $('#post-form')
        postForm.attr('action', '/api/posts')
    })

    // Get and Patch User Info
    $editUserModal.on("click", function(){
        console.log("hey")
        var userId = $(this).attr("id")
        $("#editUser-form").attr("action", `/api/users/${currentUser._id}?_method=PATCH`)
        $("#editUsername").val(currentUser.username)
        $("#editEmail").val(currentUser.email)
        $("#editImageURL").val(currentUser.imageURL)
     })

    // Get and Patch User Info
    $editUserBtn.on("click", function(){
        console.log("hey")
        var userId = $(this).attr("id")
        var urlLocation = `/api/users/${userId}`
        httpClient({url: urlLocation , method: "patch"}).then((serverResponse)=>{
        })
    })
    

    // Feed
    var httpClient = axios.create()
    var $feed = $("#feed")
    var $card = $(".card")
    var posts = []
    
    function updateList(data){
        for(var i = 0; i < data.data.length; i++) {
            var dateCreated = moment(data.data[i].createdAt).format("MMM Do, YYYY h:mm a");
            posts.push(data.data[i])
            $feed.prepend(`
                <div class="post-holder">
                    <div class="card text-left" id=${data.data[i]._id}>
                        <div class="row" id=${data.data[i].user.email}>

                            <div class="col-sm-2 photo-holder">
                                <img id="photo" src="${data.data[i].user.imageURL}" />
                            </div>

                            <div class="col-sm-8 post-right" id=${data.data[i].user.imageURL} >
                            <h5 class="card-title" id=${data.data[i].user.imageURL}><span data-toggle="modal" data-target="#profileModal" class= "hover" id = ${data.data[i].user._id}>@${data.data[i].user.username}</span></h5>

                            <p class="card-text" id=1${data.data[i]._id}>${data.data[i].body}</p>
                            <span id="dateStamp">${dateCreated}</span>
                            ${loggedIn && currentUser._id === data.data[i].user._id ? `
                                <div class="crud-Btn">
                                    <a href="#" id=${data.data[i]._id}  class="btn btn-primary editModal" data-toggle="modal" data-target="#updateModal">Edit</a>
                                    <a href="#" id=${data.data[i]._id}  class="btn btn-primary delete">Delete</a>
                                </div> 
                            ` : ""}
                            </div>
                        </div>
                    </div>
                </div>
            `)
        }
    }

    var options = {
        method: "get",
        url: "/api/posts"
    }

    httpClient(options).then((serverResponse) => {
  
        updateList(serverResponse)
    })

    $feed.on("click", ".delete" , function(){
        var postId = $(this).attr("id")
        $confirmDeletePostBtn.attr("data-post-id", postId)

        $('#deletePostModal').modal({
            backdrop: 'static',
            keyboard: false
        })
    })

    // Delete post
    $confirmDeletePostBtn.on("click" , function(){
        var postId = $(this).attr("data-post-id")
        var urlLocation = `/api/posts/${postId}`
        console.log(urlLocation)
        httpClient({url: urlLocation , method: "delete"}).then((serverResponse)=>{

            // close the modal
            // find the post in the feed and remove it from the dom
            $("#" + postId).remove()
            $('#deletePostModal').modal('hide')
        })
     })
    
    // Confirm delete of posts
    $('button[name="remove_levels"]').on('click', function(e) {
        var $form = $(this).closest('form');
        e.preventDefault();
        $('#confirm').modal({
            backdrop: 'static',
            keyboard: false
          })
        .one('click', '#delete', function(e) {
            $form.trigger('submit');
        })
    })

    // Get and Patch Post
    $feed.on("click", ".editModal" , function(){
        var postId = $(this).attr("id")
        $("#edit-form").attr("action", `/api/posts/${postId}?_method=PATCH`)
        $("#textValue").text($("#1" + postId).text())
    })

    // Get and Patch Post
    $feed.on("click", ".edit" , function(){
        var postId = $(this).attr("id")
        var urlLocation = `/api/posts/${postId}`
        httpClient({url: urlLocation , method: "patch"}).then((serverResponse)=>{
        })
    })
})

//chat system
var $user = $("#user")
var $body = $("#body")
var $chatList = $("#chat-list")
var chatList = document.querySelector("#chat-list")
var $submitBtn = $("#submit-button")
var $end = $("#end")
var socket = io()
var $userList = $("#user-list")
var usernames = []

socket.on('connect', function() {
    socket.emit("user-info", {user: currentUser.username, id: socket.id})
    usernames.push(currentUser.username)
})

socket.on('disconnect', function(){
    var index = usernames.indexOf(currentUser.username)
    usernames.splice(index, 1)
    socket.emit('disconnected-socket', usernames)
})

socket.on("user-data", function(data){
    for(i=0;i< data.length;i++){
        $userList.append(`<li class="chat-message"> ${data[i]}</li>`)
    }
})

socket.on("new-connection", function (data){
    $("#number-of-users").text(data.users)
    console.log(data.users)
})


$('#chat-form').on("submit", function(evt){
    evt.preventDefault()
   socket.emit("new-message", {body: $body.val(), user: currentUser.username})
  $body.val("")
  $("#typing").text("")
   setTimeout(function(){
       chatList.scrollTop = chatList.scrollHeight
   }, 200)
})

socket.on("user-message", function(data){
    $chatList.append(
        `<div> ${data.user+": "+ data.body}</div>`
    )
    setTimeout(function(){
       chatList.scrollTop = chatList.scrollHeight
   }, 200)
   
})

$body.on("input", function(){
    if ($body.val()!== ""){
        socket.emit("someone", {body:currentUser.username + " is typing..."})
    }else if($body.val() === "") {
        socket.emit("someone", {body: ""})
    }
})

socket.on("notify", function(data){
    $("#typing").text(data.body)
})

$('#chat-show-hide').on('click', function(){
    $('#chat-system').slideToggle()
})

//profile modals
var httpClient = axios.create()
$("#feed").on("click",".hover", function(){
    $("#long-modal").text($(this)[0].innerText)
    var $userImage= $(this).parent().parent().attr("id")
    var $userEmail = $(this).parent().parent().parent().attr("id")
    var userId = $(this).attr("id")
    var cardList = document.querySelector("#card-list")
    $("#profile-image").attr("src", $(this).parent().attr("id"))
    $("#email").text($userEmail)
    httpClient({url:`/api/users/${userId}`, method: "get"}).then((serverResponse)=>{
        for (var i=0; i< 3 ; i++){
            var datePosted = moment(serverResponse.data.posts[i].createdAt).format("MMM Do, YYYY");
            $('#card-list').append(`<li class="list-group-item">${datePosted}: <br><br> ${serverResponse.data.posts[i].body}</li>`)
        }
    })
})


document.addEventListener("click", function(){
    $("#card-list").html("")
    
})