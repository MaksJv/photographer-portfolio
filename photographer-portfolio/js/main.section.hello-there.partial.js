function showPhotos(category) {
    document.querySelectorAll('.hello-there__category').forEach(function (cat) {
        cat.classList.add('hidden');
    });

    const selectedCategory = document.querySelector('.hello-there__category--' + category);
    if (selectedCategory) {
        selectedCategory.classList.remove('hidden');
    }

    document.querySelectorAll('.hello-there__tab-button').forEach(function (button) {
        button.classList.remove('active');
        if (button.classList.contains(category)) {
            button.classList.add('active');
        }
    });
}

document.querySelectorAll('.hello-there__tab-button').forEach(function (button) {
    button.addEventListener('click', function () {
        document.querySelectorAll('.hello-there__tab-button').forEach(function (tab) {
            tab.classList.remove('active');
        });

        this.classList.add('active');

        const category = this.classList[1];
        showPhotos(category);
    });
});

showPhotos('nature');
