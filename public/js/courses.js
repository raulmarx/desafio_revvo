let apiUrl="http://localhost/desafio_revvo/src/CourseController.php?action=";document.addEventListener("DOMContentLoaded",()=>{(async()=>{try{var e=await(await fetch(apiUrl+"coursesGetRequest")).json();let t=document.getElementById("courses-container");t.innerHTML="",console.log(e),e.data.forEach(e=>{var a=document.createElement("div");a.classList.add("col-md-4","d-flex"),a.innerHTML=`
          <div class="card">
            <img src="../src/${e.image}" class="card-img-top" alt="${e.title}">
            <div class="card-body">
              <h5 class="card-title">${e.title}</h5>
              <p class="card-text">${e.description}</p>
              <a href="${e.link}" class="btn btn-primary">Ver mais</a>
            </div>
          </div>
        `,t.appendChild(a)})}catch(e){console.error("Erro ao buscar cursos:",e)}})()});