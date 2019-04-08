$.get('/show_vendors', (data) => {
    let options = ``
    for (let vendor of data) {
        options += `<option value=${vendor.id}>${vendor.name}</option>`
    }
    $('#vendor_dropdown').append(options)
})

$('#add_product').click(() => {
    $.post('/add_product', {
        name: $('#product_name').val(),
        qty: $('#product_qty').val(),
        price: $('#product_price').val(),
        vendorId: $('#vendor_dropdown').val()
    }, (items) => {

        let content = ``
        $('#products_table').append(
            `
            <tr>
                <td>${items.x.id}</td>
                <td>${items.vendor.name}</td>
                <td>${items.x.name}</td>
                <td>${items.x.price}</td>
                <td>${items.x.qty}</td>
                <td><button id='${items.x.id}' onclick='delete_product(this)'>Delete</button></td>
            </tr>    
            `
        )
        $('#products_table').append(content)

    })
})

function refresh_products() {
    $.get('/show_products', (data) => {
        for (let items of data) {
            let content = ``
            $('#products_table').append(
                `
                <tr>
                    <td>${items.id}</td>
                    <td>${items.vendor.name}</td>
                    <td>${items.name}</td>
                    <td>${items.price}</td>
                    <td>${items.qty}</td>
                    <td><button id='${items.id}' onclick='delete_product(this)'>Delete</button></td>
                </tr>    
                `
            )
        }
    })
}

function delete_product(target) {
    $.post('/delete_product', {
        id: target.id
    }, () => {
        $('#products_table').empty()
        refresh_products()
    })
}
refresh_products()