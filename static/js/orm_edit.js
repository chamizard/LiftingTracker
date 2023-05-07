$( document ).ready(function() {
    var num_rows = 0;
    var num_cols = 6;

    $.getJSON("/static/data/orm_data.json", function( data ) {
        var count = 0;
        var items = [];
        $.each(data, function(key, val) {
            if (count == num_cols - 1) {
                items[count] = [key, val];
                var new_row_container = $( "<div class=\"container\"></div>" ).appendTo( ".m-5" );
                var new_row = $( "<div class=\"row\"></div>" ).appendTo( new_row_container );
                for (var i = 0; i < num_cols; i++) {
                    var col = $( "<div class=\"col-2\"></div>" ).appendTo( new_row );
                    var input = $( "<input contenteditable=\"true\" class=\"editable\">" ).appendTo( col );
                    input.prop('id', items[i][0]);
                    input.prop('placeholder', items[i][1]);
                }
                count = -1;
                items = [];
                num_rows++;
            } else {
                items[count] = [key, val];
            }
            count++;
        });
        console.log("Num Rows: " + num_rows);
    });

    var save_button = document.getElementById('save-button');
    var addrow_button = document.getElementById('addrow-button');

    addrow_button.addEventListener('click', function() {
        console.log("Add Row button clicked");
        var new_row_container = $( "<div class=\"container\"></div>" ).appendTo( ".m-5" );
        var new_row = $( "<div class=\"row\"></div>" ).appendTo( new_row_container );
        for (var i = 0; i < num_cols; i++) {
            var col = $( "<div class=\"col-2\"></div>" ).appendTo( new_row );
            var input = $( "<input contenteditable=\"true\" class=\"editable\">" ).appendTo( col );
            input.prop('id', "row" + (num_rows + 1) + "col" + (i+1));
            input.prop('placeholder', '-');
        }
    });

    save_button.addEventListener('click', function() {
        console.log('Save button clicked');
        var json = {};
        $( ".editable" ).each(function( index ) {
            var id = $( this ).prop('id');
            var val = $( this ).prop('value');
            var p_holder = $( this ).prop('placeholder');
            if (val == '') {
                json[id] = p_holder;
            } else {
                json[id] = val;
            }
        });
        fetch("/static/data/orm_data.json", {
              method: "POST",
              body: JSON.stringify(json),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        });
    });
});
