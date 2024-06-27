$(document).ready(function () {
    
    function viewContact(id) {
        $.ajax({
            url: '/Home/ViewContact?id=' + id,
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    resetForm();
                    // Display contact details
                    $('#txtAddress').val(response.data.address);
                    $('#txtPhone').val(response.data.phone);
                    $('#txtEmail').val(response.data.email);
                    $('#txtName').val(response.data.name);
                    $('#hdnId').val(id);
                    $('#contactInformation').modal('show');
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (xhr) {
                alert('An error occurred: ' + xhr.responseText);
            }
        });
    }
    
    function resetForm() {
        $('#hdnId').val(0);
        $('#txtAddress').val();
        $('#txtPhone').val();
        $('#txtEmail').val();
        $('#txtName').val();
    }

});

function initMap() {
    var address = '';
    var geocoder = new google.maps.Geocoder();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15
    });

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

//initMap();

function viewInfo(id) {
    console.log(id);
}

$('#btnNew').on('click', function () {
    resetForm();
    $('#contactInformation').modal('show');
});

$('#btnSave').on('click', function () {
    if ($('#hdnId').val() > 0) {
        let id = $('#hdnId').val();
        let obj = {
            name: $('#txtName').val(),
            email: $('#txtEmail').val(),
            phone: $('#txtPhone').val(),
            address: $('#txtAddress').val()
        }
        updateContact(id, obj);
    }
    else {
        let obj = {
            name: $('#txtName').val(),
            email: $('#txtEmail').val(),
            phone: $('#txtPhone').val(),
            address: $('#txtAddress').val()
        }
        createContact(obj);
    }
    resetForm();
    $('#contactInformation').modal('show');
});

function resetForm() {
    $('#hdnId').val(0);
    $('#txtAddress').val('');
    $('#txtPhone').val('');
    $('#txtEmail').val('');
    $('#txtName').val('');
}

function updateContact(id, contact) {
    $.ajax({
        url: '/Home/UpdateContact?id=' + id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(contact),
        success: function (response) {
            if (response.success) {
                alert('Contact updated successfully.');
                resetForm();
                $('#contactInformation').modal('hide');
                getContactList();
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr) {
            alert('An error occurred: ' + xhr.responseText);
        }
    });
}

function createContact(contact) {
    $.ajax({
        url: '/Home/CreateContact',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(contact),
        success: function (response) {
            if (response.success) {
                alert('Contact created successfully.');
                resetForm();
                $('#contactInformation').modal('hide');
                getContactList();
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr) {
            alert('An error occurred: ' + xhr.responseText);
        }
    });
}

function getContactList() {
    $.ajax({
        url: '/Home/GetContactList',
        type: 'GET',
        success: function (response) {
            if (response && response.success && response.data) {

                var contacts = response.data;
                var tbody = $('#contactTableBody');
                tbody.empty();

                contacts.forEach(function (contact) {
                    var row = $(`<tr>
                        <td>${contact.name}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-success view-btn"  data-id="${contact.id}"  >View</button>
                            <button type="button" class="btn btn-sm btn-danger delete-btn" data-id="${contact.id}">Delete</button>
                        </td>
                    </tr>  `);
                    tbody.append(row);
                });
                $('.view-btn').click(function () {
                    var contactId = $(this).data('id');
                    viewContact(contactId);
                });

                $('.delete-btn').click(function () {
                    var contactId = $(this).data('id');
                    if (confirm("Do you really want to delete this ?")) {
                        deleteContact(contactId);
                    }

                });
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr) {
            alert('An error occurred: ' + xhr.responseText);
        }
    });
}

getContactList();

function viewContact(id) {
    $.ajax({
        url: '/Home/ViewContact?id=' + id,
        type: 'GET',
        success: function (response) {
            if (response.success) {
                resetForm();
                // Display contact details
                $('#txtAddress').val(response.data.address);
                $('#txtPhone').val(response.data.phone);
                $('#txtEmail').val(response.data.email);
                $('#txtName').val(response.data.name);
                $('#hdnId').val(id);
                $('#contactInformation').modal('show');
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr) {
            alert('An error occurred: ' + xhr.responseText);
        }
    });
}

function deleteContact(id) {
    $.ajax({
        url: '/Home/DeleteContact?id=' + id,
        type: 'DELETE',
        success: function (response) {
            if (response.success) {
                alert('Contact deleted successfully.');
                getContactList();
            } else {
                alert('Error: ' + response.message);
            }
        },
        error: function (xhr) {
            alert('An error occurred: ' + xhr.responseText);
        }
    });
}
