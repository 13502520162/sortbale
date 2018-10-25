/**
 * Created by 随心 on 2018/08/02.
 */
var layer = layui.layer;
var data = {
    "list": [
        {
            "groupId": "10001",
            "groupName": "讨论阶段",
            "tasks": [
                {
                    "taskId": "10000011",
                    "taskName": "现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察现场实际勘察",
                    "taskLevel": "项目级",
                    "taskRank": true,
                    "subTaskNum": 10,
                    "preoseTaskNum": 5,
                    "mandatory": false
                },
                {
                    "taskId": "10000012",
                    "taskName": "现场技术交流",
                    "taskLevel": "子项级",
                    "taskRank": false,
                    "subTaskNum": 6,
                    "preoseTaskNum": 10,
                    "mandatory": true
                }
            ]
        },
        {
            "groupId": "20002",
            "groupName": "讨论阶段2",
            "tasks": [
                {
                    "taskId": "20000021",
                    "taskName": "设备硬件安装",
                    "taskLevel": "项目级",
                    "taskRank": false,
                    "subTaskNum": 10,
                    "preoseTaskNum": 5,
                    "mandatory": false
                },
                {
                    "taskId": "20000022",
                    "taskName": "现场技术交流",
                    "taskLevel": "子项级",
                    "taskRank": false,
                    "subTaskNum": 6,
                    "preoseTaskNum": 10,
                    "mandatory": true
                },
                {
                    "taskId": "20000023",
                    "taskName": "设备硬件安装",
                    "taskLevel": "项目级",
                    "taskRank": false,
                    "subTaskNum": 0,
                    "preoseTaskNum": 5,
                    "mandatory": true
                },
                {
                    "taskId": "20000024",
                    "taskName": "现场技术交流",
                    "taskLevel": "子项级",
                    "taskRank": true,
                    "subTaskNum": 0,
                    "preoseTaskNum": 10,
                    "mandatory": false
                },
                {
                    "taskId": "20000025",
                    "taskName": "设备硬件安装",
                    "taskLevel": "项目级",
                    "taskRank": false,
                    "subTaskNum": 0,
                    "preoseTaskNum": 5,
                    "mandatory": true
                },
                {
                    "taskId": "20000026",
                    "taskName": "现场技术交流",
                    "taskLevel": "子项级",
                    "taskRank": false,
                    "subTaskNum": 0,
                    "preoseTaskNum": 0,
                    "mandatory": false
                },
                {
                    "taskId": "20000027",
                    "taskName": "设备硬件安装",
                    "taskLevel": "子项级",
                    "taskRank": false,
                    "subTaskNum": 0,
                    "preoseTaskNum": 0,
                    "mandatory": true
                }
            ]
        },
        {
            "groupId": "30003",
            "groupName": "设计阶段",
            "tasks": [
                {
                    "taskId": "30000031",
                    "taskName": "设备硬件安装",
                    "taskLevel": "项目级",
                    "taskRank": true,
                    "subTaskNum": 10,
                    "preoseTaskNum": 5,
                    "mandatory": true
                },
                {
                    "taskId": "30000032",
                    "taskName": "现场技术交流",
                    "taskLevel": "子项级",
                    "taskRank": false,
                    "subTaskNum": 6,
                    "preoseTaskNum": 10,
                    "mandatory": false
                }
            ]
        }
    ]
};

var jobTemplateGround = baidu.template('job-template-ground', data);
$('#job_template_details_footer').html(jobTemplateGround); //  生成分组

