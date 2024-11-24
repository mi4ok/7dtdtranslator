<?php
$requestPayload = file_get_contents("php://input");
$data = json_decode($requestPayload, true);

if (!isset($data['text'])) {
    echo json_encode(['error' => 'No text provided for processing']);
    exit;
}

if (!isset($data['language'])) {
    echo json_encode(['error' => 'No language selected']);
    exit;
}

if (!isset($data['key'])) {
    echo json_encode(['error' => 'No key provided']);
    exit;
}

$language = $data['language'];

if (!isset($data['prompt']) || empty($data['prompt'])) {
    $prompt = "Просто переведи следующий после двоеточия текст на $language язык. Контекст - игра 7 days to die. Не нужно переводить что-то подобное [(((ColourModded)))] и прочее. Пример вместо [(((ColourModded)))]Counterfeit Old Cash[-] ты должен перевести как [(((ColourModded)))]Фальшивые старые деньги[-] ничего не удаляя и не добавляя лишний текст: ";
} else {
    $prompt = str_replace('{language}', $language, $data['prompt']);
}

$text = $prompt . $data['text'];
$apiKey = $data['key'];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
]);

$messages = [
    [
        'role' => 'user',
        'content' => $text
    ]
];

$requestBody = [
    'model' => $data['model'],
    'messages' => $messages
];

curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestBody));

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['error' => 'cURL error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

$responseData = json_decode($response, true);

if (isset($responseData['choices'][0]['message']['content'])) {
    $translatedText = trim($responseData['choices'][0]['message']['content']);
    echo json_encode(['translatedText' => $translatedText]);
} else {
    echo json_encode([
        'error' => 'Translation failed',
        'response' => $responseData
    ]);
}
?>