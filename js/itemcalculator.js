//tc price
var coin_a_price = 0;
var coin_b_price = 0;

//item price
var item_a_price = 0;
var item_b_price = 0;

var item_a_total = 0;
var item_b_total = 0;

var $total_a = [];
var $total_b = [];

$(".price-check-a").click(function(){
 $total_a[0] = $('#total_a');
 coin_a_price = $("#coin_a_price").val();
 item_a_price = $("#item_a_price").val();
 item_a_total = item_a_price/coin_a_price;
 $total_a[0].html(item_a_total);
});

$(".price-check-b").click(function(){
    $total_b[0] = $('#total_b');
    coin_b_price = $("#coin_b_price").val();
    item_b_price = $("#item_b_price").val();
    item_b_total = item_b_price/coin_b_price;
    $total_b[0].html(item_b_total);
});