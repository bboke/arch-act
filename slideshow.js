document.addEventListener('DOMContentLoaded', function() {
 console.log('DOM loaded, fetching images...');
 
 // Fetch the image list from the JSON file
 fetch('images.json')
     .then(response => {
         console.log('Fetch response status:', response.status);
         if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return response.json();
     })
     .then(images => {
         console.log('Images loaded:', images);
         
         if (!images || images.length === 0) {
             console.error('No images found in the JSON file');
             return;
         }
         
         const slideshowContainer = document.querySelector('.slideshow-container');
         
         // Create slide elements for each image
         images.forEach((imagePath, index) => {
             console.log(`Creating slide for image ${index + 1}:`, imagePath);
             
             const slide = document.createElement('div');
             slide.className = 'slide fade';
             
             const img = document.createElement('img');
             img.src = imagePath;
             img.alt = 'Freedom Photo';
             
             // Add error handling for image loading
             img.onerror = function() {
                 console.error(`Failed to load image: ${imagePath}`);
                 this.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 300 200%22%3E%3Crect fill%3D%22%23ddd%22 width%3D%22300%22 height%3D%22200%22%3E%3C%2Frect%3E%3Ctext fill%3D%22%23555%22 x%3D%2250%25%22 y%3D%2250%25%22 text-anchor%3D%22middle%22%3EImage Error%3C%2Ftext%3E%3C%2Fsvg%3E';
             };
             
             slide.appendChild(img);
             slideshowContainer.appendChild(slide);
         });
         
         // Start the slideshow
         let slideIndex = 0;
         showSlides();
         
         function showSlides() {
             let slides = document.getElementsByClassName("slide");
             
             if (slides.length === 0) {
                 console.error('No slides found');
                 return;
             }
             
             // Hide all slides
             for (let i = 0; i < slides.length; i++) {
                 slides[i].style.display = "none";
             }
             
             // Move to next slide
             slideIndex++;
             
             // Reset to first slide if at the end
             if (slideIndex > slides.length) {
                 slideIndex = 1;
             }
             
             // Display the current slide
             slides[slideIndex - 1].style.display = "block";
             
             // Change image every 5 seconds
             setTimeout(showSlides, 5000);
         }
     })
     .catch(error => {
         console.error('Error loading images:', error);
         document.querySelector('.right-section').innerHTML = 
             '<div class="error-message">Failed to load images. Please check the console for details.</div>';
     });
});