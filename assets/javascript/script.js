//Pre-Loader
$(window).on('load', function() {

  $('#preloader').fadeOut();

});

//Scroll header
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("header");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}


//nav-sidebar
var nav_t = document.getElementById('nav_id');
var nav_icon = document.getElementById('nav-icon');

function myNav(){
  nav_t.classList.toggle('open1');
  nav_icon.classList.toggle('open');
}

document.querySelectorAll('.nav-item')
  .forEach(navLink => navLink.addEventListener('click', () => {
    document.querySelector('.nav').classList.remove('open1');
    document.querySelector('#nav-icon').classList.remove('open');
  }));

document.querySelector('.nav-overlay').addEventListener('click', () => {
  document.querySelector('#nav-icon').classList.remove('open');
  document.querySelector('.nav').classList.remove('open1');
  document.querySelector('.nav-overlay').classList.remove('show');
  closeFilterMenu();
});

/* Blog Posts */

fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@shashankmotruri')
   .then((res) => res.json())
   .then((data) => {
      // Filter for acctual posts. Comments don't have categories, therefore can filter for items with categories bigger than 0
      const res = data.items //This is an array with the content. No feed, no info about author etc..
      const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !

      // Functions to create a short text out of whole blog's content
      function toText(node) {
         let tag = document.createElement('div')
         tag.innerHTML = node
         node = tag.innerText
         return node
      }
      function shortenText(text,startingPoint ,maxLength) {
         return text.length > maxLength?
         text.slice(startingPoint, maxLength):
         text
      }

      // Put things in right spots of markup
      let output = '';
      posts.forEach((item) => {
         output += `
         <li class="blog__post">
            <a href="${item.link}">
               <img src="${item.thumbnail}" class="blog__topImg"></img>
               <div class="blog__content">
                  <div class="blog_preview">
                     <h2 class="blog__title">${shortenText(item.title, 0, 30)+ '...'}</h2>
                     <p class="blog__intro">${'...' + shortenText(toText(item.content),0,90)+ '...'}</p>
                  </div>
                  <hr>
                  <div class="blog__info">
                     <span class="blog__author">${item.author}</span>
                     <span class="blog__date">${shortenText(item.pubDate,0 ,10)}</span>
                  </div>
               </div>
            <a/>
         </li>`

      })
      document.querySelector('.blog__slider').innerHTML = output
})


 

 //projects
 function main() {
  $('.skillset').hide();
  $('.skillset').fadeIn(1000);
  
  $('.Projects').hide();
  $('.projects-button').on('click', function(){
    $(this).next().slideToggle(400);
    $(this).toggleClass('active');
    $(this).text('Projects Viewed');
  });
}

$(document).ready(main);


//Smooth scrolling class

document.querySelectorAll('ul li a').forEach((link) => {
  function scrollTo(e) {
    e.preventDefault;
    const id = e.target.getAttribute('href');
    document.querySelector(`${id}`).scrollIntoView();
  }
  link.addEventListener('click', scrollTo);
})

