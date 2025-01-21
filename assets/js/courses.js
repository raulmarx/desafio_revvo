
const apiUrl = "http://localhost/desafio_revvo/src/CourseController.php?action=";
document.addEventListener('DOMContentLoaded', () => {

    const fetchCourses = async () => {
        try {

            const response = await fetch(apiUrl + "coursesGetRequest");
            const courses = await response.json();


            const coursesContainer = document.getElementById('courses-container');


            coursesContainer.innerHTML = '';

            console.log(courses);


            courses.data.forEach(course => {
                console.log(course);
                const courseElement = document.createElement('div');
                courseElement.classList.add('col-md-4', 'd-flex');


                courseElement.innerHTML = `
                <div class="card">
                    <img src="../src/${course.image}" class="card-img-top" alt="${course.title}">
                    <div class="card-body position-relative">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description}</p>
                    <a href="${course.link}" class="btn btn-primary">Ver mais</a>
                    <!-- Menu de três pontos -->
                        <div class="dropdown position-absolute top-0 end-0 m-2">
                            <button
                            class="btn btn-secondary btn-sm dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton-${course.id}"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            >
                            <i class="bi bi-three-dots"></i> <!-- Ícone de três pontos -->
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton-${course.id}">
                            <li><button class="dropdown-item" onclick="openUpdateModal('${course.id}')">Atualizar</button></li>
                            <li><button class="dropdown-item text-danger" onclick="deleteCourse('${course.id}')">Excluir</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                `;




                coursesContainer.appendChild(courseElement);
            });
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
        }
    };

    fetchCourses();
});
