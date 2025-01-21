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

    function previewImage(input, previewElement, errorElement, dimensions) {
        const file = input.files[0];

        if (file) {
            const img = new Image();
            img.onload = function () {
                if (this.width !== dimensions.width || this.height !== dimensions.height) {
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
    }

    courseBannerInput.addEventListener("change", () => {
        previewImage(courseBannerInput, bannerPreview, bannerError, { width: 970, height: 250 });
    });

    courseCardImageInput.addEventListener("change", () => {
        previewImage(courseCardImageInput, cardPreview, cardError, { width: 300, height: 200 });
    });

    createCourseForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = courseTitleInput.value.trim();
        const description = courseDescriptionInput.value.trim();
        const banner = courseBannerInput.files[0];
        const cardImage = courseCardImageInput.files[0];


        if (!title) {
            alert("O título do curso é obrigatório.");
            return;
        }

        if (!description) {
            alert("A descrição do curso é obrigatória.");
            return;
        }

        if (!banner) {
            alert("O banner do curso é obrigatório.");
            return;
        }

        if (!cardImage) {
            alert("A imagem do card é obrigatória.");
            return;
        }


        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("banner", banner);
        formData.append("cardImage", cardImage);

        try {
            const response = await fetch(apiUrl + "coursesPostRequest", {                
                method: "POST",
        
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                alert("Curso criado com sucesso!");
                createCourseForm.reset();
                bannerPreview.style.display = "none";
                cardPreview.style.display = "none";
            } else {
                const error = await response.json();
                alert(`Erro ao criar o curso: ${error.message}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao criar o curso. Tente novamente mais tarde.");
        }
    });
});
