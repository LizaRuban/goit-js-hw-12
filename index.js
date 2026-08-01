import{a as b,S as L,i}from"./assets/vendor-Dx0MPrJo.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const w="56827809-548e8e575633a6bef97a51a72",S="https://pixabay.com/api/";async function q(r,t=1){return(await b.get(S,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}const d=document.querySelector(".gallery"),f=document.querySelector(".loader"),m=document.querySelector(".load-more-btn"),v=new L(".gallery a",{captionsData:"alt",captionDelay:250});function P(r){const t=r.map(({webformatURL:a,largeImageURL:s,tags:e,likes:o,views:n,comments:g,downloads:h})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img
            class="gallery-image"
            src="${a}"
            alt="${e}"
            loading="lazy"
          />
        </a>

        <div class="info">
          <p class="info-item"><b>Likes</b><span>${o}</span></p>
          <p class="info-item"><b>Views</b><span>${n}</span></p>
          <p class="info-item"><b>Comments</b><span>${g}</span></p>
          <p class="info-item"><b>Downloads</b><span>${h}</span></p>
        </div>
      </li>
    `).join("");d.insertAdjacentHTML("beforeend",t),v.refresh()}function $(){d.innerHTML=""}function B(){f.classList.remove("hidden")}function E(){f.classList.add("hidden")}function M(){m.classList.remove("hidden")}function u(){m.classList.add("hidden")}const p=document.querySelector(".form"),O=document.querySelector(".load-more-btn"),x=15;let c=1,l="";p.addEventListener("submit",A);O.addEventListener("click",_);async function A(r){if(r.preventDefault(),l=r.currentTarget.elements["search-text"].value.trim(),!l){u(),i.error({message:"Please enter a search query!"});return}c=1,$(),await y(),p.reset()}async function _(){c++,await y(!0)}async function y(r=!1){u(),B();try{const t=await q(l,c);if(t.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}P(t.hits),r&&G(),D(t.totalHits)}catch(t){console.error(t),i.error({message:"Something went wrong!"})}finally{E()}}function D(r){c*x<r?M():(u(),i.info({message:"We're sorry, but you've reached the end of search results."}))}function G(){const r=document.querySelector(".gallery-item");if(!r)return;const t=r.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
