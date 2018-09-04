/*!
 * Start Bootstrap - SB Admin 2 v3.3.7+1 (http://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2016 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)
 */
$(function () {


    var Currentpage = location.pathname.split('/').slice(-1)[0];
    if (localStorage.getItem("Token") == null && Currentpage != "login.html") {
        window.location.replace('login.html');
    } else {

        if (Currentpage != "login.html") {
            if (localStorage.getItem("Token") != null) {

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://localhost:5000/api/users/CheckingCredentials",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/x-www-form-urlencoded",
                        "authorization": localStorage.getItem("Token")
                    }
                };
                $.ajax(settings).done(function (data, textStatus, xhr) {
                    console.log(data);
                }).fail(function (jqXHR, status, err) {
                    if (err === "Unauthorized") {
                        window.location.replace('login.html');
                    }
                });
            }
        }

        if (Currentpage === "Detail_CSV_Listing.html") {
            var data = {
                id: localStorage.getItem("ListingID")
            }
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5000/api/UploadCSV/GettingCSVheaders",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "authorization": localStorage.getItem("Token")
                },
                "data": data

            };
            $.ajax(settings).done(function (response, xhr) {
                console.log(response.data[0].csv_data);
                var counter = 0;
                new_div = "";
                var newtr = "";
                var aared = response.data[0].csvhearders.csvhearders.split(',');
                $.each(aared, function (index, headers) {
                    newtr += "<th>" + headers + "</th>";

                });
                console.log(newtr);
                $("#Fetched-headers").html(newtr);

                $.each(response.data[0].csv_data, function (index, element) {

                    counter++;
                    new_div += "<tr id = " + element[0] + ">";


                    $.each(element, function (index, td) {

                        new_div += "<td> " + td + "</td>";

                    });

                    new_div += "</tr >";
                });
                console.log(new_div);
                $("#LoadingData").before(new_div);
                $('#dataTables-example').DataTable({
                    responsive: true
                });
                $(".table").tableExport({
                    formats: ["xlsx", "xls", "csv", "txt"],
                });
            });
        }
        if (Currentpage === "show_CSV.html" || Currentpage === "Comparing_Results.html") {

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:5000/api/UploadCSV/GettingCSVheaders",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "authorization": localStorage.getItem("Token")
                }
            };
            $.ajax(settings).done(function (response, xhr) {
                console.log(response);
                var counter = 0;
                new_div = "";
                $.each(response.data, function (index, element) {

                    counter++;
                    new_div += "<tr id = " + element._id + ">";
                    new_div += "<td id='" + element._id + "'>" + element._id +
                        "</td>";
                    new_div += "<td>" + element.name +
                        "</td>";
                    new_div += "<td>" + renderingheaders(element.csvhearders.csvhearders) +
                        "</td>";
                    new_div += "<td>" + element.csv_data.length + "</td>";
                    new_div += "<td><input type='checkbox' name= 'CSV[" + counter + "]'  id= 'CSV[" + counter + "]' value='" + element._id + "'><button class=' pull-right btn btn-primary glyphicon glyphicon-list-alt show-listing' id= " + element._id + "></button><button class=' compare pull-right btn btn-primary fa fa-exchange' ></button></td>";
                    new_div += "</tr >";

                    console.log(element);
                });
                $("#LoadingData").before(new_div);
                $('#dataTables-example').DataTable({
                    responsive: true
                });
                $(".table").tableExport({
                    formats: ["xlsx", "xls", "csv", "txt"],
                });
            });
        }
        if (Currentpage === "logout.html") {

            localStorage.removeItem("Token");
            window.location.replace('login.html');
        }

        console.log(localStorage.getItem("Token"));
    }



    $('#side-menu').metisMenu();
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',

    });

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function () {
    $(window).bind("load resize", function () {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function () {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});




$("body").on('click', '.show-listing', function (e) {
    localStorage.setItem("ListingID", this.id);
    console.log(localStorage.getItem("ListingID"));
    window.location.replace('Detail_CSV_Listing.html');
});

$("body").on('click', '.compare', function (e) {
    $('#SelectDate').modal('show');
});
$("body").on('click', '.submit-login', function (e) {
    var Data = {
        email: $("#email").val(),
        password: $("#password").val(),
    };


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:5000/api/users/Login",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",

        },
        "data": Data
    }

    $.ajax(settings).done(function (response) {
        if (response.msg === "success") {
            $('#data-alert-show').html("Success!");
            $('#Alert').modal('show');
            localStorage.setItem("Token", response.token);
            window.location.replace('index.html');

        } else if (response.msg === "Usernotfound") {
            $('#data-alert-show').html("The Username That You have Entered is not Valid!");
            $('#Alert').modal('show');

        } else if (response.msg == "passwordnotcorrect") {
            $('#data-alert-show').html("The Password That You have Entered is not Valid!");
            $('#Alert').modal('show');
        }
    });


});
$('#myfile').change(function (e) {
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append('myfile', file);
    $.ajax({
        url: 'http://localhost:5000/api/UploadCSV/csv',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data === "Add") {
                $('#myModal').modal('show');
                $("body").on('click', '.SubmitHeaders', function (e) {
                    e.preventDefault();
                    var headers = new Array();
                    $('#myform input').each(
                        function (index) {
                            var input = $(this);
                            headers.push(input.val());
                        }
                    );
                    formData.append('Headers', headers);
                    $.ajax({
                        url: 'http://localhost:5000/api/UploadCSV/Headers',
                        type: 'post',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            if (data === "Sucessfull") {
                                $('#myModal').modal('hide');
                                $('#Alert').modal('show');
                            }

                        }
                    });


                });




            } else if (data === "Sucessfull") {
                $('#myModal').modal('hide');
                $('#Alert').modal('show');
            }

        },
        crossDomain: true
    });
});

function renderingheaders(arr) {
    if (arr.includes(",")) {
        var aared = arr.split(',');
    } else {
        var aared = arr;
        console.log(aared);
    }

    var Headersbr = "";

    $.each(aared, function (header, element) {
        Headersbr += element + "<br/>";
    });
    console.log(Headersbr);
    return Headersbr;
}

function gettingCount(formData) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:5000/api/UploadCSV/gettingCount",
        "method": "POST",
        "data": formData,
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": localStorage.getItem("Token")
        }

    };
    $.ajax(settings).done(function (data, textStatus, xhr) {
        console.log(data);
    }).fail(function (jqXHR, status, err) {
        if (err === "Unauthorized") {
            window.location.replace('login.html');
        }
    });


}

$("body").on('click', '.initiate-compare', function (e) {
    window.location.replace('Comparing_Results.html');

});

counter = 1;


$("body").on('click', '.add_social_tr', function (e) {
    counter++;
    // alert(counter);
    e.preventDefault();
    name_attr = $(this).attr('data-names');
    var parent_parent_div = $(this).closest('.social_tr').parent();
    new_div = "";
    new_div += "<tr >";
    new_div +=
        "<td><input type='text' placeholder='Please Enter Column Name'class='form-control' name='sl[" +
        counter +
        "][header]'/></td> ";
    new_div += "<td>";
    new_div +=
        "<button class=' pull-right delete_expense_input_field btn btn-danger fa fa-minus' ></button></td>";
    new_div += " </tr>";
    // console.log(new_div);
    //$(parent_parent_div).append(new_div);
    $("#add_social_tr_before").before(new_div);

});
$("body").on('click', '.delete_expense_input_field', function (e) {
    if (counter > 0) {
        //counter--;

    }
    e.preventDefault();

    parent_parent_div = $(this).closest('tr').remove();


});