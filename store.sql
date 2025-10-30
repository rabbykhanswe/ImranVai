CREATE TABLE `reviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `rating` INT NOT NULL,
  `review_text` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo_path` VARCHAR(255) NULL,
  `submission_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `contact_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `message` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `submission_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE `site_gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `item_key` VARCHAR(50) NOT NULL UNIQUE,
  `media_path` VARCHAR(255) NOT NULL
);


INSERT INTO `site_gallery` (item_key, media_path) VALUES
('video_1', 'media/v1.mp4'),
('video_2', 'media/v2.mp4'),
('video_3', 'media/v3.mp4'),
('video_4', 'media/v4.mp4'),
('video_5', 'media/v5.mp4'),
('image_1', 'media/p1.jpg'),
('image_2', 'media/p2.jpg'),
('image_3', 'media/p3.jpg'),
('image_4', 'media/p4.jpg');