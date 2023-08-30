const handleNewsCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const newsCategory = data.data.news_category;
    // console.log(allNews);
    displayAllNewsCategory(newsCategory);
}

const displayAllNewsCategory = newsCategory => {
    // console.log(newsCategory);
    const newsCategoryContainer = document.getElementById('news-category-container');

    newsCategory = newsCategory.slice(0,3);

    newsCategory.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList = `tabs, tab`;
        categoryDiv.innerHTML = `
        <a onclick = "handleNews('${category?.category_id}')" class = "tab font-semibold text-lg"> ${category?.category_name
        } </a>
        `
        newsCategoryContainer.appendChild(categoryDiv)
    });
};

const handleNews = async (id) =>{
   const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
   const data = await response.json();
   const news = data.data;
   displayNews(news)
}

const displayNews = (news) => {
    // console.log(news);
    const newsContainer = document.getElementById('news-container');

    newsContainer.textContent = "";

    news.forEach(newses => {
        console.log(newses);
        const div =  document.createElement('div');
        div.classList = `card bg-base-100 shadow-xl`;
        div.innerHTML = `
        <figure><img src="${newses.image_url
        }" /></figure>
                <div class="card-body">
                  <h2 class="card-title">
                    ${newses?.title.slice(0,50)}
                    <div class="badge badge-secondary">${newses?.rating?.badge}</div>
                  </h2>
                  <p>${newses.title}</p>
                  <p>${newses?.details?.slice(0,50)}</p>
                  <p>Total views : ${newses.total_view
                  }</p>
                  <div class="card-actions justify-start">
                    <div class="badge mt-4"><img class = "w-[40px] rounded-full" src = "${newses.author.img}"/></div>
                    <div class="badge mt-4">
                    <button onclick = "newsDetails('${newses._id}')" class = "px-3 py-2 bg-pink-600 text-white rounded-md">Details</button>
                    </div>
                  </div>
                </div>
        `
        newsContainer.appendChild(div);
    })
};

const newsDetails = async (newsId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await response.json();
    const newsDetails = data.data[0];
    displayNewsDetails(newsDetails);
}

const displayNewsDetails = (newsDetails) => {
    console.log(newsDetails);
    display_news_details.showModal(newsDetails);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <img src = "${newsDetails?.image_url}"/>
    `

}



handleNewsCategory();
handleNews('01');