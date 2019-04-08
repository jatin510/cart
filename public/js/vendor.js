//vendors---------------
$('#add_vendor').click(() => {
    console.log('click')
    $.post('/add_vendor', {
        name: $('#vendor_name').val()
    }, (data) => {
        $('#list').append(`<li>${data.id} &emsp; ${data.name} &emsp; <button id=${data.id} class='list_btn' onclick='vendor_delete(this)'>Delete</button></li><br>`)
    })
})

function refresh_vendors() {
    $('#list').empty()
    $.get('/show_vendors', (data) => {
        for (let vendor of data) {
            $('#list').append(`<li>${vendor.id} &emsp; ${vendor.name} &emsp; <button id=${vendor.id} class='list_btn' onclick='vendor_delete(this)'>Delete</button></li><br> `)
        }
    })
}

function vendor_delete(target) {
    $.post('/delete_vendor', {
        id: target.id
    }, () => {
        refresh_vendors()
    })
}
refresh_vendors()
//vendors end-----------

//product page-----------