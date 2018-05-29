(function() {
  $(function() {
    $(".stock").each(checkStock);
    $("#addRow").click(addRow);
    $("tbody").on("dblclick", "td", editTd);
    $("tbody").on("blur", "td input", saveTd);
  });

  function checkStock() {
    if($(this).text() == '0') {
      $(this).parents("tr").addClass("alert-danger");
    } else {
      $(this).parents("tr").removeClass("alert-danger");
    }
  }

  function addRow() {
    //确保上一行已完成所有内容才能新增行
    var completedRow = true;
    $("tr:last").children().each(function() {
      if (!$(this).text()) {
        completedRow = false;
      }
    });
    if (completedRow) {
      var id = parseInt($("tr:last").find("th").text()) + 1;
      $("tbody").append("<tr class = 'alert'>" +
                        "<th scope = 'row'>" + id + "</th>" +
                        "<td><span></span><input type = 'text'></td>" + 
                        "<td><span></span><input type = 'text'></td>" + 
                        "<td><span></span><input type = 'text'></td>" + 
                        "<td class = 'stock'><span></span><input type = 'text'></td>");
    } else {
      //反馈信息
    }
  }

  function editTd() {
    $(this).find("input").show();
    $(this).find("span").hide();
    $(this).find("input").focus();
    $(this).find("input").val($(this).find("span").text());
  }

  function saveTd() {
    $(this).hide();
    $(this).prev().show();
    $(this).prev().text($(this).val());
    $(this).prev().each(checkStock);
  }

})();