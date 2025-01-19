<?php
require_once 'db_connect.php';

class Course
{
    private $conn;
    private $uploadDir = "uploads/";

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getCourses()
    {
        $query = "SELECT id, title, description, image FROM courses";
        $result = $this->conn->query($query);

        return $result->fetch_all(MYSQLI_ASSOC) ?? [];
    }

    public function addCourse($title, $description, $imagePath)
    {
        $stmt = $this->conn->prepare("INSERT INTO courses (title, description, image) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $title, $description, $imagePath);
        
        if (!$stmt->execute()) {
            throw new Exception("Erro ao inserir curso: " . $stmt->error);
        }
    }

    public function updateCourse($id, $title, $description, $imagePath)
    {
        $stmt = $this->conn->prepare("UPDATE courses SET title = ?, description = ?, image = ? WHERE id = ?");
        $stmt->bind_param("sssi", $title, $description, $imagePath, $id);
        
        if (!$stmt->execute()) {
            throw new Exception("Erro ao atualizar curso: " . $stmt->error);
        }
    }

    public function deleteCourse($id)
    {
        $stmt = $this->conn->prepare("DELETE FROM courses WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        if (!$stmt->execute()) {
            throw new Exception("Erro ao deletar curso: " . $stmt->error);
        }
    }

    public function uploadImage($image)
    {
        $this->validateImage($image);

        $imageFileType = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));
        $uniqueFileName = uniqid() . "." . $imageFileType;
        $targetFile = $this->uploadDir . $uniqueFileName;

        if (!is_dir($this->uploadDir)) {
            mkdir($this->uploadDir, 0755, true);
        }

        if (!move_uploaded_file($image["tmp_name"], $targetFile)) {
            throw new Exception("Erro ao fazer upload da imagem.");
        }

        return $targetFile;
    }

    private function validateImage($image)
    {
        $imageFileType = strtolower(pathinfo($image["name"], PATHINFO_EXTENSION));

        if (!getimagesize($image["tmp_name"])) {
            throw new Exception("O arquivo enviado não é uma imagem.");
        }

        if ($image["size"] > 5000000) {
            throw new Exception("O arquivo de imagem é muito grande. O limite é 5MB.");
        }

        $allowedFormats = ["jpg", "jpeg", "png", "gif"];
        if (!in_array($imageFileType, $allowedFormats)) {
            throw new Exception("Apenas imagens JPG, JPEG, PNG e GIF são permitidas.");
        }
    }
}
?>
