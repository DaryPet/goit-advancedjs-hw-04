import{a as m,S as h,i as g}from"./assets/vendor-5401a4b0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const y="42508369-6cc99fb978405cb8598a23b23",E="https://pixabay.com/api/",L="photo",w="horizontal",b=!0,$=15;async function p(r,t=1){try{const s=encodeURIComponent(r),n=`${E}?key=${y}&q=${s}&image_type=${L}&orientation=${w}&safesearch=${b}&per_page=${$}&page=${t}`,e=await m.get(n);if(e.status!==200)throw new Error("Image error");return e.data}catch(s){throw new Error("Error while fetching images from pixabay",s)}}function v(r,t){t.innerHTML="";const s=r.map(e=>` <div class="card">
         <a href="${e.webformatURL}"><img class="card-image" src="${e.webformatURL}" alt="${e.tags}" />
         <div class="card-info">
           <p>Likes: <span>${e.likes}</span></p>
           <p>Views: <span>${e.views}</span></p>
           <p>Comments: <span>${e.comments}</span></p>
           <p>Downloads:<span>${e.downloads}</span></p>
         </div></a>
       </div> `).join("");t.innerHTML=s,new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function i(r){g.error({title:"Error",message:r,position:"topRight"})}const S=document.querySelector("#search-form"),I=document.querySelector("#search-input"),P=document.querySelector(".gallery"),c=document.getElementById("loader"),d=document.querySelector(".btn-load-more");let a="",u=1;S.addEventListener("submit",async function(r){if(r.preventDefault(),a=I.value.trim(),a===""){i("Please fill input");return}c.classList.remove("is-hidden");try{const t=await p(a,1);u=1,f(t)}catch(t){console.error("Error during search:",t),i("Error")}finally{c.classList.add("is-hidden")}});d.addEventListener("click",async function(){c.classList.remove("is-hidden");try{const r=await p(a,u+1);u++,f(r)}catch(r){console.error("Error during loading more images:",r),i("Error loading more images")}finally{c.classList.add("is-hidden")}});function f(r){if(r.hits.length===0){i("Sorry, there are no images matching your search query. Please try again!");return}d.classList.contains("is-hidden")&&d.classList.remove("is-hidden"),v(r.hits,P)}
//# sourceMappingURL=commonHelpers.js.map
