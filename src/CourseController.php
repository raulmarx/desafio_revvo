<?php
require_once 'db_connect.php';
require_once 'Course.php';

$conn = db_connect();

$course = new Course($conn);

function coursesRequest($course)
{
    $action = $_REQUEST['action'] ?? null;

    if (!$action) {
        sendErrorResponse('Action is required');
    }

    if (function_exists($action)) {
        call_user_func($action, $course);
    } else {
        sendErrorResponse('Invalid action');
    }
}

function coursesGetRequest($course)
{
    try {
        $courses = $course->getCourses();
        sendSuccessResponse(['data' => $courses]);
    } catch (Exception $e) {
        sendErrorResponse($e->getMessage());
    }
}

function coursesPostRequest($course)
{
    try {
        $title = $_POST['title'] ?? null;
        $description = $_POST['description'] ?? null;
        $imagePath = isset($_FILES['image']) ? $course->uploadImage($_FILES['image']) : null;

        if (!$title || !$description) {
            throw new Exception('Title and description are required');
        }

        $course->addCourse($title, $description, $imagePath);
        sendSuccessResponse(['message' => 'Course added successfully']);
    } catch (Exception $e) {
        sendErrorResponse($e->getMessage());
    }
}

function coursesUpdateRequest($course)
{
    try {
        $id = $_POST['id'] ?? null;
        $title = $_POST['title'] ?? null;
        $description = $_POST['description'] ?? null;
        $imagePath = isset($_FILES['image']) ? $course->uploadImage($_FILES['image']) : null;


        $course->updateCourse($id, $title, $description, $imagePath);
        sendSuccessResponse(['message' => 'Course updated successfully']);
    } catch (Exception $e) {
        sendErrorResponse($e->getMessage());
    }
}

function coursesDeleteRequest($course)
{
    try {
        $id = $_POST['id'] ?? null;

        if (!$id) {
            throw new Exception('ID is required');
        }

        $course->deleteCourse($id);
        sendSuccessResponse(['message' => 'Course deleted successfully']);
    } catch (Exception $e) {
        sendErrorResponse($e->getMessage());
    }
}

function sendSuccessResponse($data)
{
    echo json_encode(array_merge(['status' => 'success'], $data));
    exit;
}

function sendErrorResponse($message)
{
    echo json_encode(['status' => 'error', 'message' => $message]);
    exit;
}

coursesRequest($course);
