function processPosts(posts){
    console.log("=== Post Analysis ===");

    console.log("1. All Titles and Bodies");
    for(let i=0; i<posts.length; i++){
        const post=posts[i];
        console.log(`Title: ${post.title}`);
        console.log(`Body: ${post.body}\n`)
    }

    console.log("2. Higher-Ordered Function")
    const titlesAndIds=posts.map(post=>{
        return{
            id:post.id,
            title:post.title
        }
    });
    console.log("Titles & IDs: ", titlesAndIds);

    const user1Posts=posts.filter(post => {
        return post.userId==1;
    });
    console.log("Posts from User 1: ",user1Posts);

    const postCountByUser=posts.reduce((accumulator,post) => {
        const userId = post.userId;
        if(!accumulator[userId]){
            accumulator[userId]=0;
        }
        accumulator[userId]++;
        return accumulator;
    }, {});
    console.log("Post Count by User: ", postCountByUser)

    const hasLongTitle=posts.some(post => {
        return post.title.length>50;
    });
    console.log("Any Title longer than 50 chars? ",hasLongTitle);

    const sortedPosts = [...posts].sort((a,b) => {
        if(a.title < b.title){
            return -1;
        }
        if(a.title > b.title){
            return 1;
        }
        return 0;
    });
    console.log("Posts sorted by Title: ", sortedPosts);

    const user7Titles=posts.filter(post => post.userId===7).map(post => post.title);
    console.log("Titles of Posts from User 7: ", user7Titles);
}

async function fetchAndProcessPosts(){
    const url = "https://jsonplaceholder.typicode.com/posts";

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Network reponse was not ok, Status: ${response.status}`);
        }

        const data = await response.json();

        console.log("=== Data Fetched Successfully ===");
        processPosts(data);
    } catch(error){
        console.error("Error fetching data: ",error);
    }
}
   

fetchAndProcessPosts()