var sortablePar, sortable1Con;
function jobTempLateDetails() {
};
jobTempLateDetails.prototype = {
    constructor: jobTempLateDetails,
    /**
     * 传入一个数字 生成随机字符串
     * @param len
     * @returns {string}
     */
    randomString: function (len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    /**
     * 传入ID  给每个li 加索引值
     * @param id
     */
    sortIndex: function (id) {
        var len = $('#' + id).find('.details_con_ul li').length;
        for (var k = 0; k < len; k++) {
            $('#' + id).find('.details_con_ul li .indexNum').eq(k).text(k + 1);  //加索引

        }
        var h = $('.sortable_job_template').outerHeight(true);
        $('#' + id).find('.details_con_ul').css('max-height', h - 200); //设置每个 ul的高度
        var lenLi = $('#' + id).find('.details_con_ul li').length;
        if (lenLi == 0) {
            $('#' + id).find('.details_con_ul').css('padding', '12px 0 0 0'); //长度等于0的设置ul 的 padding
        } else {
            $('#' + id).find('.details_con_ul').css('padding', '12px 0');
        }
    }
    /**
     * 初始化拖动排序和生成不同的ID添加到每个div和添加任务分组距离left的值
     */
    , initSort: function () {
        var $_this = this;
        var tpLen = $('#job_template_details_footer>div').length;
        for (var j = 0; j < tpLen; j++) {
            var id = 'a' + this.randomString(10);
            $('.sortable_job_template').eq(j).attr('id', id); //生成 不同的id 添加
            $_this.sortIndex(id);
        }

        var h = $('.sortable_job_template').outerWidth(true); // 子的宽度
        $('#job_template_details_footer').css('width', (tpLen * h )+300); //设置父宽度  为了生成横向滚动条  加上300的原因是添加分组有300px

        var newTaskGroupingH = tpLen * h;
        if (isNaN(newTaskGroupingH)) {
            $('.new_task_grouping').css('left', '0'); //设置添加任务分组距离left的值
        } else {

            $('.new_task_grouping').css('left', newTaskGroupingH); //设置添加任务分组距离left的值
        }


        var el = document.getElementById('job_template_details_footer');
        sortablePar = new Sortable(el, {
            animation: 150, //动画时间
            draggable: '.sortable_job_template',	//selector 格式为简单css选择器的字符串，定义哪些列表单元可以进行拖放
            handle: '.sortable_tit',  //定义那个拖动本列的元素，不设置的话  整列中的所有元素都可以拖动列
            filter: '.new_task_grouping',
            onEnd:function(e){  //分组 拖动完毕的回调
                var theColumnChildren = e.to.children;
                var data = [];
                for (var j = 0; j < theColumnChildren.length; j++) {
                    var list = {
                        taskId: theColumnChildren[j].dataset.groupid,
                        sort: j + 1,
                    };
                    data.push(list);
                }

                console.log(data);


            }

        });

        var len = $('.details_con_ul').length;
        for (var i = 0; i < len; i++) {
            var el1 = document.getElementsByClassName('details_con_ul')[i];
            sortable1Con = new Sortable(el1, {
                group: 'aaa',	//互相拖放的标识，要与其相互配合的原色命名保持一致
                animation: 150
                , onAdd: function (e) { //从别的列拖过来的完毕回调
                    $_this.sortIndex(e.to.parentNode.id);
                    $_this.sortIndex(e.from.parentNode.id);

                    var theColumnId = e.to.parentNode.dataset.groupid;   //本列分组ID
                    var otherColumnId = e.from.parentNode.dataset.groupid; // 别列分组ID
                    var taskId = e.item.dataset.taskid; // 别列分组任务的ID


                    var theColumnChildren = e.to.children;
                    var filter = '';
                    var data = [];
                    for (var j = 0; j < theColumnChildren.length; j++) {
                        if (e.item.dataset.taskid == theColumnChildren[j].dataset.taskid) filter = '我是其他分组来的';
                        else filter = '';

                        var list = {
                            taskId: theColumnChildren[j].dataset.taskid,
                            sort: j + 1,
                            filter: filter
                        };
                        data.push(list);
                    }
                    console.log(data);

                }
                , onUpdate: function (e) {  //更新排序  只是更新了本列完毕回调
                    $_this.sortIndex(e.to.parentNode.id);
                    $_this.sortIndex(e.from.parentNode.id);


                    var groupId = e.target.parentNode.dataset.groupid;  //分组 ID
                    console.log(groupId);
                }
            });
        }

    }
    /**
     * 添加任务  传入 id
     * @param a
     */
    , addTasks: function (a, text) {
        var html = `    <li>
                        <span class="indexNum">1</span>
                        <p class="con_name">${text}
                        </p>
                        <span class="tasks_option fa fa-angle-down"></span>
                        <div class="tasks_option_select">
                            <ul>
                                <li class="model-edit" onclick="tasksMoveTo(this)">移动到</li>
                                <li class="model-copy" onclick="tasksCopyTo(this)">复制到</li>
                                <li class="model-remove" onclick="tasksRemove(this)">删除任务</li>
                            </ul>
                        </div>
                    </li>`;
        if (text != '') {
            $(a).prev().append(html);
            var parentId = $(a).parents('.sortable_job_template').attr('id');
            this.sortIndex(parentId);
        }


    },
    newTaskGrouping: function (text) {
        var html = `
                <div class="sortable_job_template">
             <div class="sortable_tit" onmouseleave="sortableTit(this)">
                    <p class="tit_name">${text}</p>
                    <div class="tit_name_option">
                        <p class="report-model-t-option" onclick="optionSelect(this)"><i class="fa fa-ellipsis-v"></i>
                        </p>
                        <div class="report-model-t-select">
                            <ul>
                                <li class="model-edit" onclick="templateEdit(this)">编辑分组</li>
                                <li class="model-copy" onclick="templateRemove(this)">删除分组</li>
                            </ul>
                            <div class="tit_name_edit">
                                <header class="popover-header">编辑分组</header>
                                <input type="text" class="tit_name_edit_ipt">
                                <button class="btn btn-primary" onclick="submitTitName(this)">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="details_con_ul"  style="max-height: 697px;">
                    
                </ul>
                <p class="add_tasks" onclick="addTasks(this)"><span class="increase"><i class="fa  fa-plus"></i></span>&nbsp;添加任务</p>
                    <div class="add_tasks_edit">
                    <input type="text" class="add_tasks_edit_ipt" placeholder="请输入任务名称">
                     <span class="" onclick="cancelTasks(this)">取消</span>
                    <span class="" onclick="submitTasks(this)">保存</span>
                </div>
            </div>`;

        $('#job_template_details_footer').append(html);
        this.initSort();
    },
    /*
     * 获取url参数
     * */
    getUrlParams: function () {
        if (window.location.search == "") {
            return {
                "": "无URL参数"
            };
        }
        var q = window.location.search.substring(1).split("&");
        var returnValue = {};
        for (var i = 0; i < q.length; i++) {
            var temp = q[i].split("=");
            returnValue[temp[0]] = decodeURI(temp[1]);
        }
        return returnValue;
    }

};

var jobTemplate = new jobTempLateDetails();

var bodyH = $('body').outerHeight(true);
var projectH = $('.project-details').outerHeight(true);

$('#job_template_details_con,#job_template_details_footer,.sortable_job_template ').css('height', projectH - 90);
$(window).resize(function () {
    window.location.reload();
    jobTemplate.initSort();
});


jobTemplate.initSort(); //初始化拖动排序和生成不同的ID添加到每个div和添加任务分组距离left的值
//点击右上箭头 返回上一级
$('.return_superior').click(function () {
    sessionStorage.setItem('ifStatus', 0);
    $('.project_detail', parent.document).hide();
    $('.my_project', parent.document).show();
});

var queryStrings = jobTemplate.getUrlParams();
var jobTemplateId = queryStrings.id;  // 作业模板ID


$('.new_task_grouping .sortable_tit').click(function () { //切换点击新增分组
    $('.new_task_grouping_edit').toggle().find('.new_task_grouping_ipt').focus();
    $('.new_task_grouping_edit .new_task_grouping_ipt').val('');
});

function optionSelect(a) { //切换点击编辑分组和删除分组
    $(a).next().toggle();
    $(a).next().find('ul').show();
}

$(document).on('click', '.tasks_option', function (e) {  //切换点击移动到、复制到、删除任务
    e = e || window.event;
    $(this).next().toggle();
    $(this).next().css({'left': e.pageX - 53, 'top': e.pageY + 13})
});

function addTasks(a) {  //添加任务
    $(a).next().find('.add_tasks_edit_ipt').val('');  //添加任务之前每次 输入框 先为空
    $(a).next().show().find('.add_tasks_edit_ipt').focus();
    $(a).hide();
}


function submitTasks(a) {  //保存任务
    var text = $(a).prev().prev().val();
    if (text == '') {
        layer.msg('请输入任务名称');
        return false;
    }

    var groundId = $(a).attr('data-groupid'); //分组ID
    console.log(groundId);

    //ajax发请求

    var prev_a = $(a).parent().prev(); //获取上级兄弟的元素
    jobTemplate.addTasks(prev_a, text);
    $(a).parent().hide();
    $(a).parent().prev().show();
    layer.msg('保存任务名称成功');

}
function cancelTasks(a) {  //取消任务
    $(a).parent().hide();
    $(a).parent().prev().show();
}


function templateEdit(a) {  //编辑分组
    sortablePar.options.disabled = true;
    $(a).parent().hide();
    $(a).parent().next().show();

    var text = $(a).parents('.sortable_tit').find('.tit_name').text();
    $(a).parents('.report-model-t-select').find('.tit_name_edit_ipt').val(text).focus();
}


function templateRemove(a) {  //删除分组
    var index = parent.layer.confirm('确定删除？', {
        title: '删除确定',
        resize: false,
        btn: ['取消', '确定'] //按钮
        , isOutAnim: false
    }, function () {
        parent.layer.closeAll();
    }, function () {

        var dataGroupId = $(a).parents('.sortable_job_template ').attr('data-groupid');
        console.log(dataGroupId);  //  分组ID

        // ajax发请求删除

        $(a).parents('.sortable_job_template').remove();
        jobTemplate.initSort();
        parent.layer.closeAll();
        layer.msg('删除分组成功');
    });
}

function newTaskGrouping(a) {  //新增分组
    var text = $(a).prev().val();
    if (text == '') {
        layer.msg('请输入分组名称');
        return false;
    }
    jobTemplate.newTaskGrouping(text);
    $(a).parent().hide();
    $(a).parent().prev().show();
    layer.msg('新增分组成功');
}

function submitTitName(a) { //修改保存分组名称
    var val = $(a).prev().val();
    $(a).parents('.sortable_tit').find('.tit_name').text(val);
    $(a).parents('.tit_name_edit').hide();
    $(a).parents('.report-model-t-select').hide();
    sortablePar.options.disabled = false;

    var dataGroupId = $(a).parents('.sortable_job_template ').attr('data-groupid');
    console.log(dataGroupId);


    layer.msg('修改分组名称成功');
}

function tasksMoveTo(a) { //移动到
    alert('移动到');
}
function tasksCopyTo(a) { //复制到
    alert('复制到');
}
function tasksRemove(a) { // 删除任务
    var parentId = $(a).parents('.sortable_job_template ').attr('id'); //先获取到当前列的id   不然删除 li 的时候无法获取到父级点的 ID
    var index = parent.layer.confirm('确定删除？', {
        title: '删除确定',
        resize: false,
        btn: ['取消', '确定'] //按钮
        , isOutAnim: false
    }, function () {
        parent.layer.closeAll();
    }, function () {

        var taskId = $(a).parents('.details_con_ul').find('li').attr('data-taskid'); //任务ID
        console.log(taskId);


        $(a).parents('li').remove();  // 执行删除
        jobTemplate.sortIndex(parentId); // 传入父的Id 重新排序
        parent.layer.closeAll();
        layer.msg('删除任务成功');
    });
}

//移出元素隐藏操作列
function sortableTit(a) {
    $(a).find('.report-model-t-select').hide();
    $(a).find('.report-model-t-select>ul').show();
    $(a).find('.tit_name_edit').hide();
    sortablePar.options.disabled = false;
}

//移出元素隐藏操作列
$(document).on('mouseleave', '.details_con_ul li', function () {
    $(this).find('.tasks_option_select').hide();
    sortablePar.options.disabled = false;
});






