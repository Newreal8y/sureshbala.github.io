// Movie Database
const movies = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        genre: "Drama",
        rating: 9.3,
        poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        tags: ["Hope", "Friendship", "Prison Drama"]
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        genre: "Crime",
        rating: 9.2,
        poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        tags: ["Mafia", "Family", "Classic"]
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        genre: "Action",
        rating: 9.0,
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.",
        tags: ["Superhero", "Thriller", "DC"]
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        genre: "Crime",
        rating: 8.9,
        poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        tags: ["Crime", "Tarantino", "Cult Classic"]
    },
    {
        id: 5,
        title: "Forrest Gump",
        year: 1994,
        genre: "Drama",
        rating: 8.8,
        poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
        tags: ["Inspiring", "Life Story", "Drama"]
    },
    {
        id: 6,
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        rating: 8.8,
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
        tags: ["Mind-Bending", "Action", "Nolan"]
    },
    {
        id: 7,
        title: "Fight Club",
        year: 1999,
        genre: "Drama",
        rating: 8.8,
        poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
        tags: ["Psychological", "Cult Classic", "Dark"]
    },
    {
        id: 8,
        title: "The Matrix",
        year: 1999,
        genre: "Sci-Fi",
        rating: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        tags: ["Cyberpunk", "Action", "Philosophy"]
    },
    {
        id: 9,
        title: "Goodfellas",
        year: 1990,
        genre: "Crime",
        rating: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his partners in crime.",
        tags: ["Mafia", "Biography", "Scorsese"]
    },
    {
        id: 10,
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.6,
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        tags: ["Space", "Epic", "Emotional"]
    },
    {
        id: 11,
        title: "Parasite",
        year: 2019,
        genre: "Thriller",
        rating: 8.6,
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        tags: ["Social Commentary", "Thriller", "Oscar Winner"]
    },
    {
        id: 12,
        title: "The Prestige",
        year: 2006,
        genre: "Mystery",
        rating: 8.5,
        poster: "https://image.tmdb.org/t/p/w500/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
        description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have.",
        tags: ["Mystery", "Rivalry", "Magic"]
    },
    {
        id: 13,
        title: "Whiplash",
        year: 2014,
        genre: "Drama",
        rating: 8.5,
        poster: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
        description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing.",
        tags: ["Music", "Intense", "Drama"]
    },
    {
        id: 14,
        title: "The Departed",
        year: 2006,
        genre: "Crime",
        rating: 8.5,
        poster: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
        description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
        tags: ["Crime", "Thriller", "Scorsese"]
    },
    {
        id: 15,
        title: "Gladiator",
        year: 2000,
        genre: "Action",
        rating: 8.5,
        poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
        description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
        tags: ["Epic", "Historical", "Revenge"]
    },
    {
        id: 16,
        title: "La La Land",
        year: 2016,
        genre: "Musical",
        rating: 8.0,
        poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
        description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
        tags: ["Romance", "Musical", "Dreams"]
    },
    {
        id: 17,
        title: "Dune",
        year: 2021,
        genre: "Sci-Fi",
        rating: 8.0,
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
        tags: ["Epic", "Desert", "Politics"]
    },
    {
        id: 18,
        title: "Joker",
        year: 2019,
        genre: "Drama",
        rating: 8.4,
        poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society, leading him to embrace nihilism.",
        tags: ["Dark", "Character Study", "DC"]
    },
    {
        id: 19,
        title: "Avengers: Endgame",
        year: 2019,
        genre: "Action",
        rating: 8.4,
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        description: "After the devastating events, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
        tags: ["Superhero", "Epic", "MCU"]
    },
    {
        id: 20,
        title: "Spirited Away",
        year: 2001,
        genre: "Animation",
        rating: 8.6,
        poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
        description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
        tags: ["Fantasy", "Ghibli", "Adventure"]
    }
];

