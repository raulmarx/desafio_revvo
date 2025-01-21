document.addEventListener("DOMContentLoaded",()=>{(async()=>{try{var e=await(await fetch(apiUrl+"coursesGetRequest")).json();let s=document.getElementById("carousel-content");s.innerHTML="",e.data.forEach((e,t)=>{var a=document.createElement("div");a.classList.add("carousel-item"),0===t&&a.classList.add("active"),a.innerHTML=`
                    <img src="../src/${e.banner}" alt="${e.title}">
                    <div class="carousel-caption">
                        <h5>${e.title}</h5>
                        <p>${e.description}</p>
                        <a href="#" class="btn btn-outline-light">Ver mais</a>
                    </div>
                    `,s.appendChild(a)})}catch(e){console.error("Erro ao buscar cursos:",e)}})()});