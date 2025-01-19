
document.addEventListener('DOMContentLoaded', () => {
    const fetchCourses = async () => {
        try {
            
            const response = await fetch(apiUrl + "coursesGetRequest");
            const courses = await response.json(); 

            const carouselContent = document.getElementById('carousel-content');
            carouselContent.innerHTML = ''; 

            
            courses.data.forEach((course, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) carouselItem.classList.add('active'); 

                carouselItem.innerHTML = `
                    <img src="../src/${course.image}" alt="${course.title}">
                    <div class="carousel-caption">
                        <h5>${course.title}</h5>
                        <p>${course.description}</p>
                        <a href="${course.link}" class="btn btn-outline-light">Ver mais</a>
                    </div>
                    `;

                carouselContent.appendChild(carouselItem);
            });
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
        }
    };

    
    fetchCourses();
});
