const data = JSON.parse(dataJSON);
let cartItems = [];

// Функция для добавления продуктов в список
function addProductsToList(products) {
    // Получаем элемент ul для добавления продуктов
    const productList = document.getElementById('product-list');
    // Генерация HTML-кода для списка продуктов
    let htmlContent = '';
    products.forEach(product => {
        htmlContent += `
        <li>
        <img src="${product.image}" alt="${product.title}" width="150" height="150">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </li>`;
    });
    // Добавляем HTML-код в элемент ul
    productList.insertAdjacentHTML('beforeend', htmlContent);
}

// Функция для обновления корзины
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');

    cartItemsContainer.innerHTML = ''; // Очищаем содержимое корзины
    if (cartItems.length > 0) {
        document.querySelector('.cart').style.display = 'block'; // Показываем раздел корзины
        cartItems.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = item.title; // Название товара
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '✖'; // Кнопка удаления
            removeBtn.addEventListener('click', () => {
                removeFromCart(item.id); // Удаляем товар из корзины
            });
            cartItem.appendChild(removeBtn);
            cartItemsContainer.appendChild(cartItem); // Добавляем товар в корзину
        });
    } else {
        document.querySelector('.cart').style.display = 'none'; // Скрываем раздел, если корзина пуста
    }
}

// Функция для добавления товара в корзину
function addToCart(productId) {
    const product = data.find(item => item.id === productId);
    if (product && !cartItems.some(item => item.id === productId)) {
        cartItems.push(product); // Добавляем товар в корзину
        updateCart(); // Обновляем корзину
    }
}

// Функция для удаления товара из корзины
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId); // Удаляем товар
    updateCart(); // Обновляем корзину
}
// После загрузки DOM вызываем функцию для добавления продуктов
document.addEventListener('DOMContentLoaded', () => {
    addProductsToList(data);

    // Обрабатываем клики по кнопкам "Add to Cart"
    document.getElementById('product-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.dataset.id, 10);
            addToCart(productId); // Добавляем товар в корзину
        }
    });
});