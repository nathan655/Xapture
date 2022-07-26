const Sqlite = function () {
    let count = 0;
    let caseTableResult = [];
    let total = 0;
    let id;
    let previousColour = "";
    let DB;
    let runiOS = false;
    const colours = {
        red: "red",
        yellow: "yellow",
        blue: 'light-blue',
        teal: 'teal',
        purple: "purple",
        lightGreen: "light-green"
    }
    $('.note-card').on('drag', function () {
        //console.log($(this).position())
    })
    //console.log($('.note-card'))
    $('.add-note').click(function () {
        $('#modal-header').val("")
        $('#textarea1').val("");
        id = 0;
        $('#modal1').removeClass($('#modal1').data('colour'))
        $('.modal-footer').removeClass($('#modal1').data('colour'))
        $('.modal-back').removeClass('white-text');
        $('.save-edit').addClass('save')
        $('.save').removeClass('white-text save-edit')
        $('.materialize-textarea').removeClass('white-text')
        $('#modal-header').removeClass('white-text')
        $('#modal1').data('colour', "")

    })

    $.each(colours, function (id, name) {
        $('.colours').append(`<li class="col s2"><a href="#!" class="change-modal btn-floating ${name} small waves-effect waves-circle" data-colour="${name}"></a></li>`)

    })
    let notYellow = function () {
        if ($("#modal1").data('colour') === "yellow") {
            $('.modal-back').removeClass('white-text');
            $('.save').removeClass('white-text')
            $('.materialize-textarea').removeClass('white-text')
            $('#modal-header').removeClass('white-text')
        } else if ($("#modal1").data('colour') === "") {
            $('.modal-back').removeClass('white-text');
            $('.save').removeClass('white-text')
            $('.materialize-textarea').removeClass('white-text')
            $('#modal-header').removeClass('white-text')
        } else {
            $('.modal-back').addClass('white-text');
            $('.save').addClass('white-text')
            $('.materialize-textarea').addClass('white-text')
            $('#modal-header').addClass('white-text')
        }
    }
    let removePrevious = function () {
        $('#modal1').removeClass(previousColour);
        $('.modal-footer').removeClass(previousColour);
    }
    $('.change-modal').on('click', function () {
        $('#modal1').data('colour', $(this).data('colour'));
        notYellow();
        removePrevious();
        previousColour = $(this).data('colour');
        $('.modal-footer').addClass($('#modal1').data('colour'));
        $('#modal1').addClass($('#modal1').data('colour'));
    })

    function initDatabase() {
        const onDeviceReady = new Promise(function (resolve, reject) {
            if (document.URL.match(/^https?:/i)) {
                //console.log("Running in a browser...");
                resolve();
            } else {
                //console.log("Running in an app...");
                runiOS = true;
                document.addEventListener("deviceready", resolve, false);
            }
        });
        if (runiOS) {

            DB = window.openDatabase('my', "0.1", "My list", 200000);
            //console.log('DB: WebSQL');
            DB.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (id INTEGER PRIMARY KEY AUTOINCREMENT,head TEXT, content TEXT, colour varchar)');
                tx.executeSql('SELECT * FROM DemoTable', [], querySuccess, errorCB);
            }, function (error) {
                alert('Transaction ERROR: ' + error.message);
            }, function () {
                //console.log('Populated database OK');
            });
        }


    }

    function errorCB(err) {
        alert("Error processing SQL: " + err.code);

    }

    let querySuccess = function (tx, result) {
        $('.notes').empty();
        caseTableResult = result.rows;
        // const keys =Object.keys(caseTableResult).reverse();
        // //console.log(keys)
        let total = caseTableResult.length;
        if (total === 0) {
            $('.no-notes').show('slide')
        } else {
            $('.no-notes').hide("slide")
        }
        if (count === caseTableResult.length) {
            count = 0
            $('#folderData').empty();
        } else {
            $.each(caseTableResult, function (id, data) {
                // alert(data.id)
                let color = data.colour
                //console.log(data)
                if (color === '') {
                    color = "blue-grey";
                }
                if (data.head === "" && data.content === "") {
                    DB.transaction(function (tx) {
                        tx.executeSql(`DELETE
                                       FROM DemoTable
                                       where id = ${data.id}`);
                    }, function (error) {
                        //console.log('Transaction ERROR: ' + error.message);
                    }, function () {
                        //console.log('Populated database OK');
                    });

                } else {
                    notYellow();
                    $('.notes').append(`<div class="col s12 row note-card" id="data-${data.id}">
                        <div class="col s12 m6 ">
                            <div class="card ${color}" data-colour="${color}">
                                <div class="card-content database ">
                                    <span class="card-title">${data.head}</span>

                                    <p class="card-content">${data.content}</p>
                                </div>
                            <a data-id="${data.id}" class="btn-floating halfway-fab waves-effect right waves-light delete red"><i class="material-icons">delete_forever</i></a>
                                <a data-id="${data.id}" class="btn-floating halfway-fab waves-effect left waves-light edit green"><i class="material-icons">edit</i></a>
                            </div>
                        </div>
                    </div>`)
                }

            })
        }
    }
    let editNote = function (e) {
        $('.save').addClass('save-edit')
        $('.save-edit').removeClass('save')
        console.log(id);
        e.stopImmediatePropagation();
        DB.transaction(function (tx) {
            tx.executeSql(`SELECT *
                           FROM DemoTable
                           where id = ${id}`, [], populateModal, errorCB);
        }, function (error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function () {
            // Success Callback
        });

        let populateModal = function (tx, result) {
            let response = result.rows[0];
            console.log(response);
            $('#modal-header').val(response.head);
            $('#textarea1').val(response.content);

            previousColour = $('#modal1').data('colour');
            removePrevious();
            $('#modal1').data('colour', response.colour);
            //console.log($('#modal1').data('colour'))
            $('#modal1').addClass($('#modal1').data('colour'));
            $('.modal-footer').addClass($('#modal1').data('colour'));
            notYellow();
            const instance = M.Modal.getInstance($('#modal1'))
            instance.open();
        }

    }
    let intId = function (int) {
        id = int;
    }

    function updateQuery(tx) {
        const head = $('#modal-header').val();
        const content = $('#textarea1').val();
        let colour = $('#modal1').data('colour');
        // Insert query
        tx.executeSql('INSERT INTO DemoTable(head, content, colour) VALUES (?,?,?)', [head, content, colour], querySuccess, errorCB);
        tx.executeSql(`DELETE
                       FROM DemoTable
                       where id = ${id}`);
    }

    let saveEdit = function (e) {
        e.stopImmediatePropagation();
        M.toast({html: "Data Updated Successfully !", classes: ' blue '});
        const instance = M.Modal.getInstance($('#modal1'));
        instance.close();
        DB.transaction(updateQuery, errorCB);
        //console.log(id)
        DB.transaction(function (tx) {
            tx.executeSql('SELECT * FROM DemoTable', [], querySuccess, errorCB);
        }, function (error) {
            //console.log('Transaction ERROR: ' + error.message);
        }, function () {
            //console.log('Populated database OK');
        })
        $('#modal-header').val("")
        $('#textarea1').val("");
    }

    let loadNotes = function () {
        DB.transaction(function (tx) {
            tx.executeSql('SELECT * FROM DemoTable', [], querySuccess, errorCB);
        }, function (error) {
            //console.log('Transaction ERROR: ' + error.message);
        }, function () {
            //console.log('Populated database OK');
        });
    }
    let saveNote = function () {
        let title = $('#modal-header').val();
        let content = $('#textarea1').val();
        let colour = $('#modal1').data('colour');
        if (title === "" && content === "") {
            M.toast({html: "You didn't put anything to your database", classes: 'red'})
        } else {

            DB.transaction(function (tx) {
                tx.executeSql('INSERT INTO DemoTable(head, content, colour) VALUES (?,?,?)', [title, content, colour]);
                // alert(title,content,colour);
                tx.executeSql('SELECT * FROM DemoTable', [], querySuccess, errorCB);
            }, function (error) {
                alert('Transaction ERROR: ' + error.message);
            }, function () {
                //console.log('Populated database OK');
            });

            $('#modal-header').val("")
            $('#textarea1').val("");
        }
    }
    let deleteNote = function () {
        if (confirm("Are you sure you want to delete this note") === true) {
            M.toast({html: 'Deleting this Note'});
            setTimeout(
                function () {
                    $(`#data-${id}`).fadeOut("slow");
                    DB.transaction(function (tx) {
                        tx.executeSql(`DELETE
                                       FROM DemoTable
                                       where id = ${id}`);
                    }, function (error) {
                        //console.log('Transaction ERROR: ' + error.message);
                    }, function () {
                        // Success Callback
                    });

                    loadNotes();
                }, 2000);
        } else {
            // Don't delete
        }
    }

    return {
        initDatabase: initDatabase,
        delete: deleteNote,
        edit: editNote,
        save: saveNote,
        saveEdit: saveEdit,
        id: intId,
    }
}();
