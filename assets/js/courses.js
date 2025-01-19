
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
        const courseElement = document.createElement('div');
        courseElement.classList.add('col-md-4', 'd-flex');
        

        courseElement.innerHTML = `
          <div class="card">
            <img src="../src/${course.image}" class="card-img-top" alt="${course.title}">
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text">${course.description}</p>
              <a href="${course.link}" class="btn btn-primary">Ver mais</a>
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
