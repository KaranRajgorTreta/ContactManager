
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

function getContactList(searchQuery = "") {
    $.ajax({
        url: '/Home/GetContactList',
        data: { searchQuery: searchQuery },
        type: 'GET',
        success: function (response) {
            if (response && response.success && response.data) {

                var contacts = response.data;
                var tbody = $('#contactTableBody');
                tbody.empty();

                contacts.forEach(function (contact) {
                    var row = $(`<tr data-id="${contact.id}">
                        <td>${contact.name}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-success view-btn"  data-id="${contact.id}"  >View</button>
                        </td>
                    </tr>  `);
                    tbody.append(row);
                });
                $('.view-btn').click(function () {
                    var contactId = $(this).data('id');
                    viewContact(contactId);
                });
                tbody.find('tr').dblclick(function () {
                    var contactId = $(this).data('id');
                    viewContact(contactId);
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
                $('#deleteContact').val(id);
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

$('#txtSearch').on('input', function () {
    var searchQuery = $(this).val();
    getContactList(searchQuery);
});

$('#deleteContact').click(function () {
    var contactId = $('#hdnId').val();
    if (confirm("Do you really want to delete this ?")) {
        deleteContact(contactId);
    }
});
