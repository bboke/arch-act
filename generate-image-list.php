<?php
$dir = "freedom-photos/";
$images = glob($dir . "*.{jpg,jpeg}", GLOB_BRACE);
$image_list = array();

foreach($images as $image) {
$image_list[] = $image;
}

file_put_contents('images.json', json_encode($image_list));
echo "Image list generated successfully!";
?>