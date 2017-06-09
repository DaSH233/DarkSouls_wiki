/**
 * Created by czy on 2017/5/14.
 */
var weapons_listname = ['匕首', '直剑', '大剑', '特大剑', '曲剑', '大曲剑', '太刀', '刺剑', '小斧', '大斧', '小锤', '大锤', '枪', '戟', '镰刀', '鞭子', '拳套&爪', '弓', '弩', '法杖', '触媒'];
var weapons_tag = ['dagger', 'straight sword', 'greatsword', 'ultra greatsword', 'curved sword', 'curved greatsword',
    'katana', 'thrusting sword', 'axe', 'greataxe', 'hammer', 'greathammer', 'spear and pike', 'halberd',
    'reper', 'whip', 'fist and claw', 'bow', 'crossbow', 'staves', 'others'];
var shields_listname = ['小盾', '中盾', '大盾'];
var shields_tag = ['small', 'standard', 'great'];
var attr_basic = ['name', 'damage_type', 'skill', 'fp_cost', 'physic_attack', 'physic_defense', 'magic_attack', 'magic_defense',
    'fire_attack', 'fire_defense', 'lightning_attack', 'lightning_defense', 'dark_attack', 'dark_defense', 'wp_critical',
    'wp_stability', 'weight', 'durabilitiy', 'bleed', 'poison', 'stg_req', 'dex_req', 'int_req', 'faith_bonus', 'stg_bonus',
    'dex_bonus', 'int_bonus', 'faith_req'];
var attr_detail = ['introductions', 'tips', 'from_where'];
var item_list = [];
var item_info = [];
var item_detail = [];
var tab = 'weapons', type;

$.ajaxSetup({
    async: false
});

$(function () {
    clear_info();
    get_info('list', 'weapons', 'all');
    show_list();
    tab_click();
    list_bar_click('weapons');
})

function tab_click() {
    var i = 0;
    $('#tabs ul li').click(function () {
        var id = $(this)[0].id;
        $(this).addClass('active').siblings().removeClass().end();
        $('.list_bar ul').empty();
        if(id == 'weapons') {
            for (i = 0; i < weapons_listname.length; i++) {
                $('.list_bar ul').append('<li id="' + weapons_tag[i] + '">' + weapons_listname[i] + '</li>');
            }
        }
        else if(id == 'shields'){
            for (i = 0; i < shields_listname.length; i++) {
                $('.list_bar ul').append('<li id="' + shields_tag[i] + '">' + shields_listname[i] + '</li>');
            }
        }
        tab = id;
        list_bar_click(tab);
        get_info('list', tab, 'all');
        show_list();
    });
}

function list_bar_click(tab) {
    $('.list_bar ul li').click(function () {
        $(this).addClass('active').siblings().removeClass().end();
        type = $(this)[0].id;
        get_info('list', tab, type);
        show_list();
    });
}
function get_info(query, tab, type, tag) {
    $.get('DsServlet', {query:query, tab:tab, type:type, tag:tag}, function (data) {
        if(query == 'list')
            item_list = jQuery.parseJSON(data);
        else if(query == 'basic_info')
            item_info = jQuery.parseJSON(data);
        else if(query == 'detail')
            item_detail = jQuery.parseJSON(data);
    });
}
function show_list() {
    $('#items').empty();
    for(var i = 0; i < item_list.length; i++){
        $('#items').append('<div class="item" id="' + item_list[i].tag + '"> ' +
            '<img src="images/icon/' + tab + '/' + item_list[i].type + '/' + item_list[i].icon + '"> ' +
            '<div class="item_name">' + item_list[i].name + '</div> ' +
            '</div>');
    }
    $('.item').click(function () {
        get_info('basic_info', tab, type, $(this)[0].id);
        get_info('detail', tab, type, $(this)[0].id);
        fill_info();
        $('#detail').show();
    });
    $('#detail').click(function () {
        $(this).hide();
        clear_info();
    });
}
function fill_info() {
    if(item_info.length != 0) {
        $('#item_pic img').attr('src', 'images/icon-big/weapons/dagger/' + item_info[0].icon_big);
        $('#name').text(item_info[0].name);
        $('#type').text($('#' + item_info[0].type).text());
        var data = $('.data');
        var context = $('.context');
        for (var i = 0; i < data.length; i++) {
            data.eq(i).text(item_info[0][attr_basic[i]]);
        }
    }
    if(item_detail != 0) {
        for (var i = 0; i < context.length; i++) {
            context.eq(i).text(item_detail[0][attr_detail[i]]);
        }
    }
}
function clear_info() {
    $('#item_pic img').attr('src', 'images/error.png');
    $('#name').text('施工中');
    $('#type').text('施工中');
    var data = $('.data');
    var context = $('.context');
    for(var i = 0; i < data.length; i++){
        data.eq(i).text('施工中');
    }
    for(var i = 0; i < context.length; i++){
        context.eq(i).text('施工中');
    }

}
