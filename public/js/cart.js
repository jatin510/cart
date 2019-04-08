$('#login').click(() => {
    if ($('#username').val() == ``) {
        alert('Please Enter username')
        return
    }
    $('#msg').html(`Here is you cart`)
    $.post('/show_cart', {
        username: $('#username').val()
    }, data => {
        console.log(data)
        for (let items of data) {
            let content = ``
            $('#cart_list').append(
                `
                <tr>
                    <td>${items.vendor.name}</td>
                    <td>${items.productName}</td>
                    <td>${items.price}</td>
                    <td>${items.qty}</td>
                    <td><button id='${items.id}' onclick='delete_product(this)'>Delete</button></td>
                </tr>    
                `
            )
        }

    })
})