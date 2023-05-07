$( document ).ready(function() {
    var num_cols = 6;

    $.getJSON("/static/data/tracker_data.json", function( data ) {
        var count = 0;
        var items = [];
        $.each(data, function( key, val ) {
            if (count == num_cols - 1) {
//                console.log(items);
                items[count] = [key, val];
                var new_row = $( "<tr></tr>" ).appendTo("tbody");
                for (var i = 0; i < num_cols; i++) {
                    var col = $( "<td></td>" ).appendTo( new_row );
                    col.prop('id', items[i][0]);
                    col.html(items[i][1]);
                }
                count = -1;
                items = [];
            } else {
                items[count] = [key, val];
            }
            count++;
        });
//        $( "td" ).each(function( index ) {
//            var id = $( this ).prop('id');
//            $( this ).html(data[id]);
//        });
    });
});
