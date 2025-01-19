<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curso Online</title>    
    <link rel="stylesheet" href="../assets/css/styles.css">    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            
            <span class="navbar-text text-white fw-bold me-auto">
                Minha Plataforma
            </span>
            
            <div class="d-flex align-items-center">
                
                <form class="d-flex me-3">
                    <input class="form-control me-2" type="search" placeholder="Pesquisar cursos..." aria-label="Pesquisar">
                    <button class="btn btn-outline-light" type="submit">Buscar</button>
                </form>
                
                <div class="dropdown">
                    <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">                        
                        <img src="https://via.placeholder.com/40" alt="Foto do Usuário" class="rounded-circle me-2" style="width: 40px; height: 40px;">
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

    <div class="container mt-5">
        <h2 class="text-center mb-4">Nossos Cursos</h2>
        <div class="row" id="courses-container"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./js/courses.js"></script>
    <script src="./js/slide.js"></script>
</body>

</html>
