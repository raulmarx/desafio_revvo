let apiUrl="http://localhost/desafio_revvo/src/CourseController.php?action=";document.addEventListener("DOMContentLoaded",()=>{(async()=>{try{var t=await(await fetch(apiUrl+"coursesGetRequest")).json();let e=document.getElementById("courses-container");e.innerHTML="",console.log(t),t.data.forEach(t=>{console.log(t);var o=document.createElement("div");o.classList.add("col-md-4","d-flex"),o.innerHTML=`
                <div class="card">
                    <img src="../src/${t.image}" class="card-img-top" alt="${t.title}">
                    <div class="card-body position-relative">
                    <h5 class="card-title">${t.title}</h5>
                    <p class="card-text">${t.description}</p>
                    <a href="${t.link}" class="btn btn-primary">Ver mais</a>
                    <!-- Menu de três pontos -->
                        <div class="dropdown position-absolute top-0 end-0 m-2">
                            <button
                            class="btn btn-secondary btn-sm dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton-${t.id}"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            >
                            <i class="bi bi-three-dots"></i> <!-- Ícone de três pontos -->
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton-${t.id}">
                            <li><button class="dropdown-item" onclick="openUpdateModal('${t.id}')">Atualizar</button></li>
                            <li><button class="dropdown-item text-danger" onclick="deleteCourse('${t.id}')">Excluir</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                `,e.appendChild(o)})}catch(t){console.error("Erro ao buscar cursos:",t)}})()});