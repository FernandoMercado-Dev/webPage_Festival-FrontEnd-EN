document.addEventListener('DOMContentLoaded', function() {


    fixedNavegation();
    createGallery();
    highlightLinks();
    scrollNav();
})

function fixedNavegation() {
    const header = document.querySelector('.header');
    const aboutFestival = document.querySelector('.about-festival');
    
    window.addEventListener('scroll', function() {
        if( aboutFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    })
}

function createGallery() {

    const IMAGE_COUNT = 16;
    const gallery = document.querySelector('.gallery-images');

    for(let i = 1; i <= IMAGE_COUNT; i++) {
        const image = document.createElement('IMG');
        image.loading = 'lazy';
        image.width = '300';
        image.height = '200';
        image.src = `src/img/gallery/thumb/${i}.jpg`;
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

function highlightLinks() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navigation-main a');

        let actual = '';

        sections.forEach( section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navigation-main a');

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}