// App State
let currentMovieIndex = 0;
let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
let dislikedMovies = JSON.parse(localStorage.getItem('dislikedMovies')) || [];
let ratedMovieIds = JSON.parse(localStorage.getItem('ratedMovieIds')) || [];

// DOM Elements
const cardStack = document.getElementById('cardStack');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const statsBtn = document.getElementById('statsBtn');
const statsModal = document.getElementById('statsModal');
const closeBtn = document.getElementById('closeBtn');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const noMovies = document.getElementById('noMovies');
const swipeHint = document.getElementById('swipeHint');

// Initialize App
function init() {
    // Filter out already rated movies
    const unratedMovies = movies.filter(movie => !ratedMovieIds.includes(movie.id));

    if (unratedMovies.length === 0) {
        showNoMovies();
        return;
    }

    // Load initial cards
    loadCards();

    // Event listeners
    likeBtn.addEventListener('click', () => handleChoice('like'));
    dislikeBtn.addEventListener('click', () => handleChoice('dislike'));
    statsBtn.addEventListener('click', openStatsModal);
    closeBtn.addEventListener('click', closeStatsModal);
    resetBtn.addEventListener('click', resetData);
    restartBtn.addEventListener('click', restartApp);

    // Close modal on backdrop click
    statsModal.addEventListener('click', (e) => {
        if (e.target === statsModal) closeStatsModal();
    });

    // Hide hint after first interaction
    let hintShown = true;
    document.addEventListener('click', () => {
        if (hintShown && swipeHint) {
            swipeHint.style.opacity = '0';
            setTimeout(() => swipeHint.style.display = 'none', 300);
            hintShown = false;
        }
    }, { once: true });
}

// Load Cards
function loadCards() {
    const unratedMovies = movies.filter(movie => !ratedMovieIds.includes(movie.id));

    // Load up to 3 cards
    cardStack.innerHTML = '';
    for (let i = 0; i < Math.min(3, unratedMovies.length); i++) {
        const movie = unratedMovies[i];
        const card = createCard(movie);
        cardStack.appendChild(card);
    }

    // Add swipe functionality to the top card
    if (cardStack.firstChild) {
        initSwipe(cardStack.firstChild);
    }
}

