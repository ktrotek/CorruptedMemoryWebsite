async function fetchCarouselData() {
    try {
        const response = await fetch('https://localhost/corrupted-memory/wp-json/wp/v2/carousel?_embed');
        if (!response.ok) throw new Error('Failed to fetch carousel data');
        const carousels = await response.json();
        console.log('Fetched carousels:', carousels); // Debugging
        
        return carousels.map(carousel => ({
            //Get image URL from source_url
            imageUrl: carousel._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            
            // Get caption from title
            caption: carousel.title?.rendered || 'No Caption'
        }));
    } catch (error) {
        console.error('Error fetching carousel data:', error);
        return [];
    }
}

function populateCarousel(slidesData) {
    const slidesContainer = document.querySelector('.slideshowSlides');
    const dotsContainer = document.querySelector('.dots-container');

    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    slidesData.forEach((slide, index) => {
        // Create Slide 
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slideshowSlides';
        slideDiv.innerHTML = `
            <img src="${slide.imageUrl}" alt="${slide.caption}">
            <div class="slideCaption">${slide.caption}</div>
                            `;
        slidesContainer.appendChild(slideDiv);

        // Create dot
        const dotSpan = document.createElement('span');
        dotSpan.className = 'dot';
        dotSpan.setAttribute('onclick', `currentSlide(${index + 1})`);
        dotsContainer.appendChild(dotSpan);
    });

    showSlides(1);
}

document.addEventListener('DOMContentLoaded', async () => {
    const carouselData = await fetchCarouselData();
    if (carouselData.length > 0) {
        populateCarousel(carouselData);
    }
});
