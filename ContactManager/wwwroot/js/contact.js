$(document).ready(function () {
    
    function createContact(contact) {
        $.ajax({
            url: '/Home/CreateContact',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(contact),
            success: function (response) {
                if (response.success) {
                    alert('Contact created successfully. ID: ' + response.data);
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (xhr) {
                alert('An error occurred: ' + xhr.responseText);
            }
        });
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
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (xhr) {
                alert('An error occurred: ' + xhr.responseText);
            }
        });
    }

    function viewContact(id) {
        $.ajax({
            url: '/Home/ViewContact?id=' + id,
            type: 'GET',
            success: function (response) {
                if (response.success) {
                    // Display contact details
                    console.log(response.data);
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
                if (response.success) {
                    // Display contact list
                    console.log(response.data);
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function (xhr) {
                alert('An error occurred: ' + xhr.responseText);
            }
        });
    }

});