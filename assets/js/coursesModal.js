document.addEventListener("DOMContentLoaded", () => {
    const createCourseForm = document.getElementById("create-course-form");
    const courseTitleInput = document.getElementById("courseTitle");
    const courseDescriptionInput = document.getElementById("courseDescription");
    const courseBannerInput = document.getElementById("courseBanner");
    const courseCardImageInput = document.getElementById("courseCardImage");
    const bannerPreview = document.getElementById("bannerPreview");
    const cardPreview = document.getElementById("cardPreview");
    const bannerError = document.getElementById("banner-error");
    const cardError = document.getElementById("card-error");

    const previewImage = (input, previewElement, errorElement, dimensions) => {
        const file = input.files[0];

        if (file) {
            const img = new Image();
            img.onload = () => {
                if (img.width !== dimensions.width || img.height !== dimensions.height) {
                    errorElement.textContent = `A imagem deve ter exatamente ${dimensions.width}x${dimensions.height} pixels.`;
                    previewElement.style.display = "none";
                    input.value = "";
                } else {
                    errorElement.textContent = "";
                    previewElement.src = URL.createObjectURL(file);
                    previewElement.style.display = "block";
                }
            };
            img.src = URL.createObjectURL(file);
        } else {
            previewElement.style.display = "none";
            errorElement.textContent = "";
        }
    };

    const showAlert = (message, type = 'warning') => {
        const alertPlaceholderCreate = document.getElementById('alert-placeholder-create');
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${type} alert-dismissible fade show`;
        alertElement.role = 'alert';
        alertElement.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertPlaceholderCreate.appendChild(alertElement);
    };

    const validateForm = () => {
        const title = courseTitleInput.value.trim();
        const description = courseDescriptionInput.value.trim();
        const banner = courseBannerInput.files[0];
        const cardImage = courseCardImageInput.files[0];

        if (!title) {
            showAlert("O título do curso é obrigatório.");
            return false;
        }

        if (!description) {
            showAlert("A descrição do curso é obrigatória.");
            return false;
        }

        if (!banner) {
            showAlert("O banner do curso é obrigatório.");
            return false;
        }

        if (!cardImage) {
            showAlert("A imagem do card é obrigatória.");
            return false;
        }

        return { title, description, banner, cardImage };
    };

    const createCourse = async (event) => {
        event.preventDefault();

        const formData = validateForm();
        if (!formData) return;

        const { title, description, banner, cardImage } = formData;

        const data = new FormData();
        data.append("title", title);
        data.append("description", description);
        data.append("banner", banner);
        data.append("image", cardImage);

        try {
            const response = await fetch(apiUrl + "coursesPostRequest", {
                method: "POST",
                body: data
            });

            if (response.ok) {
                const result = await response.json();
                if (result.status === "error") {
                    showAlert(`Erro ao criar o curso: ${result.message}`);
                    return;
                }
                showAlert("Curso criado com sucesso!");
                createCourseForm.reset();
                bannerPreview.style.display = "none";
                cardPreview.style.display = "none";
                fetchCourses();
            } else {
                const error = await response.json();
                showAlert(`Erro ao criar o curso: ${error.message}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            showAlert("Erro ao criar o curso");
        }
    };

    courseBannerInput.addEventListener("change", () => {
        previewImage(courseBannerInput, bannerPreview, bannerError, { width: 970, height: 250 });
    });

    courseCardImageInput.addEventListener("change", () => {
        previewImage(courseCardImageInput, cardPreview, cardError, { width: 300, height: 200 });
    });

    createCourseForm.addEventListener("submit", createCourse);
});
