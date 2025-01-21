<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curso Online</title>
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand me-auto" href="#">
                <img src="../assets/image/leo_logo.png" alt="Logo" style="height: 40px;">
            </a>
            <div class="d-flex align-items-center">
                <form class="d-flex me-3 position-relative">
                    <input class="form-control pe-5" type="search" placeholder="Pesquisar cursos..." aria-label="Pesquisar">
                    <button type="submit" class="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y px-2">
                        <i class="bi bi-search"></i>
                    </button>
                </form>
                <div class="dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="../assets/image/mesa3.jpg" alt="Foto do Usuário" class="rounded-circle me-2" style="width: 40px; height: 40px;">
                        <div class="d-flex flex-column">
                            <span>Nome do Usuário</span>
                            <small class="text-muted">Seja bem-vindo</small>
                        </div>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Perfil</a></li>
                        <li><a class="dropdown-item" href="#">Configurações</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sair</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <!-- Carousel -->
    <div id="courses-carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="carousel-content"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#courses-carousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#courses-carousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Próximo</span>
        </button>
    </div>

    <!-- Cursos -->
    <div class="container mt-5">
        <h2 class="mb-2">Nossos Cursos</h2>
        <hr class="mb-5">
        <div class="row" id="courses-container"></div>
        <div class="d-flex justify-content-center">
            <div class="card create-course-card text-center" data-bs-toggle="modal" data-bs-target="#createCourseModal">
                <i class="bi bi-plus-circle-fill" style="font-size: 3rem; color: #4e2096;"></i>
                <h5 class="mt-3">Criar Novo Curso</h5>
            </div>
        </div>
    </div>

    <!-- Welcome Modal -->
    <div class="modal fade" id="welcomeModal" tabindex="-1" aria-labelledby="welcomeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content position-relative">
                <button type="button" class="btn-close rounded-circle position-absolute" data-bs-dismiss="modal" aria-label="Fechar"></button>
                <div class="modal-image">
                    <img src="../assets/image/mesa3.jpg" alt="Imagem de Boas-vindas" class="img-fluid w-100 rounded-top">
                </div>
                <div class="modal-body text-center">
                    <h5 class="modal-title mb-3" id="welcomeModalLabel">Bem-vindo(a)!</h5>
                    <p class="mb-4">Bem-vindo(a) à nossa plataforma de cursos! Esperamos que você encontre o curso ideal para seus objetivos.</p>
                    <button type="button" class="btn btn-primary px-5 mt-3" data-bs-dismiss="modal">Começar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de cadastro -->
    <div class="modal fade" id="createCourseModal" tabindex="-1" aria-labelledby="createCourseModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createCourseModalLabel">Criar Novo Curso</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <form id="create-course-form">
                        <div class="mb-3">
                            <label for="courseTitle" class="form-label">Título do Curso</label>
                            <input type="text" class="form-control" id="courseTitle" placeholder="Nome do curso">
                        </div>
                        <div class="mb-3">
                            <label for="courseDescription" class="form-label">Descrição</label>
                            <textarea class="form-control" id="courseDescription" rows="3" placeholder="Descrição do curso"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="courseBanner" class="form-label">Banner do Curso (1200x400)</label>
                            <input type="file" class="form-control" id="courseBanner" accept="image/*">
                            <div id="banner-error" class="text-danger mt-2"></div>
                            <img id="bannerPreview" class="img-fluid mt-3" style="max-height: 200px; display: none;" alt="Pré-visualização do Banner">
                        </div>
                        <div class="mb-3">
                            <label for="courseCardImage" class="form-label">Imagem do Card (250x100)</label>
                            <input type="file" class="form-control" id="courseCardImage" accept="image/*">
                            <div id="card-error" class="text-danger mt-2"></div>
                            <img id="cardPreview" class="img-fluid mt-3" style="max-height: 100px; display: none;" alt="Pré-visualização do Card">
                        </div>
                        <button type="submit" class="btn btn-primary">Criar Curso</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Atualização de Curso -->
    <div class="modal fade" id="updateCourseModal" tabindex="-1" aria-labelledby="updateCourseModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="updateCourseModalLabel">Atualizar Curso</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <form id="update-course-form">
                        <div class="mb-3">
                            <label for="updateCourseTitle" class="form-label">Título do Curso</label>
                            <input type="text" class="form-control" id="updateCourseTitle" placeholder="Nome do curso">
                        </div>
                        <div class="mb-3">
                            <label for="updateCourseDescription" class="form-label">Descrição</label>
                            <textarea class="form-control" id="updateCourseDescription" rows="3" placeholder="Descrição do curso"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="updateCourseBanner" class="form-label">Atualizar Banner do Curso (1200x400)</label>
                            <input type="file" class="form-control" id="updateCourseBanner" accept="image/*">
                            <div id="update-banner-error" class="text-danger mt-2"></div>
                            <div class="preview-container mt-3">
                                <img id="updateBannerPreview" class="img-fluid" style="max-width: 100%; max-height: 200px; display: none;" alt="Pré-visualização do Banner">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="updateCourseCardImage" class="form-label">Atualizar Imagem do Card (250x100)</label>
                            <input type="file" class="form-control" id="updateCourseCardImage" accept="image/*">
                            <div id="update-card-error" class="text-danger mt-2"></div>
                            <div class="preview-container mt-3">
                                <img id="updateCardPreview" class="img-fluid" style="max-width: 100%; max-height: 100px; display: none;" alt="Pré-visualização do Card">
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Atualizar Curso</button>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./js/courses.js"></script>
    <script src="./js/slide.js"></script>
    <script src="./js/welcomeModal.js"></script>
    <script src="./js/coursesModal.js"></script>
</body>

</html>
