$.get('/show_products', (products) => {

    for (data of products) {
        $('#products').append(`
        <div class='product_card'>
        <h2>${(data.name).toUpperCase()}</h2>
        <h3>${(data.vendor.name)}</h3>
        <h3> &#8377; ${data.price}</h3>
        <button id='${data.name}' onclick='addToCart(this)'>Add to cart</button>
        </div>
    `)
    }
})

$('#login').click(() => {
    if ($('#username').val() == ``) {
        alert('Please Enter username')
        return
    }
    $('#msg').html(`Great! Now add some product to cart`)
})

function addToCart(target) {
    if ($('#username').val() == ``) {
        alert('Please Login First')
        return
    }
    $.post('/addToCart', {
        name: target.id,
        username: $('#username').val()
    }, (data) => {
        console.log(data)
    })
}