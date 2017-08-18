//
// /**
//  * First we will load all of this project's JavaScript dependencies which
//  * includes Vue and other libraries. It is a great starting point when
//  * building robust, powerful web applications using Vue and Laravel.
//  */
//
// require('./bootstrap');
//
// window.Vue = require('vue');
//
// /**
//  * Next, we will create a fresh Vue application instance and attach it to
//  * the page. Then, you may begin adding components to this application
//  * or customize the JavaScript scaffolding to fit your unique needs.
//  */
//
// Vue.component('example', require('./components/Example.vue'));
//
// const app = new Vue({
//     el: '#app'
// });

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('.delete-subject').click(function(){
    var _this = this;
    var token = $(this).data('token');
    var subject = $(this).data('subject');
    var confirmation = prompt("For confirmation purposes, please write subject name which you want to delete: ");
    if(confirmation == subject) {
         $.ajax({
             type: "DELETE",
             url: $(this).data('address'),
             data: {_token :token},
             success: function (data) {
                 console.log(data);
                 $(_this).closest('.row').remove();
             },
             error: function (data) {
                 console.log('Error:', data);
             }
         });
     } else {
         return false;
     }
 });
$('.delete-division').click(function(){
    var _this = this;
    var token = $(this).data('token');
    var division = $(this).data('subject');
    var confirmation = prompt("For confirmation purposes, please write division name which you want to delete: ");
    if(confirmation == division) {
         $.ajax({
             type: "DELETE",
             url: $(this).data('address'),
             data: {_token :token},
             success: function (data) {
                 console.log(data);
                 $(_this).closest('.row').remove();
             },
             error: function (data) {
                 console.log('Error:', data);
             }
         });
     }
 });

$('.assign-students').select2();

$('.add').click(function(){
    var $gradeElement = $(this).parent().find('.add-grade');
    var $gradeList = $(this).parent().parent().find('.grade-list');
    var $grade = $gradeElement.val();
    var _this = this;
     $.ajax({
         type: "POST",
         url: $(this).data('address'),
         data: {value: $grade},
         success: function (data) {
             var $aElement = $('<a/>', {
                 "class": 'btn btn-secondary btn-sm edit-grade',
                 "data-address-delete": '/division/subjects/grade-delete/' + data.gradeId,
                 "data-address-update": '/division/subjects/grade-update/' + data.gradeId
             });
             $aElement.html($grade);
             $gradeList.append($aElement);
         },
         error: function (data) {
             alert('Error: you didn\'t added grade :/', data);
         }
     });
 });

$('body').on('dblclick', 'a.edit-grade', function(){
    var $grade = $(this).html();
    var $parent = $(this).parent();
    var $gradeId = $(this).data('gradeId');
    var $urlDelete = $(this).data('address-delete');
    var $urlUpdate = $(this).data('address-update');

    var $editInput = $('<input>', {
       "class": 'btn btn-secondary btn-sm edit-grade',
       "type": 'number',
       "min": 1,
       "max": 6,
       "step": 0.5,
       "value": $grade.trim()
    });

    $(this).replaceWith($editInput);
    $editInput.focus();

    $editInput.blur(function() {
        $grade = $(this).val();

        var _this = this;
        if($grade != 0) {

            var $editedGrade = $('<a>', {
                "class": 'btn btn-secondary btn-sm edit-grade'
            });

            $editedGrade.html($grade);

            $.ajax({
                type: "PUT",
                url: $urlUpdate,
                data: {value: $grade},
                success: function (data) {
                    $(_this).replaceWith($editedGrade);
                },
                error: function (data) {
                    alert('Error: you didn\'t updated this grade :| ', data);
                }
            });

        } else {

            confirm('Are you sure about deleting this grade?');

            $.ajax({
                type: "DELETE",
                url: $urlDelete,
                success: function () {
                    $(_this).remove();
                },
                error: function (data) {
                    alert('Error: you didn\'t deleted grade', data);
                }
            });

        }
    });
});
