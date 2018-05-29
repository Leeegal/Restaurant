

        $("body").on("click", ".num-jian", function(m) {
        var obj = $(this).closest("ul").find(".input-num");
        if(obj.val() <= 0) {
        obj.val(0);
        } else {
        obj.val(parseInt(obj.val()) - 1);
        }
        obj.change();
        });
        $("body").on("click", ".num-jia", function(m) {
        var obj = $(this).closest("ul").find(".input-num");
        obj.val(parseInt(obj.val()) + 1);
        obj.change();
        });
