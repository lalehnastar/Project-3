
// Nav Bar
var post = document.querySelector("#post")
var status = document.querySelector("#message-text")

post.addEventListener("click", function (){
    status.value() = ""
})

$("#modal").on("click", function() {
    var postForm = $('#post-form')
    postForm.attr('action', '/api/posts')
})



// Feed
    var httpClient = axios.create()
    var $feed = $("#feed")
    var $card = $(".card")
    var posts = []
    
    function updateList(data){
        for(var i = 0; i < data.data.length; i++) {
            console.log(data.data[i].user.username)
            posts.push(data.data[i])
            $feed.prepend(`
                <div class="post-holder">
                    <div class="card text-left">
                        <div class="row">
                            <div class="col-sm-2 photo-holder">
                                <img id="photo" src="https://pbs.twimg.com/profile_images/927446347879292930/Fi0D7FGJ_400x400.jpg" />
                            </div>

                            <div class="col-sm-8 post-right">
                            <h5 class="card-title">@${data.data[i].user.username}</h5>

                            <p class="card-text">${data.data[i].body}</p>
                            
                            <div class="crud-Btn">
                                <a href="#" id=${data.data[i]._id}  class="btn btn-primary edit">Edit</a>
                                <a href="#" id=${data.data[i]._id}  class="btn btn-primary delete">Delete</a>
                            </div>
                        
                            </div>
                        </div>
                    </div>
                </div>
            `)
        }
    }

    const options = {
        method: "get",
        url: "/api/posts"
    }

    httpClient(options).then((serverResponse)=>{
        console.log(serverResponse)
        updateList(serverResponse)
    })

    $feed.on("click", ".delete" , function(){
        var postId = $(this).attr("id")
        console.log(postId)
        var urlLocation = `/api/posts/${postId}`
    
        httpClient({url: urlLocation , method: "delete"}).then((serverResponse)=>{
            console.log(serverResponse)
            
        })
        $(this).parents()[4].remove()
    })

    // Get and Patch
    $feed.on("click", ".edit" , function(){
        var postId = $(this).attr("id")
        console.log(postId)
        var postBtn = document.querySelector("#modal")
        var btn = $('#post')
        btn.text('Edit')
        $(postBtn).trigger('click')
        var postForm =$('#post-form')
        var url = `/api/posts/${postId}?_method=PATCH`
        console.log(url)
        postForm.attr('action', url)
       
        console.log(postForm)

        var urlLocation = `/api/posts/${postId}`
        httpClient({url: urlLocation , method: "patch"}).then((serverResponse)=>{
        console.log(serverResponse)
        })
    })

 



