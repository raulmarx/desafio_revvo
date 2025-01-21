const apiUrl = "http://localhost/desafio_revvo/src/CourseController.php?action=";

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        updateCourseModal: document.getElementById("updateCourseModal"),
        updateCourseForm: document.getElementById("update-course-form"),
        updateTitleInput: document.getElementById("updateCourseTitle"),
        updateDescriptionInput: document.getElementById("updateCourseDescription"),
        updateBannerInput: document.getElementById("updateCourseBanner"),
        updateCardImageInput: document.getElementById("updateCourseCardImage"),
        updateBannerPreview: document.getElementById("updateBannerPreview"),
        updateCardPreview: document.getElementById("updateCardPreview"),
        coursesContainer: document.getElementById('courses-container'),
    };

    window.fetchCourses = async () => {
        try {
            const response = await fetch(apiUrl + "coursesGetRequest");
            const courses = await response.json();

            elements.coursesContainer.innerHTML = '';
            courses.data.forEach(renderCourse);
            addNewCourseButton();
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
        }
    };

    const renderCourse = (course) => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('col-md-3', 'd-flex');
        courseElement.innerHTML = `
            <div class="card">
                <img src="../src/${course.image}" class="card-img-top mx-auto d-block" alt="${course.title}" style="width: 300px; height: auto;">
                <div class="card-body position-relative">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description}</p>
                    <a href="#" class="btn btn-primary">Ver mais</a>
                    <div class="dropdown position-absolute top-0 end-0 m-2">
                        <button class="btn dots btn-sm" type="button" id="dropdownMenuButton-${course.id}" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton-${course.id}">
                            <li><button class="dropdown-item btn-update-course" data-course-id='${course.id}'>Atualizar</button></li>
                            <li><button class="dropdown-item text-danger btn-delete-course" data-course-id='${course.id}'>Excluir</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        elements.coursesContainer.appendChild(courseElement);
    };

    const addNewCourseButton = () => {
        const existingButton = document.getElementById('add-new-course-btn-container');
        if (existingButton) return;

        const addNewCourseElement = document.createElement('div');
        addNewCourseElement.id = 'add-new-course-btn-container';
        addNewCourseElement.classList.add('col-md-3', 'd-flex');
        addNewCourseElement.innerHTML = `
            <button class="card border-dashed text-center w-100 justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#createCourseModal" style="opacity: 0.3; border: 5px dashed #000; cursor: pointer;">
                <div class="card-body d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
                    <i class="bi bi-folder-plus" style="font-size: 5rem;"></i>
                    <p class="card-text mt-2">Adicionar novo curso</p>
                </div>
            </button>
        `;

        elements.coursesContainer.appendChild(addNewCourseElement);
    };

    const getCourseById = async (courseId) => {
        const response = await fetch(apiUrl + "coursesGetByIdRequest&id=" + courseId);
        const course = await response.json();
        return course.data;
    };

    const openUpdateCourseModal = (course) => {
        elements.updateCourseForm.dataset.courseId = course.id;
        elements.updateTitleInput.value = course.title;
        elements.updateDescriptionInput.value = course.description;

        elements.updateBannerPreview.style.display = course.banner ? "block" : "none";
        elements.updateBannerPreview.src = course.banner ? "../src/" + course.banner : '';

        elements.updateCardPreview.style.display = course.image ? "block" : "none";
        elements.updateCardPreview.src = course.image ? "../src/" + course.image : '';

        const bootstrapModal = new bootstrap.Modal(elements.updateCourseModal);
        bootstrapModal.show();
    };

    const updatePreview = (input, previewElement) => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewElement.src = e.target.result;
                previewElement.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            previewElement.style.display = "none";
        }
    };

    elements.updateBannerInput.addEventListener("change", () => {
        updatePreview(elements.updateBannerInput, elements.updateBannerPreview);
    });

    elements.updateCardImageInput.addEventListener("change", () => {
        updatePreview(elements.updateCardImageInput, elements.updateCardPreview);
    });

    elements.coursesContainer.addEventListener("click", async (event) => {
        if (event.target.classList.contains("btn-update-course")) {
            const courseId = event.target.dataset.courseId;
            const course = await getCourseById(courseId);
            openUpdateCourseModal(course);
        }
        if (event.target.classList.contains("btn-delete-course")) {
            const courseId = event.target.dataset.courseId;
            deleteCourse(courseId);
        }
    });

    const deleteCourse = async (courseId) => {
        if (!confirm("Tem certeza que deseja excluir este curso?")) return;

        try {
            const response = await fetch(apiUrl + "coursesDeleteRequest", {
                method: "POST",
                body: new URLSearchParams({ id: courseId }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Curso excluído com sucesso!");
                fetchCourses();
            } else {
                alert("Erro ao excluir curso: " + result.message);
            }
        } catch (error) {
            console.error("Erro ao excluir curso:", error);
        }
    };

    const showAlert = (message, type = 'warning') => {
        const alertPlaceholderUpdate = document.getElementById('alert-placeholder-update');

        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type} alert-dismissible fade show`;
        alertElement.role = 'alert';
        alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
        alertPlaceholderUpdate.appendChild(alertElement);
    };

    const validateForm = (title, description, banner, image) => {
        if (!title || !description) {
            showAlert("Título e descrição são obrigatórios.");
            return false;
        }
        if (!banner) {
            showAlert("Banner é obrigatório.");
            return false;
        }
        if (!image) {
            showAlert("Imagem é obrigatória.");
            return false;
        }
        return true;
    };

    elements.updateCourseForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const courseId = elements.updateCourseForm.dataset.courseId;
        const title = elements.updateTitleInput.value.trim();
        const description = elements.updateDescriptionInput.value.trim();
        const banner = elements.updateBannerInput.files[0];
        const image = elements.updateCardImageInput.files[0];

        if (!validateForm(title, description, banner, image)) {
            return;
        }

        const formData = new FormData(elements.updateCourseForm);
        formData.append("id", courseId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("banner", banner);
        formData.append("image", image);

        try {
            const response = await fetch(apiUrl + "coursesUpdateRequest", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result.status === "success") {
                showAlert("Curso atualizado com sucesso!", "success");
                fetchCourses();
                const bootstrapModal = bootstrap.Modal.getInstance(elements.updateCourseModal);
                bootstrapModal.hide();
            } else {
                showAlert("Erro ao atualizar curso: " + result.message);
            }
        } catch (error) {
            console.error("Erro ao atualizar curso:", error);
            showAlert("Erro inesperado ao atualizar curso. Tente novamente.");
        }
    });

    fetchCourses();
});
