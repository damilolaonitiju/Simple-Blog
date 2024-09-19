document.addEventListener("DOMContentLoaded", async function () {
  const blogPosts = [
    {
      link: "blogposts/fashion-trends-2024.html",
    },
    {
      link: "blogposts/summer-style-guide.html",
    },
    {
      link: "blogposts/vintage-fashion-revival.html",
    },
  ];

  async function fetchBlogPostContent(url) {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const title = doc.querySelector(".blog-title").innerText;
    const content = doc.querySelector(".summary").innerHTML;
    const details = doc.querySelector(".details").innerText
    const imageSrc = doc.querySelector(".blog-image").src;

    return { title, content, details, imageSrc };
  }

  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const blogPostsContainer = document.getElementById("blog-posts");

  for (const post of blogPosts) {
    const { title, content, details, imageSrc } = await fetchBlogPostContent(post.link);

    const slideElement = document.createElement("div");
    slideElement.className = "swiper-slide";
    slideElement.innerHTML = `
      <div class="swiper-layout">
        <div class="swiper-text">
          <h1>${title}</h1>
          <div class="content-summary">${content}</div>
          <p><a class="read-more" href="${post.link}">read more...</a></p>
        </div>
        <div class="swiper-img">
          <img src="${imageSrc}" class="img" alt="${title}" />
        </div>
      </div>
    `;
    swiperWrapper.appendChild(slideElement);

    // Blog posts generation
    const postElement = document.createElement("div");
    postElement.className = "blog-post";

    const postSubElement = document.createElement("div");
    postSubElement.className = "flex-post";
    postElement.appendChild(postSubElement);

    const postImage = document.createElement("img");
    postImage.src = imageSrc;
    postImage.alt = title;
    postElement.appendChild(postImage);

    const postTitle = document.createElement("h2");
    postTitle.textContent = title;
    postSubElement.appendChild(postTitle);

    const postDetails = document.createElement("div");
    postDetails.className = "details";
    postDetails.textContent = details;
    postSubElement.appendChild(postDetails);

    const postLink = document.createElement("a");
    postLink.href = post.link;
    postLink.textContent = "Read more...";
    postSubElement.appendChild(postLink);

    blogPostsContainer.appendChild(postElement);
  }

  // Initialize Swiper
  const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    speed: 1500,
    effect: "coverflow",

  });
});
