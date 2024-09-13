document.addEventListener('DOMContentLoaded', function() {
    createGallery();
})

function createGallery() {

    const IMAGE_COUNT = 16;
    const gallery = document.querySelector('.gallery-images');

    for(let i = 1; i <= IMAGE_COUNT; i++) {
        const image = document.createElement('IMG');
            image.src = `src/img/gallery/full/${i}.jpg`;
            image.alt = 'Gallery Image';

        gallery.appendChild(image);
    }
}