// Create Movie Card
function createCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.movieId = movie.id;

    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
        <div class="swipe-indicator like">LIKE</div>
        <div class="swipe-indicator dislike">PASS</div>
        <div class="movie-info">
            <div class="movie-header">
                <h2 class="movie-title">${movie.title}</h2>
                <div class="movie-rating">★ ${movie.rating}</div>
            </div>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <span>•</span>
                <span class="movie-genre">${movie.genre}</span>
            </div>
            <p class="movie-description">${movie.description}</p>
            <div class="movie-tags">
                ${movie.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

// Swipe Functionality
function initSwipe(card) {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const likeIndicator = card.querySelector('.swipe-indicator.like');
    const dislikeIndicator = card.querySelector('.swipe-indicator.dislike');

    // Touch Events
    card.addEventListener('touchstart', handleStart);
    card.addEventListener('touchmove', handleMove);
    card.addEventListener('touchend', handleEnd);

    // Mouse Events
    card.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    function handleStart(e) {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        card.classList.add('swiping');
    }

    function handleMove(e) {
        if (!isDragging) return;

        e.preventDefault();
        currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;
        const rotation = deltaX * 0.1;

        card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

        // Show indicators
        if (deltaX > 50) {
            likeIndicator.style.opacity = Math.min(deltaX / 100, 1);
            dislikeIndicator.style.opacity = 0;
        } else if (deltaX < -50) {
            dislikeIndicator.style.opacity = Math.min(Math.abs(deltaX) / 100, 1);
            likeIndicator.style.opacity = 0;
        } else {
            likeIndicator.style.opacity = 0;
            dislikeIndicator.style.opacity = 0;
        }
    }

    function handleEnd() {
        if (!isDragging) return;

        isDragging = false;
        card.classList.remove('swiping');

        const deltaX = currentX - startX;
        const threshold = 100;

        if (deltaX > threshold) {
            // Swiped right - Like
            removeCard(card, 'like');
        } else if (deltaX < -threshold) {
            // Swiped left - Dislike
            removeCard(card, 'dislike');
        } else {
            // Return to center
            card.style.transform = '';
            card.querySelector('.swipe-indicator.like').style.opacity = 0;
            card.querySelector('.swipe-indicator.dislike').style.opacity = 0;
        }
    }
}

// Handle Choice (Button Click)
function handleChoice(choice) {
    const topCard = cardStack.firstChild;
    if (!topCard) return;

    removeCard(topCard, choice);
}

// Remove Card
function removeCard(card, choice) {
    const movieId = parseInt(card.dataset.movieId);
    const movie = movies.find(m => m.id === movieId);

    if (!movie) return;

    // Add to appropriate list
    if (choice === 'like') {
        likedMovies.push(movie);
        card.classList.add('removed', 'like-removed');
    } else {
        dislikedMovies.push(movie);
        card.classList.add('removed', 'dislike-removed');
    }

    // Add to rated list
    ratedMovieIds.push(movieId);

    // Save to localStorage
    saveToStorage();

    // Remove card after animation
    setTimeout(() => {
        card.remove();

        // Load next card
        const unratedMovies = movies.filter(m => !ratedMovieIds.includes(m.id));

        if (cardStack.children.length < 3 && unratedMovies.length > 0) {
            const nextMovie = unratedMovies[cardStack.children.length];
            if (nextMovie) {
                const newCard = createCard(nextMovie);
                cardStack.appendChild(newCard);
            }
        }

        // Initialize swipe on new top card
        if (cardStack.firstChild) {
            initSwipe(cardStack.firstChild);
        } else if (unratedMovies.length === 0) {
            showNoMovies();
        }
    }, 500);
}

// Save to localStorage
function saveToStorage() {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    localStorage.setItem('dislikedMovies', JSON.stringify(dislikedMovies));
    localStorage.setItem('ratedMovieIds', JSON.stringify(ratedMovieIds));
}

// Stats Modal
function openStatsModal() {
    updateStats();
    statsModal.classList.add('active');
}

function closeStatsModal() {
    statsModal.classList.remove('active');
}

function updateStats() {
    document.getElementById('likedCount').textContent = likedMovies.length;
    document.getElementById('dislikedCount').textContent = dislikedMovies.length;
    document.getElementById('totalCount').textContent = ratedMovieIds.length;

    // Update liked movies list
    const likedMoviesList = document.getElementById('likedMoviesList');

    if (likedMovies.length === 0) {
        likedMoviesList.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No liked movies yet</p>';
    } else {
        likedMoviesList.innerHTML = likedMovies.map(movie => `
            <div class="movie-item">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-item-poster">
                <div class="movie-item-info">
                    <div class="movie-item-title">${movie.title}</div>
                    <div class="movie-item-year">${movie.year} • ${movie.genre}</div>
                </div>
            </div>
        `).join('');
    }
}

// Reset Data
function resetData() {
    if (confirm('Are you sure you want to reset all your data? This cannot be undone.')) {
        likedMovies = [];
        dislikedMovies = [];
        ratedMovieIds = [];
        saveToStorage();
        closeStatsModal();
        restartApp();
    }
}

// Restart App
function restartApp() {
    noMovies.style.display = 'none';
    currentMovieIndex = 0;
    cardStack.innerHTML = '';
    loadCards();
}

// Show No Movies Screen
function showNoMovies() {
    cardStack.style.display = 'none';
    noMovies.style.display = 'block';
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (statsModal.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') {
        handleChoice('dislike');
    } else if (e.key === 'ArrowRight') {
        handleChoice('like');
    }
});
