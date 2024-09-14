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

        // Event Handler
        image.onclick = function() {
            showImage(i);
        }

        gallery.appendChild(image);
    }
}

function showImage(i) {
    const image = document.createElement('IMG');
    image.src = `src/img/gallery/full/${i}.jpg`;
    image.alt = 'Gallery Image';

    // Create Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = closeModal

    // Modal Close Button
    const modalCloseBtn =document.createElement('BUTTON');
    modalCloseBtn.textContent = 'X';
    modalCloseBtn.classList.add('btn-close');
    modalCloseBtn.onclick = closeModal
    
    // Add image and button on modal
    modal.appendChild(image);
    modal.appendChild(modalCloseBtn);

    // Add to html
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500)
}