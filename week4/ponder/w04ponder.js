const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
    if (e.target.tagName !== 'IMG') {
        return;
    }
    modalImage.src = e.target.src.replace('-sm', '-full');
    modalImage.alt = e.target.alt;
    modal.showModal();
}

// Code to show modal  - Use event parameter 'e'   
closeButton.addEventListener('click', closeModal);

function closeModal() {
    modal.close();
}

// Close modal if clicking outside the image
modal.addEventListener('click', closeIfBackdrop);

function closeIfBackdrop(e) {
    if (e.target === modal) {
        modal.close();
    }
}
